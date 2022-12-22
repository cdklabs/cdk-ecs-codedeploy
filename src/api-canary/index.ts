import * as path from 'path';
import { Canary, ArtifactsBucketLocation, Schedule, Test, Code, Runtime } from '@aws-cdk/aws-synthetics-alpha';
import { Duration, DockerImage, Lazy } from 'aws-cdk-lib';
import { Alarm, ComparisonOperator } from 'aws-cdk-lib/aws-cloudwatch';
import { IVpc, SubnetSelection, ISecurityGroup } from 'aws-cdk-lib/aws-ec2';
import { IRole } from 'aws-cdk-lib/aws-iam';
import { BlockPublicAccess, Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { Asset } from 'aws-cdk-lib/aws-s3-assets';
import { Construct } from 'constructs';
import { CanaryCodeBundler } from './code-bundling';

export interface ApiTestStep {
  /**
   * Name of test.
   */
  readonly name: string;

  /**
   * Path of HTTP request, relative to baseUrl.
   */
  readonly path: string;

  /**
   * Optional method to for HTTP request.
   *
   * @default - GET
   */
  readonly method?: string;

  /**
   * Optional headers to include in HTTP request.
   *
   * @default - no headers included.
   */
  readonly headers?: { [ name: string ]: string };

  /**
   * Optional body to include in HTTP request.
   *
   * @default - no body included.
   */
  readonly body?: string;

  /**
   * JMESPath to apply against the response from the HTTP request and compare against expected value.
   *
   * @default - no JMESPath assertion will be performed.
   */
  readonly jmesPath?: string;

  /**
   * Expected value to compare against the jmesPath.
   *
   * @default - undefined
   */
  readonly expectedValue?: any;
}

export interface ApiCanaryProps extends BaseCanaryProps {
  /**
   * The base URL to use for tests.
   */
  readonly baseUrl: string;

  /**
   * The threshold for triggering an alarm on the test duration.
   *
   * @default - no alarm is created for duration
   */
  readonly durationAlarmThreshold?: Duration;

  /**
   * The number of threads to run concurrently for the synthetic test.
   *
   * @default - 20
   */
  readonly threadCount?: number;

  /**
   * The steps to perform in the synthetic test.
   */
  readonly steps?: ApiTestStep[];
}

interface BaseCanaryProps {
  /**
   * The s3 location that stores the data of the canary runs.
   *
   * @default - A new s3 bucket will be created without a prefix.
   */
  readonly artifactsBucketLocation?: ArtifactsBucketLocation;

  /**
   * Canary execution role.
   *
   * This is the role that will be assumed by the canary upon execution.
   * It controls the permissions that the canary will have. The role must
   * be assumable by the AWS Lambda service principal.
   *
   * If not supplied, a role will be created with all the required permissions.
   * If you provide a Role, you must add the required permissions.
   *
   * @see required permissions: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-executionrolearn
   *
   * @default - A unique role will be generated for this canary.
   * You can add permissions to roles by calling 'addToRolePolicy'.
   */
  readonly role?: IRole;

  /**
   * How long the canary will be in a 'RUNNING' state. For example, if you set `timeToLive` to be 1 hour and `schedule` to be `rate(10 minutes)`,
   * your canary will run at 10 minute intervals for an hour, for a total of 6 times.
   *
   * @default - no limit
   */
  readonly timeToLive?: Duration;

  /**
   * Specify the schedule for how often the canary runs. For example, if you set `schedule` to `rate(10 minutes)`, then the canary will run every 10 minutes.
   * You can set the schedule with `Schedule.rate(Duration)` (recommended) or you can specify an expression using `Schedule.expression()`.
   * @default 'rate(5 minutes)'
   */
  readonly schedule?: Schedule;

  /**
   * Whether or not the canary should start after creation.
   *
   * @default true
   */
  readonly startAfterCreation?: boolean;

  /**
   * How many days should successful runs be retained.
   *
   * @default Duration.days(31)
   */
  readonly successRetentionPeriod?: Duration;

  /**
   * How many days should failed runs be retained.
   *
   * @default Duration.days(31)
   */
  readonly failureRetentionPeriod?: Duration;

  /**
   * The name of the canary. Be sure to give it a descriptive name that distinguishes it from
   * other canaries in your account.
   *
   * Do not include secrets or proprietary information in your canary name. The canary name
   * makes up part of the canary ARN, which is included in outbound calls over the internet.
   * @see https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/servicelens_canaries_security.html
   *
   * @default - A unique name will be generated from the construct ID
   */
  readonly canaryName?: string;

  /**
   * The VPC where this canary is run.
   *
   * Specify this if the canary needs to access resources in a VPC.
   *
   * @default - Not in VPC
   */
  readonly vpc?: IVpc;

  /**
   * Where to place the network interfaces within the VPC. You must provide `vpc` when using this prop.
   *
   * @default - the Vpc default strategy if not specified
   */
  readonly vpcSubnets?: SubnetSelection;

  /**
   * The list of security groups to associate with the canary's network interfaces. You must provide `vpc` when using this prop.
   *
   * @default - If the canary is placed within a VPC and a security group is
   * not specified a dedicated security group will be created for this canary.
   */
  readonly securityGroups?: ISecurityGroup[];
}

/**
 * A CloudWatch Synthetic Canary for monitoring APIs.
 */
export class ApiCanary extends Canary {
  /**
   * A CloudWatch Alarm that triggers when the success rate falls below 100% over the past 2 periods.
   */
  successAlarm: Alarm;

  /**
   * A CloudWatch Alarm that triggers when the duration of the tests exceeds the given threshold over the past 2 periods.
   */
  durationAlarm?: Alarm;

  /**
   * @internal field to track steps for this canary.
   */
  _steps: ApiTestStep[];

  constructor(scope: Construct, id: string, props: ApiCanaryProps) {
    const bundler = new CanaryCodeBundler(path.join(__dirname, '..', '..', 'canary-src'));
    const canaryAsset = new Asset(scope, `${id}ApiCanaryAsset`, {
      path: bundler.codePath,
      bundling: {
        image: DockerImage.fromRegistry('node:14'),
        local: bundler,
      },
    });
    let artifactsBucket = props.artifactsBucketLocation?.bucket;
    if (!artifactsBucket) {
      artifactsBucket = new Bucket(scope, `${id}ArtifactsBucket`, {
        encryption: BucketEncryption.S3_MANAGED,
        blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
        enforceSSL: true,
      });
    }

    super(scope, id, {
      ...props,
      test: Test.custom({
        code: Code.fromBucket(canaryAsset.bucket, canaryAsset.s3ObjectKey),
        handler: 'index.handler',
      }),
      runtime: Runtime.SYNTHETICS_NODEJS_PUPPETEER_3_8,
      environmentVariables: {
        baseUrl: props.baseUrl,
        threadCount: (props.threadCount ?? 20).toString(),
        testSteps: Lazy.string({ produce: () => JSON.stringify(this._steps) }),
      },
      artifactsBucketLocation: {
        bucket: artifactsBucket,
        prefix: props.artifactsBucketLocation?.prefix,
      },
    });
    this._steps = props.steps ?? [];

    const period = Duration.minutes(5);

    this.successAlarm = new Alarm(this, 'SuccessAlarm', {
      metric: this.metricSuccessPercent({ period }),
      evaluationPeriods: 2,
      threshold: 100,
      comparisonOperator: ComparisonOperator.LESS_THAN_THRESHOLD,
    });

    if (props.durationAlarmThreshold) {
      this.durationAlarm = new Alarm(this, 'DurationAlarm', {
        metric: this.metricDuration({ period }),
        evaluationPeriods: 2,
        threshold: props.durationAlarmThreshold.toMilliseconds(),
        comparisonOperator: ComparisonOperator.GREATER_THAN_THRESHOLD,
      });
    }
  }

  /**
   * Add a new test step to this canary.
   *
   * @param step - ApiTestStep to add.
   */
  addTestStep(step: ApiTestStep) {
    this._steps.push(step);
  }
}