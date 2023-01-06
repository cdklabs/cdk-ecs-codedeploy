const { awscdk } = require('projen');
const { Stability } = require('projen/lib/cdk');
const { UpdateSnapshot } = require('projen/lib/javascript');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Amazon Web Services',
  authorAddress: 'https://aws.amazon.com',
  authorOrganization: true,
  cdkVersion: '2.55.1',
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
  workflowBootstrapSteps: [
    {
      // This step is required to allow the build workflow to build docker images.
      name: 'Change permissions on /var/run/docker.sock',
      run: 'sudo chown superchain /var/run/docker.sock',
    },
  ],
  npmAccess: 'public',
  lambdaOptions: {
    runtime: awscdk.LambdaRuntime.NODEJS_18_X,
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
    'aws-sdk-client-mock',
    'aws-sdk-client-mock-jest',
    '@types/lambda-tester',
    '@aws-cdk/integ-tests-alpha',
    'cdk-nag',
  ],
  bundledDeps: [
    '@aws-sdk/client-codedeploy',
    'jmespath',
  ],
  deps: [],
  peerDeps: [
    '@aws-cdk/aws-synthetics-alpha@2.55.1-alpha.0',
  ],
  keywords: [
    'aws',
    'cdk',
    'ecs',
    'codedeploy',
  ],
});


project.upgradeWorkflow.postUpgradeTask.spawn(
  project.tasks.tryFind('bundle'),
);
project.upgradeWorkflow.postUpgradeTask.spawn(
  project.tasks.tryFind('integ:snapshot-all'),
);

project.synth();