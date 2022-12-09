# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### EcsDeployment <a name="EcsDeployment" id="@cdklabs/cdk-ecs-codedeploy.EcsDeployment"></a>

A CodeDeploy Deployment for a Amazon ECS service DeploymentGroup.

#### Initializers <a name="Initializers" id="@cdklabs/cdk-ecs-codedeploy.EcsDeployment.Initializer"></a>

```typescript
import { EcsDeployment } from '@cdklabs/cdk-ecs-codedeploy'

new EcsDeployment(scope: Construct, id: string, props: EcsDeploymentProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeployment.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeployment.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeployment.Initializer.parameter.props">props</a></code> | <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps">EcsDeploymentProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-ecs-codedeploy.EcsDeployment.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-ecs-codedeploy.EcsDeployment.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@cdklabs/cdk-ecs-codedeploy.EcsDeployment.Initializer.parameter.props"></a>

- *Type:* <a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps">EcsDeploymentProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeployment.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cdklabs/cdk-ecs-codedeploy.EcsDeployment.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeployment.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeployment.forDeploymentGroup">forDeploymentGroup</a></code> | An {@link EcsDeploymentGroup} must only have 1 EcsDeployment. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cdklabs/cdk-ecs-codedeploy.EcsDeployment.isConstruct"></a>

```typescript
import { EcsDeployment } from '@cdklabs/cdk-ecs-codedeploy'

EcsDeployment.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cdklabs/cdk-ecs-codedeploy.EcsDeployment.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `forDeploymentGroup` <a name="forDeploymentGroup" id="@cdklabs/cdk-ecs-codedeploy.EcsDeployment.forDeploymentGroup"></a>

```typescript
import { EcsDeployment } from '@cdklabs/cdk-ecs-codedeploy'

EcsDeployment.forDeploymentGroup(props: EcsDeploymentProps)
```

An {@link EcsDeploymentGroup} must only have 1 EcsDeployment.

This limit is enforced by not allowing
the `scope` or `id` to be passed to the constructor. The `scope` will always be set to the
`deploymentGroup` from `props` and the `id` will always be set to the string 'Deployment'
to force an error if mulitiple EcsDeployment constructs are created for a single EcsDeploymentGrouop.

###### `props`<sup>Required</sup> <a name="props" id="@cdklabs/cdk-ecs-codedeploy.EcsDeployment.forDeploymentGroup.parameter.props"></a>

- *Type:* <a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps">EcsDeploymentProps</a>

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeployment.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeployment.property.deploymentId">deploymentId</a></code> | <code>string</code> | The id of the deployment that was created. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-ecs-codedeploy.EcsDeployment.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `deploymentId`<sup>Required</sup> <a name="deploymentId" id="@cdklabs/cdk-ecs-codedeploy.EcsDeployment.property.deploymentId"></a>

```typescript
public readonly deploymentId: string;
```

- *Type:* string

The id of the deployment that was created.

---


## Structs <a name="Structs" id="Structs"></a>

### AwsvpcConfiguration <a name="AwsvpcConfiguration" id="@cdklabs/cdk-ecs-codedeploy.AwsvpcConfiguration"></a>

Network configuration for ECS services that have a network type of `awsvpc`.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-ecs-codedeploy.AwsvpcConfiguration.Initializer"></a>

```typescript
import { AwsvpcConfiguration } from '@cdklabs/cdk-ecs-codedeploy'

const awsvpcConfiguration: AwsvpcConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.AwsvpcConfiguration.property.assignPublicIp">assignPublicIp</a></code> | <code>boolean</code> | Assign a public IP address to the task. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.AwsvpcConfiguration.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | The Security Groups to use for the task. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.AwsvpcConfiguration.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | The VPC to use for the task. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.AwsvpcConfiguration.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | The Subnets to use for the task. |

---

##### `assignPublicIp`<sup>Required</sup> <a name="assignPublicIp" id="@cdklabs/cdk-ecs-codedeploy.AwsvpcConfiguration.property.assignPublicIp"></a>

```typescript
public readonly assignPublicIp: boolean;
```

- *Type:* boolean

Assign a public IP address to the task.

---

##### `securityGroups`<sup>Required</sup> <a name="securityGroups" id="@cdklabs/cdk-ecs-codedeploy.AwsvpcConfiguration.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]

The Security Groups to use for the task.

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="@cdklabs/cdk-ecs-codedeploy.AwsvpcConfiguration.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

The VPC to use for the task.

---

##### `vpcSubnets`<sup>Required</sup> <a name="vpcSubnets" id="@cdklabs/cdk-ecs-codedeploy.AwsvpcConfiguration.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection

The Subnets to use for the task.

---

### EcsDeploymentProps <a name="EcsDeploymentProps" id="@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps"></a>

Construction properties of {@link EcsDeployment}.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps.Initializer"></a>

```typescript
import { EcsDeploymentProps } from '@cdklabs/cdk-ecs-codedeploy'

const ecsDeploymentProps: EcsDeploymentProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps.property.appspec">appspec</a></code> | <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsAppSpec">EcsAppSpec</a></code> | The AppSpec to use for the deployment. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps.property.deploymentGroup">deploymentGroup</a></code> | <code>aws-cdk-lib.aws_codedeploy.IEcsDeploymentGroup</code> | The deployment group to target for this deployment. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps.property.autoRollback">autoRollback</a></code> | <code>aws-cdk-lib.aws_codedeploy.AutoRollbackConfig</code> | The configuration for rollback in the event that a deployment fails. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps.property.description">description</a></code> | <code>string</code> | The description for the deployment. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps.property.timeout">timeout</a></code> | <code>aws-cdk-lib.Duration</code> | The timeout for the deployment. |

---

##### `appspec`<sup>Required</sup> <a name="appspec" id="@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps.property.appspec"></a>

```typescript
public readonly appspec: EcsAppSpec;
```

- *Type:* <a href="#@cdklabs/cdk-ecs-codedeploy.EcsAppSpec">EcsAppSpec</a>

The AppSpec to use for the deployment.

{@link https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-resources.html#reference-appspec-file-structure-resources-ecs}

---

##### `deploymentGroup`<sup>Required</sup> <a name="deploymentGroup" id="@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps.property.deploymentGroup"></a>

```typescript
public readonly deploymentGroup: IEcsDeploymentGroup;
```

- *Type:* aws-cdk-lib.aws_codedeploy.IEcsDeploymentGroup

The deployment group to target for this deployment.

---

##### `autoRollback`<sup>Optional</sup> <a name="autoRollback" id="@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps.property.autoRollback"></a>

```typescript
public readonly autoRollback: AutoRollbackConfig;
```

- *Type:* aws-cdk-lib.aws_codedeploy.AutoRollbackConfig
- *Default:* : no automatic rollback triggered

The configuration for rollback in the event that a deployment fails.

---

##### `description`<sup>Optional</sup> <a name="description" id="@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* no description

The description for the deployment.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* 30 minutes

The timeout for the deployment.

If the timeout is reached, it will trigger a rollback of the stack.

---

### TargetService <a name="TargetService" id="@cdklabs/cdk-ecs-codedeploy.TargetService"></a>

Describe the target for CodeDeploy to use when creating a deployment for a {@link ecs.EcsDeploymentGroup}.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-ecs-codedeploy.TargetService.Initializer"></a>

```typescript
import { TargetService } from '@cdklabs/cdk-ecs-codedeploy'

const targetService: TargetService = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.TargetService.property.containerName">containerName</a></code> | <code>string</code> | The name of the Amazon ECS container that contains your Amazon ECS application. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.TargetService.property.containerPort">containerPort</a></code> | <code>number</code> | The port on the container where traffic will be routed to. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.TargetService.property.taskDefinition">taskDefinition</a></code> | <code>aws-cdk-lib.aws_ecs.ITaskDefinition</code> | The TaskDefintion to deploy to the target services. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.TargetService.property.awsvpcConfiguration">awsvpcConfiguration</a></code> | <code><a href="#@cdklabs/cdk-ecs-codedeploy.AwsvpcConfiguration">AwsvpcConfiguration</a></code> | Network configuration for ECS services that have a network type of `awsvpc`. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.TargetService.property.capacityProviderStrategy">capacityProviderStrategy</a></code> | <code>aws-cdk-lib.aws_ecs.CapacityProviderStrategy[]</code> | A list of Amazon ECS capacity providers to use for the deployment. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.TargetService.property.platformVersion">platformVersion</a></code> | <code>aws-cdk-lib.aws_ecs.FargatePlatformVersion</code> | The platform version of the Fargate tasks in the deployed Amazon ECS service. |

---

##### `containerName`<sup>Required</sup> <a name="containerName" id="@cdklabs/cdk-ecs-codedeploy.TargetService.property.containerName"></a>

```typescript
public readonly containerName: string;
```

- *Type:* string

The name of the Amazon ECS container that contains your Amazon ECS application.

It must be a container specified in your Amazon ECS task definition.

---

##### `containerPort`<sup>Required</sup> <a name="containerPort" id="@cdklabs/cdk-ecs-codedeploy.TargetService.property.containerPort"></a>

```typescript
public readonly containerPort: number;
```

- *Type:* number

The port on the container where traffic will be routed to.

---

##### `taskDefinition`<sup>Required</sup> <a name="taskDefinition" id="@cdklabs/cdk-ecs-codedeploy.TargetService.property.taskDefinition"></a>

```typescript
public readonly taskDefinition: ITaskDefinition;
```

- *Type:* aws-cdk-lib.aws_ecs.ITaskDefinition

The TaskDefintion to deploy to the target services.

---

##### `awsvpcConfiguration`<sup>Optional</sup> <a name="awsvpcConfiguration" id="@cdklabs/cdk-ecs-codedeploy.TargetService.property.awsvpcConfiguration"></a>

```typescript
public readonly awsvpcConfiguration: AwsvpcConfiguration;
```

- *Type:* <a href="#@cdklabs/cdk-ecs-codedeploy.AwsvpcConfiguration">AwsvpcConfiguration</a>
- *Default:* reuse current network settings for ECS service.

Network configuration for ECS services that have a network type of `awsvpc`.

---

##### `capacityProviderStrategy`<sup>Optional</sup> <a name="capacityProviderStrategy" id="@cdklabs/cdk-ecs-codedeploy.TargetService.property.capacityProviderStrategy"></a>

```typescript
public readonly capacityProviderStrategy: CapacityProviderStrategy[];
```

- *Type:* aws-cdk-lib.aws_ecs.CapacityProviderStrategy[]
- *Default:* reuse current capcity provider strategy for ECS service.

A list of Amazon ECS capacity providers to use for the deployment.

---

##### `platformVersion`<sup>Optional</sup> <a name="platformVersion" id="@cdklabs/cdk-ecs-codedeploy.TargetService.property.platformVersion"></a>

```typescript
public readonly platformVersion: FargatePlatformVersion;
```

- *Type:* aws-cdk-lib.aws_ecs.FargatePlatformVersion
- *Default:* LATEST

The platform version of the Fargate tasks in the deployed Amazon ECS service.

{@link https://docs.aws.amazon.com/AmazonECS/latest/developerguide/platform_versions.html}

---

## Classes <a name="Classes" id="Classes"></a>

### EcsAppSpec <a name="EcsAppSpec" id="@cdklabs/cdk-ecs-codedeploy.EcsAppSpec"></a>

Represents an AppSpec to be used for ECS services.

{@link https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-resources.html#reference-appspec-file-structure-resources-ecs}

#### Initializers <a name="Initializers" id="@cdklabs/cdk-ecs-codedeploy.EcsAppSpec.Initializer"></a>

```typescript
import { EcsAppSpec } from '@cdklabs/cdk-ecs-codedeploy'

new EcsAppSpec(targetService: TargetService)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsAppSpec.Initializer.parameter.targetService">targetService</a></code> | <code><a href="#@cdklabs/cdk-ecs-codedeploy.TargetService">TargetService</a></code> | *No description.* |

---

##### `targetService`<sup>Required</sup> <a name="targetService" id="@cdklabs/cdk-ecs-codedeploy.EcsAppSpec.Initializer.parameter.targetService"></a>

- *Type:* <a href="#@cdklabs/cdk-ecs-codedeploy.TargetService">TargetService</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsAppSpec.toString">toString</a></code> | Render JSON string for this AppSpec to be used. |

---

##### `toString` <a name="toString" id="@cdklabs/cdk-ecs-codedeploy.EcsAppSpec.toString"></a>

```typescript
public toString(): string
```

Render JSON string for this AppSpec to be used.





