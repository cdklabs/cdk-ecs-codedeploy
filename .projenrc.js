const { awscdk } = require('projen');
const { Stability } = require('projen/lib/cdk');
const { UpdateSnapshot } = require('projen/lib/javascript');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Casey Lee',
  authorAddress: 'caseypl@amazon.com',
  cdkVersion: '2.50.0',
  defaultReleaseBranch: 'main',
  name: '@cdklabs/cdk-ecs-codedeploy',
  description: 'CDK Constructs for performing ECS Deployments with CodeDeploy',
  repositoryUrl: 'https://github.com/cdklabs/cdk-ecs-codedeploy',
  stability: Stability.EXPERIMENTAL,
  docgen: true,
  autoApproveUpgrades: true,
  autoApproveOptions: {
    allowedUsernames: ['cdklabs-automation'],
    secret: 'GITHUB_TOKEN',
  },
  npmAccess: 'public',
  lambdaOptions: {
    runtime: awscdk.LambdaRuntime.NODEJS_16_X,
  },
  jestOptions: {
    updateSnapshot: UpdateSnapshot.NEVER,
  },
  publishToMaven: {
    javaPackage: 'io.github.cdklabs.cdk.ecs.codedeploy',
    mavenGroupId: 'io.github.cdklabs',
    mavenArtifactId: 'cdk-ecs-codedeploy',
    mavenEndpoint: 'https://s01.oss.sonatype.org',
  },
  publishToNuget: {
    dotNetNamespace: 'Cdklabs.CdkEcsCodeDeploy',
    packageId: 'Cdklabs.CdkEcsCodeDeploy',
  },
  publishToPypi: {
    distName: 'cdklabs.ecs-codedeploy',
    module: 'cdk.ecs_codedeploy',
  },
  publishToGo: {
    moduleName: 'github.com/cdklabs/cdk-ecs-codedeploy-go',
  },
  devDeps: [
    '@types/aws-lambda',
    'lambda-tester',
    'aws-sdk-mock@5.6.0',
    '@types/lambda-tester',
    '@aws-cdk/integ-tests-alpha',
  ],
  bundledDeps: ['aws-sdk'],
  deps: [],
  keywords: [
    'aws',
    'cdk',
    'ecs',
    'codedeploy',
  ],
});
project.synth();