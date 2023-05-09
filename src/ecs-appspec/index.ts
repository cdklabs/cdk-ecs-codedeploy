import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

/**
 * Represents an AppSpec to be used for ECS services.
 *
 * see: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-resources.html#reference-appspec-file-structure-resources-ecs
 */
export class EcsAppSpec {
  /**
   * Service to target for the deployment
   */
  private readonly targetService: TargetService;
  /**
   * Optional lifecycle hooks
   */
  private readonly hooks?: AppSpecHooks;

  constructor(targetService: TargetService, hooks?: AppSpecHooks) {
    this.targetService = targetService;
    this.hooks = hooks;
  }

  /**
   * Render JSON string for this AppSpec to be used
   *
   * @returns string representation of this AppSpec
   */
  toString(): string {
    const appSpec = {
      version: '0.0',
      Resources: [{
        TargetService: {
          Type: 'AWS::ECS::Service',
          Properties: {
            TaskDefinition: this.targetService.taskDefinition.taskDefinitionArn,
            LoadBalancerInfo: {
              ContainerName: this.targetService.containerName,
              ContainerPort: this.targetService.containerPort,
            },
            PlatformVersion: this.targetService.platformVersion,
            NetworkConfiguration: this.configureAwsVpcNetworkingWithSecurityGroups(this.targetService.awsvpcConfiguration),
            CapacityProviderStrategy: this.targetService.capacityProviderStrategy?.map(capacityProviderStrategy => {
              return {
                Base: capacityProviderStrategy.base,
                CapacityProvider: capacityProviderStrategy.capacityProvider,
                Weight: capacityProviderStrategy.weight,
              };
            }),
          },
        },
      }],
      ...this.hooksSection(),
    };
    return JSON.stringify(appSpec);
  }

  private hooksSection() {
    if (this.hooks == undefined) {
      return {};
    }
    const hooks = this.hooks;
    if (
      this.hooks.beforeInstall == undefined &&
      this.hooks.afterInstall == undefined &&
      this.hooks.afterAllowTestTraffic == undefined &&
      this.hooks.beforeAllowTraffic == undefined &&
      this.hooks.afterAllowTraffic == undefined
    ) {
      return {};
    }
    const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);
    const hook = (name: keyof AppSpecHooks) => {
      const hookValue = hooks[name];
      if (hookValue == undefined) {
        return {};
      } else {
        return {
          [capitalize(name)]:
            typeof hookValue === 'string'
              ? hookValue
              : hookValue.functionArn,
        };
      }
    };
    const beforeInstall = hook('beforeInstall');
    const afterInstall = hook('afterInstall');
    const afterAllowTestTraffic = hook('afterAllowTestTraffic');
    const beforeAllowTraffic = hook('beforeAllowTraffic');
    const afterAllowTraffic = hook('afterAllowTraffic');

    return {
      Hooks: {
        ...beforeInstall,
        ...afterInstall,
        ...afterAllowTestTraffic,
        ...beforeAllowTraffic,
        ...afterAllowTraffic,
      },
    };
  }

  private configureAwsVpcNetworkingWithSecurityGroups(awsvpcConfiguration?: AwsvpcConfiguration) {
    if (!awsvpcConfiguration) {
      return undefined;
    }
    return {
      awsvpcConfiguration: {
        assignPublicIp: awsvpcConfiguration.assignPublicIp ? 'ENABLED' : 'DISABLED',
        subnets: awsvpcConfiguration.vpc.selectSubnets(awsvpcConfiguration.vpcSubnets).subnetIds,
        securityGroups: awsvpcConfiguration.securityGroups?.map((sg) => sg.securityGroupId),
      },
    };
  }
}

/**
 * Describe the target for CodeDeploy to use when creating a deployment for an ecs.EcsDeploymentGroup.
 */
export interface TargetService {
  /**
   * The TaskDefintion to deploy to the target services.
   */
  readonly taskDefinition: ecs.ITaskDefinition;

  /**
   * The name of the Amazon ECS container that contains your Amazon ECS application. It must be a container specified in your Amazon ECS task definition.
   */
  readonly containerName: string;

  /**
   * The port on the container where traffic will be routed to.
   */
  readonly containerPort: number;

  /**
   * The platform version of the Fargate tasks in the deployed Amazon ECS service.
   * see: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/platform_versions.html
   *
   * @default LATEST
   */
  readonly platformVersion?: ecs.FargatePlatformVersion;

  /**
   * Network configuration for ECS services that have a network type of `awsvpc`.
   *
   * @default reuse current network settings for ECS service.
   */
  readonly awsvpcConfiguration?: AwsvpcConfiguration;

  /**
   * A list of Amazon ECS capacity providers to use for the deployment.
   *
   * @default reuse current capcity provider strategy for ECS service.
   */
  readonly capacityProviderStrategy?: ecs.CapacityProviderStrategy[];

}

/**
 * Network configuration for ECS services that have a network type of `awsvpc`.
 */
export interface AwsvpcConfiguration {
  /**
   * The VPC to use for the task.
   */
  readonly vpc: ec2.IVpc;

  /**
   * The Subnets to use for the task.
   */
  readonly vpcSubnets: ec2.SubnetSelection;

  /**
   * The Security Groups to use for the task.
   */
  readonly securityGroups: ec2.ISecurityGroup[];

  /**
   * Assign a public IP address to the task.
   */
  readonly assignPublicIp: boolean;
}

/**
 * Lifecycle hooks configuration
 */
export interface AppSpecHooks {
  /**
   * Lambda or ARN of a lambda to run tasks before the replacement task set is created.
   */
  readonly beforeInstall?: string | lambda.IFunction;
  /**
   * Lambda or ARN of a lambda to run tasks after the replacement task set is created and one of the target groups is associated with it.
   */
  readonly afterInstall?: string | lambda.IFunction;
  /**
   * Lambda or ARN of a lambda to run tasks after the test listener serves traffic to the replacement task set.
   */
  readonly afterAllowTestTraffic?: string | lambda.IFunction;
  /**
   * Lambda or ARN of a lambda to run tasks after the second target group is associated with the replacement task set, but before traffic is shifted to the replacement task set.
   */
  readonly beforeAllowTraffic?: string | lambda.IFunction;
  /**
   * Lambda or ARN of a lambda to run tasks after the second target group serves traffic to the replacement task set.
   */
  readonly afterAllowTraffic?: string | lambda.IFunction;
}
