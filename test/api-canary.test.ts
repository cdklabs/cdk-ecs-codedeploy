import { Duration, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { ApiCanary } from '../src/api-canary';

describe('SyntheticTest', () => {
  test('default props', () => {
    const stack = new Stack();
    const steps = [
      {
        name: 'info',
        path: '/908/info.0.json',
        jmesPath: 'safe_title',
        expectedValue: 'The Cloud',
      },
    ];
    new ApiCanary(stack, 'SyntheticTest', {
      baseUrl: 'https://xkcd.com',
      durationAlarmThreshold: Duration.seconds(4),
      threadCount: 5,
      steps,
    });
    Template.fromStack(stack).hasResource('AWS::Synthetics::Canary', {
      Properties: {
        RunConfig: {
          EnvironmentVariables: {
            baseUrl: 'https://xkcd.com',
            threadCount: '5',
          },
        },
        RuntimeVersion: 'syn-nodejs-puppeteer-6.2',
        Schedule: {
          DurationInSeconds: '0',
          Expression: 'rate(5 minutes)',
        },
        StartCanaryAfterCreation: true,
      },
    });
    Template.fromStack(stack).resourceCountIs('AWS::CloudWatch::Alarm', 2);
    Template.fromStack(stack).hasResource('AWS::CloudWatch::Alarm', {
      Properties: {
        ComparisonOperator: 'GreaterThanThreshold',
        EvaluationPeriods: 2,
        MetricName: 'Duration',
        Namespace: 'CloudWatchSynthetics',
        Period: 300,
        Statistic: 'Average',
        Threshold: 4000,
      },
    });
  });
});
