import * as cdk from 'aws-cdk-lib';
import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as cr from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { IsCompleteFunction } from './is-complete-function';
import { OnEventFunction } from './on-event-function';

/**
 * Construction properties of {@link EcsDeploymentProvider}.
 */
interface EcsDeploymentProviderProps {
  /**
   * The deployment group to target for this deployment.
   */
  readonly deploymentGroup: codedeploy.IEcsDeploymentGroup;

  /**
   * The timeout for the deployment. If the timeout is reached, it will trigger a rollback of the stack.
   */
  readonly timeout: cdk.Duration;

  /**
   * The interval to query the deployment to determine when the deployment is completed.
   *
   * @default 15 seconds
   */
  readonly queryInterval?: cdk.Duration;
}

/**
 * A custom resource provider to handle creation of new {@link EcsDeployment}.
 */
export class EcsDeploymentProvider extends cr.Provider {
  constructor(scope: Construct, id: string, props: EcsDeploymentProviderProps) {

    const eventLambda = new OnEventFunction(scope, `${id}OnEventLambda`, {
      timeout: cdk.Duration.seconds(60),
    });
    eventLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: [
        'codedeploy:GetApplicationRevision',
        'codedeploy:RegisterApplicationRevision',
      ],
      resources: [
        props.deploymentGroup.application.applicationArn,
      ],
    }));
    eventLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: [
        'codedeploy:CreateDeployment',
        'codedeploy:StopDeployment',
        'codedeploy:GetDeployment',
      ],
      resources: [
        props.deploymentGroup.deploymentGroupArn,
      ],
    }));
    eventLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: [
        'codedeploy:GetDeploymentConfig',
      ],
      resources: [
        props.deploymentGroup.deploymentConfig.deploymentConfigArn,
      ],
    }));

    const completeLambda = new IsCompleteFunction(scope, `${id}IsCompleteLambda`, {
      timeout: cdk.Duration.seconds(60),
    });
    completeLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: [
        'codedeploy:GetDeployment',
      ],
      resources: [
        props.deploymentGroup.deploymentGroupArn,
      ],
    }));
    super(scope, id, {
      onEventHandler: eventLambda,
      isCompleteHandler: completeLambda,
      queryInterval: props.queryInterval || cdk.Duration.seconds(15),
      totalTimeout: props.timeout,
      disableWaiterStateMachineLogging: true,
    });
  }
}
