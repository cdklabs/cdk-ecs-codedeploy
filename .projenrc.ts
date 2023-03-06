import { awscdk, JsonPatch } from 'projen';
import { Stability } from 'projen/lib/cdk';
import { NodeProject, NpmAccess, UpdateSnapshot } from 'projen/lib/javascript';

export interface WorkflowDockerPatchOptions {
  /**
   * The workflow to patch.
   */
  workflow: 'build' | 'release';
  /**
   * Name of the workflow.
   * @default - same as `workflow`
   */
  workflowName?: string;
}

export class WorkflowNoDockerPatch {
  public constructor(project: NodeProject, options: WorkflowDockerPatchOptions) {
    const {
      workflow,
      workflowName = options.workflow,
    } = options;

    project.tryFindObjectFile(`.github/workflows/${workflow}.yml`)?.patch(
      JsonPatch.add(`/jobs/${workflowName}/steps/`, {
        name: 'Setup Node.js',
        uses: 'actions/setup-node@v3',
        with: { 'node-version': project.minNodeVersion ?? '14.x' },
      }),
      JsonPatch.remove(`/jobs/${workflowName}/container`),
    );
  }
}
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
  public constructor(project: NodeProject, options: WorkflowDotNetVersionPatchOptions) {
    project.tryFindObjectFile(`.github/workflows/${options.workflow}.yml`)?.patch(
      JsonPatch.replace(`/jobs/${options.jobName}/steps/1/with/dotnet-version`, options.dotNetVersion),
    );
  }
}

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Amazon Web Services',
  authorAddress: 'https://aws.amazon.com',
  authorOrganization: true,
  cdkVersion: '2.67.0',
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
  npmAccess: NpmAccess.PUBLIC,
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
    '@aws-cdk/aws-synthetics-alpha',
  ],
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

new WorkflowNoDockerPatch(project, { workflow: 'build' });
new WorkflowNoDockerPatch(project, { workflow: 'release' });

new WorkflowDotNetVersionPatch(project, { workflow: 'build', jobName: 'package-dotnet', dotNetVersion: '6.x' });
new WorkflowDotNetVersionPatch(project, { workflow: 'release', jobName: 'release_nuget', dotNetVersion: '6.x' });

project.synth();