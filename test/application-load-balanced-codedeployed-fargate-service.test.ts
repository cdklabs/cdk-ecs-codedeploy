import { Match, Template } from 'aws-cdk-lib/assertions';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { AssetImage } from 'aws-cdk-lib/aws-ecs';
import * as elb from 'aws-cdk-lib/aws-elasticloadbalancingv2';
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
  test('can be created with target group health check', () => {
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
      healthCheck: {
        command: ['CMD-SHELL', 'exit 0'],
        interval: cdk.Duration.seconds(10),
        timeout: cdk.Duration.seconds(5),
      },
      targetHealthCheck: {
        path: '/health',
        port: '80',
        protocol: elb.Protocol.HTTP,
        timeout: cdk.Duration.seconds(29),
        interval: cdk.Duration.seconds(30),
      },
    });
    const template = Template.fromStack(stack);
    template.hasResource('AWS::ECS::TaskDefinition', {
      Properties: {
        ContainerDefinitions: [
          {
            Essential: true,
            HealthCheck: {
              Command: ['CMD-SHELL', 'exit 0'],
              Interval: 10,
              Timeout: 5,
            },
          },
        ],
      },
    });
    template.hasResource('AWS::ElasticLoadBalancingV2::TargetGroup', {
      Properties: {
        HealthCheckIntervalSeconds: 30,
        HealthCheckPath: '/health',
        HealthCheckPort: '80',
        HealthCheckProtocol: 'HTTP',
        HealthCheckTimeoutSeconds: 29,
      },
    });
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
