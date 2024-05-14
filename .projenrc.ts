import { CdklabsConstructLibrary } from 'cdklabs-projen-project-types';
import { awscdk, javascript, JsonPatch } from 'projen';
import { Stability } from 'projen/lib/cdk';

export interface WorkflowDotNetVersionPatchOptions {
  /**
   * The workflow to patch.
   */
  workflow: string;
  /**
   * Name of the job.
   */
  jobName: string;
  /**
   * dotNet Version
   */
  dotNetVersion: string;
}
export class WorkflowDotNetVersionPatch {
  public constructor(project: javascript.NodeProject, options: WorkflowDotNetVersionPatchOptions) {
    project.tryFindObjectFile(`.github/workflows/${options.workflow}.yml`)?.patch(
      JsonPatch.replace(`/jobs/${options.jobName}/steps/1/with/dotnet-version`, options.dotNetVersion),
    );
  }
}
const cdkVersion = '2.139.0';
const project = new CdklabsConstructLibrary({
  setNodeEngineVersion: false,
  private: false,
  workflowNodeVersion: '18.x',
  versionrcOptions: {
    types: [
      { type: 'feat', section: 'Features' },
      { type: 'fix', section: 'Bug Fixes' },
      { type: 'chore', section: 'Chores' },
      { type: 'test', hidden: true },
      { type: 'build', hidden: true },
      { type: 'ci', hidden: true },
    ],
  },
  author: 'Amazon Web Services',
  authorAddress: 'https://aws.amazon.com',
  authorOrganization: true,
  cdkVersion,
  defaultReleaseBranch: 'main',
  name: '@cdklabs/cdk-ecs-codedeploy',
  description: 'CDK Constructs for performing ECS Deployments with CodeDeploy',
  repositoryUrl: 'https://github.com/cdklabs/cdk-ecs-codedeploy',
  stability: Stability.EXPERIMENTAL,
  docgen: true,
  autoApproveUpgrades: true,
  projenrcTs: true,
  autoApproveOptions: {
    allowedUsernames: ['cdklabs-automation'],
    secret: 'GITHUB_TOKEN',
  },
  lambdaOptions: {
    runtime: awscdk.LambdaRuntime.NODEJS_20_X,
  },
  jestOptions: {
    updateSnapshot: javascript.UpdateSnapshot.NEVER,
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
    `@aws-cdk/integ-tests-alpha@^${cdkVersion}-alpha.0`,
    'cdk-nag',
  ],
  bundledDeps: [
    '@aws-sdk/client-codedeploy',
    'jmespath',
  ],
  deps: [],
  peerDeps: [],
  keywords: [
    'aws',
    'cdk',
    'ecs',
    'codedeploy',
  ],
});

project.upgradeWorkflow?.postUpgradeTask.spawn(
  project.tasks.tryFind('bundle')!,
);
project.upgradeWorkflow?.postUpgradeTask.spawn(
  project.tasks.tryFind('integ:snapshot-all')!,
);

new WorkflowDotNetVersionPatch(project, { workflow: 'build', jobName: 'package-dotnet', dotNetVersion: '6.x' });
new WorkflowDotNetVersionPatch(project, { workflow: 'release', jobName: 'release_nuget', dotNetVersion: '6.x' });

project.synth();
