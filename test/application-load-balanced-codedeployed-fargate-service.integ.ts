import * as cdk from 'aws-cdk-lib';
import { Aspects } from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { AssetImage } from 'aws-cdk-lib/aws-ecs';
import { AwsSolutionsChecks, NagSuppressions } from 'cdk-nag';
import * as ecscodedeploy from '../src';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'cdk-ecs-codedeploy-service', {
  env: {
    account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
    region: 'us-west-2',
  },
});

// Network infrastructure
const cluster = new ecs.Cluster(stack, 'Cluster');
const image = new AssetImage('test/nginx');
const service = new ecscodedeploy.ApplicationLoadBalancedCodeDeployedFargateService(stack, 'Service', {
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

// Include cfn-nag
Aspects.of(stack).add(new AwsSolutionsChecks());

// ignore findings from constructs out of scope
NagSuppressions.addResourceSuppressions(cluster, [
  { id: 'AwsSolutions-ECS4', reason: 'Unrelated to construct under test' },
  { id: 'AwsSolutions-VPC7', reason: 'Unrelated to construct under test' },
], true);

NagSuppressions.addResourceSuppressionsByPath(stack, [
  `/${stack.stackName}/Service/DeploymentGroup/Deployment/DeploymentProvider/framework-onEvent`,
  `/${stack.stackName}/Service/DeploymentGroup/Deployment/DeploymentProvider/framework-isComplete`,
  `/${stack.stackName}/Service/DeploymentGroup/Deployment/DeploymentProvider/framework-onTimeout`,
  `/${stack.stackName}/Service/DeploymentGroup/Deployment/DeploymentProvider/waiter-state-machine`,
  `/${stack.stackName}/Service/DeploymentGroup/Deployment/DeploymentProviderOnEventLambda`,
  `/${stack.stackName}/Service/DeploymentGroup/Deployment/DeploymentProviderIsCompleteLambda`,
], [
  { id: 'AwsSolutions-IAM5', reason: 'Unrelated to construct under test' },
  { id: 'AwsSolutions-L1', reason: 'Unrelated to construct under test' },
  { id: 'AwsSolutions-SF1', reason: 'Unrelated to construct under test' },
  { id: 'AwsSolutions-SF2', reason: 'Unrelated to construct under test' },
], true);

// Ignore findings from access log bucket
NagSuppressions.addResourceSuppressions(
  service.accessLogBucket,
  [
    { id: 'AwsSolutions-S1', reason: 'Dont need access logs for access log bucket' },
    { id: 'AwsSolutions-IAM5', reason: 'Allow resource:*', appliesTo: ['Resource::*'] },
  ],
);

NagSuppressions.addResourceSuppressions(
  service.apiCanary!.role,
  [{ id: 'AwsSolutions-IAM5', reason: 'Allow resource:*' }],
);
NagSuppressions.addResourceSuppressions(
  service.apiCanary!.artifactsBucket,
  [{ id: 'AwsSolutions-S1', reason: 'Dont need access logs for canary bucket' }],
);

NagSuppressions.addResourceSuppressions(service.deploymentGroup.role, [
  { id: 'AwsSolutions-IAM4', reason: 'Allow AWSCodeDeployRoleForECS policy', appliesTo: ['Policy::arn:<AWS::Partition>:iam::aws:policy/AWSCodeDeployRoleForECS'] },
]);

NagSuppressions.addResourceSuppressions(service.deployment, [
  {
    id: 'AwsSolutions-IAM4',
    reason: 'Allow AWSLambdaBasicExecutionRole policy',
    appliesTo: ['Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'],
  },
], true);

NagSuppressions.addResourceSuppressions(service.taskDefinition.executionRole!, [
  {
    id: 'AwsSolutions-IAM5',
    reason: 'Allow wildcard resource on execution policy',
  },
], true);

NagSuppressions.addResourceSuppressions(service.loadBalancer, [
  {
    id: 'AwsSolutions-EC23',
    reason: 'Allow public inbound access on ELB',
  },
], true);

app.synth();
