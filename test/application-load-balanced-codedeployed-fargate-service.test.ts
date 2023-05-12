import { Match, Template } from 'aws-cdk-lib/assertions';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { AssetImage } from 'aws-cdk-lib/aws-ecs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
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
  test('can with custom testPort', () => {
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
      testPort: 9999,
      apiTestSteps: [{
        name: 'health',
        path: '/health',
        jmesPath: 'status',
        expectedValue: 'ok',
      }],
    });

    const template = Template.fromStack(stack);
    template.hasResource('AWS::ElasticLoadBalancingV2::Listener', {
      Properties: {
        Port: 9999,
      },
    });
    template.hasResource('AWS::ElasticLoadBalancingV2::TargetGroup', {
      Properties: {
        Port: 9999,
      },
    });

  });
  test('can be created with hooks', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TestStack', {
      env: {
        account: 'dummy',
        region: 'us-east-1',
      },
    });
    const cluster = new ecs.Cluster(stack, 'Cluster');
    const image = new AssetImage('test/nginx');
    const testLambda = lambda.Function.fromFunctionArn(
      stack,
      'lambda',
      'arn:aws:lambda:us-east-1:123:function:lambda',
    );
    new ApplicationLoadBalancedCodeDeployedFargateService(stack, 'Service', {
      cluster,
      taskImageOptions: {
        image,
      },
      hooks: {
        beforeInstall: 'abc123',
        afterInstall: 'def456',
        afterAllowTestTraffic: '123abc',
        beforeAllowTraffic: '456def',
        afterAllowTraffic: testLambda,
      },
    });

    const template = Template.fromStack(stack);
    template.hasResource('Custom::EcsDeployment', {
      Properties: {
        revisionAppSpecContent: {
          'Fn::Join': Match.arrayWith([
            Match.arrayWith([
              '","LoadBalancerInfo":{"ContainerName":"web","ContainerPort":80}}}}],"Hooks":[{"BeforeInstall":"abc123"},{"AfterInstall":"def456"},{"AfterAllowTestTraffic":"123abc"},{"BeforeAllowTraffic":"456def"},{"AfterAllowTraffic":"arn:aws:lambda:us-east-1:123:function:lambda"}]}',
            ]),
          ]),
        },
      },
    });
  });
});
