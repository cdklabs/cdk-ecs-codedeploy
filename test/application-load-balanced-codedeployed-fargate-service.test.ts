import { Match, Template } from 'aws-cdk-lib/assertions';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { AssetImage } from 'aws-cdk-lib/aws-ecs';
import * as cdk from 'aws-cdk-lib/core';
import { ApplicationLoadBalancedCodeDeployedFargateService } from '../src';

describe('Fargate Service', () => {
  test('can be created with default configuration', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TestStack', {
      env: {
        account: 'dummy',
        region: 'us-east-1',
      },
    });
    const cluster = new ecs.Cluster(stack, 'Cluster');
    const image = new AssetImage('test/nginx');
    new ApplicationLoadBalancedCodeDeployedFargateService(stack, 'Service', {
      cluster,
      taskImageOptions: {
        image,
      },
      apiTestSteps: [{
        name: 'health',
        path: '/health',
        jmesPath: 'status',
        expectedValue: 'ok',
      }],
    });

    const template = Template.fromStack(stack);
    template.hasResource('Custom::EcsDeployment', {
      Properties: {
        deploymentConfigName: 'CodeDeployDefault.ECSAllAtOnce',
        autoRollbackConfigurationEnabled: Match.absent(),
        autoRollbackConfigurationEvents: Match.absent(),
      },
    });
    template.resourceCountIs('AWS::CloudWatch::CompositeAlarm', 1);

  });
  test('can create without alarms', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TestStack', {
      env: {
        account: 'dummy',
        region: 'us-east-1',
      },
    });
    const cluster = new ecs.Cluster(stack, 'Cluster');
    const image = new AssetImage('test/nginx');
    new ApplicationLoadBalancedCodeDeployedFargateService(stack, 'Service', {
      cluster,
      taskImageOptions: {
        image,
      },
    });

    const template = Template.fromStack(stack);
    template.hasResource('Custom::EcsDeployment', {
      Properties: {
        deploymentConfigName: 'CodeDeployDefault.ECSAllAtOnce',
        autoRollbackConfigurationEnabled: Match.absent(),
        autoRollbackConfigurationEvents: Match.absent(),
      },
    });
    template.resourceCountIs('AWS::CloudWatch::CompositeAlarm', 0);

  });
});
