import { Schedule } from '@aws-cdk/aws-synthetics-alpha';
import { Duration } from 'aws-cdk-lib';
import { Alarm, AlarmRule, ComparisonOperator, CompositeAlarm, IAlarm } from 'aws-cdk-lib/aws-cloudwatch';
import { EcsApplication, EcsDeploymentConfig, EcsDeploymentGroup, IEcsDeploymentConfig } from 'aws-cdk-lib/aws-codedeploy';
import { BaseService, DeploymentControllerType } from 'aws-cdk-lib/aws-ecs';
import { ApplicationLoadBalancedFargateService, ApplicationLoadBalancedFargateServiceProps } from 'aws-cdk-lib/aws-ecs-patterns';
import { ApplicationListener, ApplicationProtocol, ApplicationTargetGroup, HealthCheck, TargetType } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { BlockPublicAccess, Bucket, BucketEncryption, IBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { ApiTestStep, ApiCanary } from '../api-canary';
import { EcsDeployment } from '../ecs-deployment';

/**
 * The properties for the ApplicationLoadBalancedCodeDeployedFargateService service.
 */
export interface ApplicationLoadBalancedCodeDeployedFargateServiceProps extends ApplicationLoadBalancedFargateServiceProps {
  /**
   * The timeout for a CodeDeploy deployment.
   *
   * @default - 60 minutes
   */
  readonly deploymentTimeout?: Duration;

  /**
   * The time to wait before terminating the original (blue) task set.
   *
   * @default - 10 minutes
   */
  readonly terminationWaitTime?: Duration;

  /**
   * The deployment configuration to use for the deployment group.
   *
   * @default - EcsDeploymentConfig.ALL_AT_ONCE
   */
  readonly deploymentConfig?: IEcsDeploymentConfig;

  /**
   * The amount of time for ELB to wait before changing the state of a deregistering target
   * from 'draining' to 'unused'.
   *
   * @default - 300 seconds
   */
  readonly deregistrationDelay?: Duration;

  /**
   * The healthcheck to configure on the Application Load Balancer target groups.
   *
   * @default - no health check is configured
   */
  readonly healthCheck?: HealthCheck;

  /**
   * The bucket to use for access logs from the Application Load Balancer.
   *
   * @default - a new S3 bucket will be created
   */
  readonly accessLogBucket?: IBucket;

  /**
   * The prefix to use for access logs from the Application Load Balancer.
   *
   * @default - none
   */
  readonly accessLogPrefix?: string;

  /**
   * The threshold for response time alarm.
   *
   * @default - no alarm will be created
   */
  readonly responseTimeAlarmThreshold?: Duration;

  /**
   * The number of threads to run concurrently for the synthetic test.
   *
   * @default - 20
   */
  readonly apiCanaryThreadCount?: number;

  /**
   * The frequency for running the api canaries.
   *
   * @default - 5 minutes
   */
  readonly apiCanarySchedule?: Duration;

  /**
   * The threshold for how long a api canary can take to run.
   *
   * @default - no alarm is created for test duration
   */
  readonly apiCanaryTimeout?: Duration;

  /**
   * The steps to run in the canary.
   *
   * @default - no synthetic test will be created
   */
  readonly apiTestSteps?: ApiTestStep[];
}

/**
 * A Fargate service running on an ECS cluster fronted by an application load balancer and deployed by CodeDeploy.
 */
export class ApplicationLoadBalancedCodeDeployedFargateService extends ApplicationLoadBalancedFargateService {
  /**
   * Composite alarm for monitoring health of service.
   */
  healthAlarm: IAlarm;

  /**
   * API Canary for the service.
   */
  apiCanary?: ApiCanary;

  /**
   * Test listener to use for CodeDeploy deployments.
   */
  testListener: ApplicationListener;

  /**
   * Test target group to use for CodeDeploy deployments.
   */
  greenTargetGroup: ApplicationTargetGroup;

  /**
   * S3 Bucket used for access logs.
   */
  accessLogBucket: IBucket;

  /**
   * CodeDeploy application for this service.
   */
  application: EcsApplication;

  /**
   * CodeDeploy deployment group for this service.
   */
  deploymentGroup: EcsDeploymentGroup;

  /**
   * CodeDeploy deployment for this service.
   */
  deployment: EcsDeployment;

  /**
   * Constructs a new instance of the ApplicationLoadBalancedCodeDeployedFargateService class.
   */
  constructor(scope: Construct, id: string, props: ApplicationLoadBalancedCodeDeployedFargateServiceProps) {
    super(scope, id, {
      ...props,
      deploymentController: {
        type: DeploymentControllerType.CODE_DEPLOY,
      },
    });

    if (props.deregistrationDelay) {
      this.targetGroup.setAttribute('deregistration_delay.timeout_seconds', props.deregistrationDelay.toSeconds().toString());
    }
    if (props.healthCheck) {
      this.targetGroup.configureHealthCheck(props.healthCheck);
    }
    this.accessLogBucket = props.accessLogBucket ??
      new Bucket(this, 'AccessLogBucket', {
        encryption: BucketEncryption.S3_MANAGED,
        blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
        enforceSSL: true,
      });

    this.loadBalancer.logAccessLogs(this.accessLogBucket, props.accessLogPrefix);

    const alarms: IAlarm[] = [];
    if (props.responseTimeAlarmThreshold) {
      const responseTimeAlarm = new Alarm(this, 'ResponseTimeAlarm', {
        metric: this.loadBalancer.metricTargetResponseTime({
          period: Duration.minutes(1),
          statistic: 'p95',
        }),
        evaluationPeriods: 2,
        threshold: props.responseTimeAlarmThreshold.toSeconds(),
        comparisonOperator: ComparisonOperator.GREATER_THAN_THRESHOLD,
      });
      alarms.push(responseTimeAlarm);
    }

    const protocol = props.protocol ?? (props.certificate ? ApplicationProtocol.HTTPS : ApplicationProtocol.HTTP);

    const testHostName = props.domainName ?  props.domainName : this.loadBalancer.loadBalancerDnsName;

    if (props.apiTestSteps?.length) {
      this.apiCanary = new ApiCanary(this, 'Canary', {
        baseUrl: `${protocol.toLowerCase()}://${testHostName}`,
        durationAlarmThreshold: props.apiCanaryTimeout,
        schedule: Schedule.rate(props.apiCanarySchedule ?? Duration.minutes(5)),
        threadCount: props.apiCanaryThreadCount,
        steps: props.apiTestSteps,
      });

      this.apiCanary.node.addDependency(this.service);

      alarms.push(this.apiCanary.successAlarm);
      if (this.apiCanary.durationAlarm) {
        alarms.push(this.apiCanary.durationAlarm);
      }
    }
    this.healthAlarm = new CompositeAlarm(this, 'HealthAlarm', {
      alarmRule: AlarmRule.anyOf(...alarms),
    });

    let testPort : number;
    if (props.listenerPort) {
      testPort = props.listenerPort + 1;
    } else if (protocol === ApplicationProtocol.HTTP) {
      testPort = 8080;
    } else if (protocol === ApplicationProtocol.HTTPS) {
      testPort = 8443;
    } else {
      throw new Error('Unable to determine port for test listener');
    }

    let certificates; 
    if( props.certificate ) {
        certificates = [ props.certificate ]
    }

    this.testListener = this.loadBalancer.addListener('TestListener', {
      protocol,
      port: testPort,
      open: props.openListener ?? true,
      sslPolicy: props.sslPolicy,
      certificates: certificates, 
    });

    this.greenTargetGroup = new ApplicationTargetGroup(this, 'GreenTargetGroup', {
      vpc: this.cluster.vpc,
      port: testPort,
      protocol: props.targetProtocol ?? ApplicationProtocol.HTTP,
      protocolVersion: props.protocolVersion,
      deregistrationDelay: props.deregistrationDelay,
      healthCheck: props.healthCheck,
      targetType: TargetType.IP,
    });

    this.testListener.addTargetGroups('ECS', {
      targetGroups: [this.greenTargetGroup],
    });

    this.application = new EcsApplication(this, 'Application');
    this.deploymentGroup = new EcsDeploymentGroup(this, 'DeploymentGroup', {
      application: this.application,
      alarms: [this.healthAlarm],
      service: this.service,
      blueGreenDeploymentConfig: {
        blueTargetGroup: this.targetGroup,
        greenTargetGroup: this.greenTargetGroup,
        listener: this.listener,
        testListener: this.testListener,
        terminationWaitTime: props.terminationWaitTime ?? Duration.minutes(10),
      },
      deploymentConfig: props.deploymentConfig ?? EcsDeploymentConfig.ALL_AT_ONCE,
      autoRollback: {
        stoppedDeployment: true,
      },
    });
    this.deployment = new EcsDeployment({
      deploymentGroup: this.deploymentGroup,
      timeout: props.deploymentTimeout ?? Duration.minutes(60),
      targetService: {
        taskDefinition: this.taskDefinition,
        containerName: this.taskDefinition.defaultContainer!.containerName,
        containerPort: this.taskDefinition.defaultContainer!.containerPort,
      },
    });
  }

  protected addServiceAsTarget(service: BaseService) {
    super.addServiceAsTarget(service);
  }
}
