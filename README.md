# CDK ECS CodeDeploy

[![npm version](https://badge.fury.io/js/@cdklabs%2Fcdk-ecs-codedeploy.svg)](https://badge.fury.io/js/@cdklabs%2Fcdk-ecs-codedeploy)
[![Maven Central](https://maven-badges.herokuapp.com/maven-central/io.github.cdklabs/cdk-ecs-codedeploy/badge.svg)](https://maven-badges.herokuapp.com/maven-central/io.github.cdklabs/cdk-ecs-codedeploy)
[![PyPI version](https://badge.fury.io/py/cdklabs.ecs-codedeploy.svg)](https://badge.fury.io/py/cdklabs.ecs-codedeploy)
[![NuGet version](https://badge.fury.io/nu/Cdklabs.CdkEcsCodeDeploy.svg)](https://badge.fury.io/nu/Cdklabs.CdkEcsCodeDeploy)
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/cdklabs/cdk-ecs-codedeploy)
[![Mergify](https://img.shields.io/endpoint.svg?url=https://api.mergify.com/badges/cdklabs/cdk-ecs-codedeploy&style=flat)](https://mergify.io)

This project contains CDK constructs to create CodeDeploy ECS deployments.

## Installation

<details><summary><strong>TypeScript</strong></summary>

```bash
yarn add @cdklabs/cdk-ecs-codedeploy
```

</details>

<details><summary><strong>Java</strong></summary>

See https://mvnrepository.com/artifact/io.github.cdklabs/cdk-ecs-codedeploy
</details>

<details><summary><strong>Python</strong></summary>

See https://pypi.org/project/cdklabs.ecs-codedeploy/
</details>

<details><summary><strong>C#</strong></summary>

See https://www.nuget.org/packages/Cdklabs.CdkEcsCodeDeploy/
</details>

## Getting Started

You can browse the documentation at https://constructs.dev/packages/cdk-ecs-codedeploy/

CodeDeploy for ECS can manage the deployment of new task definitions to ECS services.  Only 1 deployment construct can be defined for a given EcsDeploymentGroup.

```ts
declare const deploymentGroup: codeDeploy.IEcsDeploymentGroup;
declare const taskDefinition: ecs.ITaskDefinition;

EcsDeployment.forDeploymentGroup({
  deploymentGroup,
  appspec: new codedeploy.EcsAppSpec({
    taskDefinition,
    containerName: 'mycontainer',
    containerPort: 80,
  }),
});
```

The deployment will use the AutoRollbackConfig for the EcsDeploymentGroup unless it is overridden in the deployment:

```ts
EcsDeployment.forDeploymentGroup({
  deploymentGroup,
  appspec: new codedeploy.EcsAppSpec({
    taskDefinition,
    containerName: 'mycontainer',
    containerPort: 80,
  }),
  autoRollback: {
    failedDeployment: true,
    deploymentInAlarm: true,
    stoppedDeployment: false,
  },
});
```

By default, the deployment will timeout after 30 minutes. The timeout value can be overridden:

```ts
EcsDeployment.forDeploymentGroup({
  deploymentGroup,
  appspec: new codedeploy.EcsAppSpec({
    taskDefinition,
    containerName: 'mycontainer',
    containerPort: 80,
  }),
  timeout: Duration.minutes(60),
});
```

## Local Development

```bash
yarn install
yarn build
yarn test
```

To run an integration test and update the snapshot, run:

```bash
yarn integ:deployment:deploy
```

To recreate snapshots for integration tests, run:

```bash
yarn integ:snapshot-all
```

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the Apache-2.0 License.
