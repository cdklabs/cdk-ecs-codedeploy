import * as cdk from 'aws-cdk-lib';
import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import { Construct } from 'constructs';
import { EcsAppSpec } from '../ecs-appspec';
import { EcsDeploymentProvider } from '../ecs-deployment-provider';

/**
 * Construction properties of {@link EcsDeployment}.
 */
export interface EcsDeploymentProps {
  /**
   * The deployment group to target for this deployment.
   */
  readonly deploymentGroup: codedeploy.IEcsDeploymentGroup;

  /**
   * The AppSpec to use for the deployment.
   *
   * {@link https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-resources.html#reference-appspec-file-structure-resources-ecs}
   */
  readonly appspec: EcsAppSpec;

  /**
   * The configuration for rollback in the event that a deployment fails.
   *
   * @default: no automatic rollback triggered
   */
  readonly autoRollback?: codedeploy.AutoRollbackConfig;

  /**
   * The description for the deployment.
   *
   * @default no description
   */
  readonly description?: string;

  /**
   * The timeout for the deployment. If the timeout is reached, it will trigger a rollback of the stack.
   *
   * @default 30 minutes
   */
  readonly timeout?: cdk.Duration;

}

/**
 * A CodeDeploy Deployment for a Amazon ECS service DeploymentGroup.
 */
export class EcsDeployment extends Construct {
  /**
   * An {@link EcsDeploymentGroup} must only have 1 EcsDeployment. This limit is enforced by not allowing
   * the `scope` or `id` to be passed to the constructor. The `scope` will always be set to the
   * `deploymentGroup` from `props` and the `id` will always be set to the string 'Deployment'
   * to force an error if mulitiple EcsDeployment constructs are created for a single EcsDeploymentGrouop.
   */
  public static forDeploymentGroup(props: EcsDeploymentProps) {
    return new EcsDeployment(props.deploymentGroup, 'Deployment', props);
  }

  /**
   * The id of the deployment that was created.
   */
  deploymentId: string;

  protected constructor(scope: Construct, id: string, props: EcsDeploymentProps) {
    super(scope, id);

    const ecsDeploymentProvider = new EcsDeploymentProvider(this, 'DeploymentProvider', {
      deploymentGroup: props.deploymentGroup,
      timeout: props.timeout || cdk.Duration.minutes(30),
    });

    let autoRollbackConfigurationEvents : string[] = [];
    if (props.autoRollback?.deploymentInAlarm) {
      autoRollbackConfigurationEvents.push('DEPLOYMENT_STOP_ON_ALARM');
    }
    if (props.autoRollback?.failedDeployment) {
      autoRollbackConfigurationEvents.push('DEPLOYMENT_FAILURE');
    }
    if (props.autoRollback?.stoppedDeployment) {
      autoRollbackConfigurationEvents.push('DEPLOYMENT_STOP_ON_REQUEST');
    }

    const deployment = new cdk.CustomResource(this, 'DeploymentResource', {
      serviceToken: ecsDeploymentProvider.serviceToken,
      resourceType: 'Custom::EcsDeployment',
      properties: {
        applicationName: props.deploymentGroup.application.applicationName,
        deploymentConfigName: props.deploymentGroup.deploymentConfig.deploymentConfigName,
        deploymentGroupName: props.deploymentGroup.deploymentGroupName,
        autoRollbackConfigurationEnabled: (autoRollbackConfigurationEvents.length > 0).toString(),
        autoRollbackConfigurationEvents: autoRollbackConfigurationEvents.join(','),
        description: props.description,
        revisionAppSpecContent: props.appspec.toString(),
      },
    });
    this.deploymentId = deployment.getAttString('deploymentId');
  }

}
