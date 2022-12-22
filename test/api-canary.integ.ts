import { App, Aspects, Duration, Stack } from 'aws-cdk-lib';
import { AwsSolutionsChecks, NagSuppressions } from 'cdk-nag';
import { ApiCanary } from '../src/api-canary';

const app = new App();
const stack = new Stack(app, 'TestStack');
const steps = [
  {
    name: 'info',
    path: '/614/info.0.json',
    jmesPath: 'safe_title',
    expectedValue: 'Woodpecker',
  },
];
new ApiCanary(stack, 'SyntheticTest', {
  baseUrl: 'https://xkcd.com',
  durationAlarmThreshold: Duration.seconds(5),
  threadCount: 5,
  steps,
});

Aspects.of(stack).add(new AwsSolutionsChecks());

// Suppress CDK-NAG for Canary
NagSuppressions.addResourceSuppressionsByPath(
  stack,
  '/TestStack/SyntheticTestArtifactsBucket/Resource',
  [
    { id: 'AwsSolutions-S1', reason: 'Dont need access logs for canary bucket' },
    { id: 'AwsSolutions-IAM5', reason: 'Allow resource:*', appliesTo: ['Resource::*'] },
  ],
);
NagSuppressions.addResourceSuppressionsByPath(
  stack,
  '/TestStack/SyntheticTest/ServiceRole/Resource',
  [{ id: 'AwsSolutions-IAM5', reason: 'Allow resource:*' }],
);

app.synth();