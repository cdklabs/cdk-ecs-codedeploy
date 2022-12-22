import { Match, Template } from 'aws-cdk-lib/assertions';
import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as cdk from 'aws-cdk-lib/core';
import { EcsAppSpec, EcsDeployment } from '../src';

describe('CodeDeploy ECS Deployment', () => {
  test('can be created with default configuration', () => {
    const stack = new cdk.Stack();
    const arn = 'taskdefarn';
    const taskDefinition = ecs.FargateTaskDefinition.fromFargateTaskDefinitionArn(stack, 'taskdef', arn);
    const deploymentGroup = codedeploy.EcsDeploymentGroup.fromEcsDeploymentGroupAttributes(stack, 'MyDG', {
      application: codedeploy.EcsApplication.fromEcsApplicationName(stack, 'MyApp', 'TestApp'),
      deploymentGroupName: 'MyDG',
    });
    const appspec = new EcsAppSpec({
      taskDefinition,
      containerName: 'testContainer',
      containerPort: 80,
    });
    new EcsDeployment({
      deploymentGroup,
      appspec,
    });

    Template.fromStack(stack).hasResource('Custom::EcsDeployment', {
      Properties: {
        applicationName: 'TestApp',
        deploymentConfigName: 'CodeDeployDefault.ECSAllAtOnce',
        deploymentGroupName: 'MyDG',
        autoRollbackConfigurationEnabled: Match.absent(),
        autoRollbackConfigurationEvents: Match.absent(),
        revisionAppSpecContent: appspec.toString(),
      },
    });

    Template.fromStack(stack).hasResource('AWS::Lambda::Function', {
      Properties: {
        Timeout: 60,
        Runtime: 'nodejs18.x',
        Handler: 'index.handler',
      },
    });

    Template.fromStack(stack).hasResource('AWS::Lambda::Function', {
      Properties: {
        Timeout: 60,
        Runtime: 'nodejs18.x',
        Handler: 'index.handler',
      },
    });

  });

  test('can be created with autorollback configuration', () => {
    const stack = new cdk.Stack();
    const arn = 'taskdefarn';
    const taskDefinition = ecs.FargateTaskDefinition.fromFargateTaskDefinitionArn(stack, 'taskdef', arn);
    const deploymentGroup = codedeploy.EcsDeploymentGroup.fromEcsDeploymentGroupAttributes(stack, 'MyDG', {
      application: codedeploy.EcsApplication.fromEcsApplicationName(stack, 'MyApp', 'TestApp'),
      deploymentGroupName: 'MyDG',
    });
    const appspec = new EcsAppSpec({
      taskDefinition,
      containerName: 'testContainer',
      containerPort: 80,
    });
    new EcsDeployment({
      deploymentGroup,
      appspec,
      description: 'test deployment',
      autoRollback: {
        deploymentInAlarm: true,
        failedDeployment: true,
        stoppedDeployment: true,
      },
    });

    Template.fromStack(stack).hasResource('Custom::EcsDeployment', {
      Properties: {
        applicationName: 'TestApp',
        deploymentConfigName: 'CodeDeployDefault.ECSAllAtOnce',
        deploymentGroupName: 'MyDG',
        autoRollbackConfigurationEnabled: 'true',
        autoRollbackConfigurationEvents: 'DEPLOYMENT_STOP_ON_ALARM,DEPLOYMENT_FAILURE,DEPLOYMENT_STOP_ON_REQUEST',
        description: 'test deployment',
        revisionAppSpecContent: appspec.toString(),
      },
    });
  });

  test('can be created with autorollback disabled', () => {
    const stack = new cdk.Stack();
    const arn = 'taskdefarn';
    const taskDefinition = ecs.FargateTaskDefinition.fromFargateTaskDefinitionArn(stack, 'taskdef', arn);
    const deploymentGroup = codedeploy.EcsDeploymentGroup.fromEcsDeploymentGroupAttributes(stack, 'MyDG', {
      application: codedeploy.EcsApplication.fromEcsApplicationName(stack, 'MyApp', 'TestApp'),
      deploymentGroupName: 'MyDG',
    });
    const appspec = new EcsAppSpec({
      taskDefinition,
      containerName: 'testContainer',
      containerPort: 80,
    });
    new EcsDeployment({
      deploymentGroup,
      appspec,
      description: 'test deployment',
      autoRollback: {
      },
    });

    Template.fromStack(stack).hasResource('Custom::EcsDeployment', {
      Properties: {
        applicationName: 'TestApp',
        deploymentConfigName: 'CodeDeployDefault.ECSAllAtOnce',
        deploymentGroupName: 'MyDG',
        autoRollbackConfigurationEnabled: 'false',
        autoRollbackConfigurationEvents: Match.absent(),
        description: 'test deployment',
        revisionAppSpecContent: appspec.toString(),
      },
    });
  });

});
