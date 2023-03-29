# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### ApiCanary <a name="ApiCanary" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary"></a>

A CloudWatch Synthetic Canary for monitoring APIs.

#### Initializers <a name="Initializers" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.Initializer"></a>

```typescript
import { ApiCanary } from '@cdklabs/cdk-ecs-codedeploy'

new ApiCanary(scope: Construct, id: string, props: ApiCanaryProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary.Initializer.parameter.props">props</a></code> | <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps">ApiCanaryProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.Initializer.parameter.props"></a>

- *Type:* <a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps">ApiCanaryProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary.metricDuration">metricDuration</a></code> | Measure the Duration of a single canary run, in seconds. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary.metricFailed">metricFailed</a></code> | Measure the number of failed canary runs over a given time period. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary.metricSuccessPercent">metricSuccessPercent</a></code> | Measure the percentage of successful canary runs. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary.addTestStep">addTestStep</a></code> | Add a new test step to this canary. |

---

##### `toString` <a name="toString" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `metricDuration` <a name="metricDuration" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.metricDuration"></a>

```typescript
public metricDuration(options?: MetricOptions): Metric
```

Measure the Duration of a single canary run, in seconds.

###### `options`<sup>Optional</sup> <a name="options" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.metricDuration.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

configuration options for the metric.

---

##### `metricFailed` <a name="metricFailed" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.metricFailed"></a>

```typescript
public metricFailed(options?: MetricOptions): Metric
```

Measure the number of failed canary runs over a given time period.

Default: sum over 5 minutes

###### `options`<sup>Optional</sup> <a name="options" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.metricFailed.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

configuration options for the metric.

---

##### `metricSuccessPercent` <a name="metricSuccessPercent" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.metricSuccessPercent"></a>

```typescript
public metricSuccessPercent(options?: MetricOptions): Metric
```

Measure the percentage of successful canary runs.

###### `options`<sup>Optional</sup> <a name="options" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.metricSuccessPercent.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.MetricOptions

configuration options for the metric.

---

##### `addTestStep` <a name="addTestStep" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.addTestStep"></a>

```typescript
public addTestStep(step: ApiTestStep): void
```

Add a new test step to this canary.

###### `step`<sup>Required</sup> <a name="step" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.addTestStep.parameter.step"></a>

- *Type:* <a href="#@cdklabs/cdk-ecs-codedeploy.ApiTestStep">ApiTestStep</a>

ApiTestStep to add.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary.isResource">isResource</a></code> | Check whether the given construct is a Resource. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.isConstruct"></a>

```typescript
import { ApiCanary } from '@cdklabs/cdk-ecs-codedeploy'

ApiCanary.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.isOwnedResource"></a>

```typescript
import { ApiCanary } from '@cdklabs/cdk-ecs-codedeploy'

ApiCanary.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.isResource"></a>

```typescript
import { ApiCanary } from '@cdklabs/cdk-ecs-codedeploy'

ApiCanary.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary.property.artifactsBucket">artifactsBucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | Bucket where data from each canary run is stored. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary.property.canaryId">canaryId</a></code> | <code>string</code> | The canary ID. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary.property.canaryName">canaryName</a></code> | <code>string</code> | The canary Name. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary.property.canaryState">canaryState</a></code> | <code>string</code> | The state of the canary. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary.property.connections">connections</a></code> | <code>aws-cdk-lib.aws_ec2.Connections</code> | Access the Connections object. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | Execution role associated with this Canary. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary.property.successAlarm">successAlarm</a></code> | <code>aws-cdk-lib.aws_cloudwatch.Alarm</code> | A CloudWatch Alarm that triggers when the success rate falls below 100% over the past 2 periods. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary.property.durationAlarm">durationAlarm</a></code> | <code>aws-cdk-lib.aws_cloudwatch.Alarm</code> | A CloudWatch Alarm that triggers when the duration of the tests exceeds the given threshold over the past 2 periods. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `artifactsBucket`<sup>Required</sup> <a name="artifactsBucket" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.property.artifactsBucket"></a>

```typescript
public readonly artifactsBucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

Bucket where data from each canary run is stored.

---

##### `canaryId`<sup>Required</sup> <a name="canaryId" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.property.canaryId"></a>

```typescript
public readonly canaryId: string;
```

- *Type:* string

The canary ID.

---

##### `canaryName`<sup>Required</sup> <a name="canaryName" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.property.canaryName"></a>

```typescript
public readonly canaryName: string;
```

- *Type:* string

The canary Name.

---

##### `canaryState`<sup>Required</sup> <a name="canaryState" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.property.canaryState"></a>

```typescript
public readonly canaryState: string;
```

- *Type:* string

The state of the canary.

For example, 'RUNNING', 'STOPPED', 'NOT STARTED', or 'ERROR'.

---

##### `connections`<sup>Required</sup> <a name="connections" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.property.connections"></a>

```typescript
public readonly connections: Connections;
```

- *Type:* aws-cdk-lib.aws_ec2.Connections

Access the Connections object.

Will fail if not a VPC-enabled Canary

---

##### `role`<sup>Required</sup> <a name="role" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.property.role"></a>

```typescript
public readonly role: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole

Execution role associated with this Canary.

---

##### `successAlarm`<sup>Required</sup> <a name="successAlarm" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.property.successAlarm"></a>

```typescript
public readonly successAlarm: Alarm;
```

- *Type:* aws-cdk-lib.aws_cloudwatch.Alarm

A CloudWatch Alarm that triggers when the success rate falls below 100% over the past 2 periods.

---

##### `durationAlarm`<sup>Optional</sup> <a name="durationAlarm" id="@cdklabs/cdk-ecs-codedeploy.ApiCanary.property.durationAlarm"></a>

```typescript
public readonly durationAlarm: Alarm;
```

- *Type:* aws-cdk-lib.aws_cloudwatch.Alarm

A CloudWatch Alarm that triggers when the duration of the tests exceeds the given threshold over the past 2 periods.

---


### ApplicationLoadBalancedCodeDeployedFargateService <a name="ApplicationLoadBalancedCodeDeployedFargateService" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService"></a>

A Fargate service running on an ECS cluster fronted by an application load balancer and deployed by CodeDeploy.

#### Initializers <a name="Initializers" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.Initializer"></a>

```typescript
import { ApplicationLoadBalancedCodeDeployedFargateService } from '@cdklabs/cdk-ecs-codedeploy'

new ApplicationLoadBalancedCodeDeployedFargateService(scope: Construct, id: string, props: ApplicationLoadBalancedCodeDeployedFargateServiceProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.Initializer.parameter.props">props</a></code> | <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps">ApplicationLoadBalancedCodeDeployedFargateServiceProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.Initializer.parameter.props"></a>

- *Type:* <a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps">ApplicationLoadBalancedCodeDeployedFargateServiceProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.isConstruct"></a>

```typescript
import { ApplicationLoadBalancedCodeDeployedFargateService } from '@cdklabs/cdk-ecs-codedeploy'

ApplicationLoadBalancedCodeDeployedFargateService.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.cluster">cluster</a></code> | <code>aws-cdk-lib.aws_ecs.ICluster</code> | The cluster that hosts the service. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.listener">listener</a></code> | <code>aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationListener</code> | The listener for the service. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.loadBalancer">loadBalancer</a></code> | <code>aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationLoadBalancer</code> | The Application Load Balancer for the service. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.targetGroup">targetGroup</a></code> | <code>aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationTargetGroup</code> | The target group for the service. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.certificate">certificate</a></code> | <code>aws-cdk-lib.aws_certificatemanager.ICertificate</code> | Certificate Manager certificate to associate with the load balancer. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.internalDesiredCount">internalDesiredCount</a></code> | <code>number</code> | The desired number of instantiations of the task definition to keep running on the service. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.redirectListener">redirectListener</a></code> | <code>aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationListener</code> | The redirect listener for the service if redirectHTTP is enabled. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.assignPublicIp">assignPublicIp</a></code> | <code>boolean</code> | Determines whether the service will be assigned a public IP address. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.service">service</a></code> | <code>aws-cdk-lib.aws_ecs.FargateService</code> | The Fargate service in this construct. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.taskDefinition">taskDefinition</a></code> | <code>aws-cdk-lib.aws_ecs.FargateTaskDefinition</code> | The Fargate task definition in this construct. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.accessLogBucket">accessLogBucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | S3 Bucket used for access logs. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.application">application</a></code> | <code>aws-cdk-lib.aws_codedeploy.EcsApplication</code> | CodeDeploy application for this service. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.deployment">deployment</a></code> | <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeployment">EcsDeployment</a></code> | CodeDeploy deployment for this service. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.deploymentGroup">deploymentGroup</a></code> | <code>aws-cdk-lib.aws_codedeploy.EcsDeploymentGroup</code> | CodeDeploy deployment group for this service. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.greenTargetGroup">greenTargetGroup</a></code> | <code>aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationTargetGroup</code> | Test target group to use for CodeDeploy deployments. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.testListener">testListener</a></code> | <code>aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationListener</code> | Test listener to use for CodeDeploy deployments. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.apiCanary">apiCanary</a></code> | <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary">ApiCanary</a></code> | API Canary for the service. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.healthAlarm">healthAlarm</a></code> | <code>aws-cdk-lib.aws_cloudwatch.IAlarm</code> | Composite alarm for monitoring health of service. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `cluster`<sup>Required</sup> <a name="cluster" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.cluster"></a>

```typescript
public readonly cluster: ICluster;
```

- *Type:* aws-cdk-lib.aws_ecs.ICluster

The cluster that hosts the service.

---

##### `listener`<sup>Required</sup> <a name="listener" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.listener"></a>

```typescript
public readonly listener: ApplicationListener;
```

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationListener

The listener for the service.

---

##### `loadBalancer`<sup>Required</sup> <a name="loadBalancer" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.loadBalancer"></a>

```typescript
public readonly loadBalancer: ApplicationLoadBalancer;
```

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationLoadBalancer

The Application Load Balancer for the service.

---

##### `targetGroup`<sup>Required</sup> <a name="targetGroup" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.targetGroup"></a>

```typescript
public readonly targetGroup: ApplicationTargetGroup;
```

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationTargetGroup

The target group for the service.

---

##### `certificate`<sup>Optional</sup> <a name="certificate" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.certificate"></a>

```typescript
public readonly certificate: ICertificate;
```

- *Type:* aws-cdk-lib.aws_certificatemanager.ICertificate

Certificate Manager certificate to associate with the load balancer.

---

##### `internalDesiredCount`<sup>Optional</sup> <a name="internalDesiredCount" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.internalDesiredCount"></a>

```typescript
public readonly internalDesiredCount: number;
```

- *Type:* number

The desired number of instantiations of the task definition to keep running on the service.

The default is 1 for all new services and uses the existing services desired count
when updating an existing service if one is not provided.

---

##### `redirectListener`<sup>Optional</sup> <a name="redirectListener" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.redirectListener"></a>

```typescript
public readonly redirectListener: ApplicationListener;
```

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationListener

The redirect listener for the service if redirectHTTP is enabled.

---

##### `assignPublicIp`<sup>Required</sup> <a name="assignPublicIp" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.assignPublicIp"></a>

```typescript
public readonly assignPublicIp: boolean;
```

- *Type:* boolean

Determines whether the service will be assigned a public IP address.

---

##### `service`<sup>Required</sup> <a name="service" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.service"></a>

```typescript
public readonly service: FargateService;
```

- *Type:* aws-cdk-lib.aws_ecs.FargateService

The Fargate service in this construct.

---

##### `taskDefinition`<sup>Required</sup> <a name="taskDefinition" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.taskDefinition"></a>

```typescript
public readonly taskDefinition: FargateTaskDefinition;
```

- *Type:* aws-cdk-lib.aws_ecs.FargateTaskDefinition

The Fargate task definition in this construct.

---

##### `accessLogBucket`<sup>Required</sup> <a name="accessLogBucket" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.accessLogBucket"></a>

```typescript
public readonly accessLogBucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

S3 Bucket used for access logs.

---

##### `application`<sup>Required</sup> <a name="application" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.application"></a>

```typescript
public readonly application: EcsApplication;
```

- *Type:* aws-cdk-lib.aws_codedeploy.EcsApplication

CodeDeploy application for this service.

---

##### `deployment`<sup>Required</sup> <a name="deployment" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.deployment"></a>

```typescript
public readonly deployment: EcsDeployment;
```

- *Type:* <a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeployment">EcsDeployment</a>

CodeDeploy deployment for this service.

---

##### `deploymentGroup`<sup>Required</sup> <a name="deploymentGroup" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.deploymentGroup"></a>

```typescript
public readonly deploymentGroup: EcsDeploymentGroup;
```

- *Type:* aws-cdk-lib.aws_codedeploy.EcsDeploymentGroup

CodeDeploy deployment group for this service.

---

##### `greenTargetGroup`<sup>Required</sup> <a name="greenTargetGroup" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.greenTargetGroup"></a>

```typescript
public readonly greenTargetGroup: ApplicationTargetGroup;
```

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationTargetGroup

Test target group to use for CodeDeploy deployments.

---

##### `testListener`<sup>Required</sup> <a name="testListener" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.testListener"></a>

```typescript
public readonly testListener: ApplicationListener;
```

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationListener

Test listener to use for CodeDeploy deployments.

---

##### `apiCanary`<sup>Optional</sup> <a name="apiCanary" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.apiCanary"></a>

```typescript
public readonly apiCanary: ApiCanary;
```

- *Type:* <a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanary">ApiCanary</a>

API Canary for the service.

---

##### `healthAlarm`<sup>Optional</sup> <a name="healthAlarm" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateService.property.healthAlarm"></a>

```typescript
public readonly healthAlarm: IAlarm;
```

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarm

Composite alarm for monitoring health of service.

---


### EcsDeployment <a name="EcsDeployment" id="@cdklabs/cdk-ecs-codedeploy.EcsDeployment"></a>

A CodeDeploy Deployment for a Amazon ECS service DeploymentGroup.

An EcsDeploymentGroup
must only have 1 EcsDeployment. This limit is enforced by removing the scope and id
from the constructor. The scope will always be set to the EcsDeploymentGroup
and the id will always be set to the string 'Deployment' to force an error if mulitiple
EcsDeployment constructs are created for a single EcsDeploymentGroup.

#### Initializers <a name="Initializers" id="@cdklabs/cdk-ecs-codedeploy.EcsDeployment.Initializer"></a>

```typescript
import { EcsDeployment } from '@cdklabs/cdk-ecs-codedeploy'

new EcsDeployment(props: EcsDeploymentProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeployment.Initializer.parameter.props">props</a></code> | <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps">EcsDeploymentProps</a></code> | *No description.* |

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

### ApiCanaryProps <a name="ApiCanaryProps" id="@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps"></a>

#### Initializer <a name="Initializer" id="@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.Initializer"></a>

```typescript
import { ApiCanaryProps } from '@cdklabs/cdk-ecs-codedeploy'

const apiCanaryProps: ApiCanaryProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.baseUrl">baseUrl</a></code> | <code>string</code> | The base URL to use for tests. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.artifactsBucketLocation">artifactsBucketLocation</a></code> | <code>@aws-cdk/aws-synthetics-alpha.ArtifactsBucketLocation</code> | The s3 location that stores the data of the canary runs. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.canaryName">canaryName</a></code> | <code>string</code> | The name of the canary. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.durationAlarmThreshold">durationAlarmThreshold</a></code> | <code>aws-cdk-lib.Duration</code> | The threshold for triggering an alarm on the test duration. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.failureRetentionPeriod">failureRetentionPeriod</a></code> | <code>aws-cdk-lib.Duration</code> | How many days should failed runs be retained. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.role">role</a></code> | <code>aws-cdk-lib.aws_iam.IRole</code> | Canary execution role. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.schedule">schedule</a></code> | <code>@aws-cdk/aws-synthetics-alpha.Schedule</code> | Specify the schedule for how often the canary runs. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | The list of security groups to associate with the canary's network interfaces. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.startAfterCreation">startAfterCreation</a></code> | <code>boolean</code> | Whether or not the canary should start after creation. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.steps">steps</a></code> | <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiTestStep">ApiTestStep</a>[]</code> | The steps to perform in the synthetic test. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.successRetentionPeriod">successRetentionPeriod</a></code> | <code>aws-cdk-lib.Duration</code> | How many days should successful runs be retained. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.threadCount">threadCount</a></code> | <code>number</code> | The number of threads to run concurrently for the synthetic test. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.timeToLive">timeToLive</a></code> | <code>aws-cdk-lib.Duration</code> | How long the canary will be in a 'RUNNING' state. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | The VPC where this canary is run. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Where to place the network interfaces within the VPC. |

---

##### `baseUrl`<sup>Required</sup> <a name="baseUrl" id="@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.baseUrl"></a>

```typescript
public readonly baseUrl: string;
```

- *Type:* string

The base URL to use for tests.

---

##### `artifactsBucketLocation`<sup>Optional</sup> <a name="artifactsBucketLocation" id="@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.artifactsBucketLocation"></a>

```typescript
public readonly artifactsBucketLocation: ArtifactsBucketLocation;
```

- *Type:* @aws-cdk/aws-synthetics-alpha.ArtifactsBucketLocation
- *Default:* A new s3 bucket will be created without a prefix.

The s3 location that stores the data of the canary runs.

---

##### `canaryName`<sup>Optional</sup> <a name="canaryName" id="@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.canaryName"></a>

```typescript
public readonly canaryName: string;
```

- *Type:* string
- *Default:* A unique name will be generated from the construct ID

The name of the canary.

Be sure to give it a descriptive name that distinguishes it from
other canaries in your account.

Do not include secrets or proprietary information in your canary name. The canary name
makes up part of the canary ARN, which is included in outbound calls over the internet.

> [https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/servicelens_canaries_security.html](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/servicelens_canaries_security.html)

---

##### `durationAlarmThreshold`<sup>Optional</sup> <a name="durationAlarmThreshold" id="@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.durationAlarmThreshold"></a>

```typescript
public readonly durationAlarmThreshold: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* no alarm is created for duration

The threshold for triggering an alarm on the test duration.

---

##### `failureRetentionPeriod`<sup>Optional</sup> <a name="failureRetentionPeriod" id="@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.failureRetentionPeriod"></a>

```typescript
public readonly failureRetentionPeriod: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.days(31)

How many days should failed runs be retained.

---

##### `role`<sup>Optional</sup> <a name="role" id="@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.role"></a>

```typescript
public readonly role: IRole;
```

- *Type:* aws-cdk-lib.aws_iam.IRole
- *Default:* A unique role will be generated for this canary. You can add permissions to roles by calling 'addToRolePolicy'.

Canary execution role.

This is the role that will be assumed by the canary upon execution.
It controls the permissions that the canary will have. The role must
be assumable by the AWS Lambda service principal.

If not supplied, a role will be created with all the required permissions.
If you provide a Role, you must add the required permissions.

> [required permissions: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-executionrolearn](required permissions: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-synthetics-canary.html#cfn-synthetics-canary-executionrolearn)

---

##### `schedule`<sup>Optional</sup> <a name="schedule" id="@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.schedule"></a>

```typescript
public readonly schedule: Schedule;
```

- *Type:* @aws-cdk/aws-synthetics-alpha.Schedule
- *Default:* 'rate(5 minutes)'

Specify the schedule for how often the canary runs.

For example, if you set `schedule` to `rate(10 minutes)`, then the canary will run every 10 minutes.
You can set the schedule with `Schedule.rate(Duration)` (recommended) or you can specify an expression using `Schedule.expression()`.

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]
- *Default:* If the canary is placed within a VPC and a security group is not specified a dedicated security group will be created for this canary.

The list of security groups to associate with the canary's network interfaces.

You must provide `vpc` when using this prop.

---

##### `startAfterCreation`<sup>Optional</sup> <a name="startAfterCreation" id="@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.startAfterCreation"></a>

```typescript
public readonly startAfterCreation: boolean;
```

- *Type:* boolean
- *Default:* true

Whether or not the canary should start after creation.

---

##### `steps`<sup>Optional</sup> <a name="steps" id="@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.steps"></a>

```typescript
public readonly steps: ApiTestStep[];
```

- *Type:* <a href="#@cdklabs/cdk-ecs-codedeploy.ApiTestStep">ApiTestStep</a>[]

The steps to perform in the synthetic test.

---

##### `successRetentionPeriod`<sup>Optional</sup> <a name="successRetentionPeriod" id="@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.successRetentionPeriod"></a>

```typescript
public readonly successRetentionPeriod: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.days(31)

How many days should successful runs be retained.

---

##### `threadCount`<sup>Optional</sup> <a name="threadCount" id="@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.threadCount"></a>

```typescript
public readonly threadCount: number;
```

- *Type:* number
- *Default:* 20

The number of threads to run concurrently for the synthetic test.

---

##### `timeToLive`<sup>Optional</sup> <a name="timeToLive" id="@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.timeToLive"></a>

```typescript
public readonly timeToLive: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* no limit

How long the canary will be in a 'RUNNING' state.

For example, if you set `timeToLive` to be 1 hour and `schedule` to be `rate(10 minutes)`,
your canary will run at 10 minute intervals for an hour, for a total of 6 times.

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc
- *Default:* Not in VPC

The VPC where this canary is run.

Specify this if the canary needs to access resources in a VPC.

---

##### `vpcSubnets`<sup>Optional</sup> <a name="vpcSubnets" id="@cdklabs/cdk-ecs-codedeploy.ApiCanaryProps.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection
- *Default:* the Vpc default strategy if not specified

Where to place the network interfaces within the VPC.

You must provide `vpc` when using this prop.

---

### ApiTestStep <a name="ApiTestStep" id="@cdklabs/cdk-ecs-codedeploy.ApiTestStep"></a>

#### Initializer <a name="Initializer" id="@cdklabs/cdk-ecs-codedeploy.ApiTestStep.Initializer"></a>

```typescript
import { ApiTestStep } from '@cdklabs/cdk-ecs-codedeploy'

const apiTestStep: ApiTestStep = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiTestStep.property.name">name</a></code> | <code>string</code> | Name of test. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiTestStep.property.path">path</a></code> | <code>string</code> | Path of HTTP request, relative to baseUrl. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiTestStep.property.body">body</a></code> | <code>string</code> | Optional body to include in HTTP request. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiTestStep.property.expectedValue">expectedValue</a></code> | <code>any</code> | Expected value to compare against the jmesPath. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiTestStep.property.headers">headers</a></code> | <code>{[ key: string ]: string}</code> | Optional headers to include in HTTP request. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiTestStep.property.jmesPath">jmesPath</a></code> | <code>string</code> | JMESPath to apply against the response from the HTTP request and compare against expected value. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiTestStep.property.method">method</a></code> | <code>string</code> | Optional method to for HTTP request. |

---

##### `name`<sup>Required</sup> <a name="name" id="@cdklabs/cdk-ecs-codedeploy.ApiTestStep.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Name of test.

---

##### `path`<sup>Required</sup> <a name="path" id="@cdklabs/cdk-ecs-codedeploy.ApiTestStep.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

Path of HTTP request, relative to baseUrl.

---

##### `body`<sup>Optional</sup> <a name="body" id="@cdklabs/cdk-ecs-codedeploy.ApiTestStep.property.body"></a>

```typescript
public readonly body: string;
```

- *Type:* string
- *Default:* no body included.

Optional body to include in HTTP request.

---

##### `expectedValue`<sup>Optional</sup> <a name="expectedValue" id="@cdklabs/cdk-ecs-codedeploy.ApiTestStep.property.expectedValue"></a>

```typescript
public readonly expectedValue: any;
```

- *Type:* any
- *Default:* undefined

Expected value to compare against the jmesPath.

---

##### `headers`<sup>Optional</sup> <a name="headers" id="@cdklabs/cdk-ecs-codedeploy.ApiTestStep.property.headers"></a>

```typescript
public readonly headers: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no headers included.

Optional headers to include in HTTP request.

---

##### `jmesPath`<sup>Optional</sup> <a name="jmesPath" id="@cdklabs/cdk-ecs-codedeploy.ApiTestStep.property.jmesPath"></a>

```typescript
public readonly jmesPath: string;
```

- *Type:* string
- *Default:* no JMESPath assertion will be performed.

JMESPath to apply against the response from the HTTP request and compare against expected value.

---

##### `method`<sup>Optional</sup> <a name="method" id="@cdklabs/cdk-ecs-codedeploy.ApiTestStep.property.method"></a>

```typescript
public readonly method: string;
```

- *Type:* string
- *Default:* GET

Optional method to for HTTP request.

---

### ApplicationLoadBalancedCodeDeployedFargateServiceProps <a name="ApplicationLoadBalancedCodeDeployedFargateServiceProps" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps"></a>

The properties for the ApplicationLoadBalancedCodeDeployedFargateService service.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.Initializer"></a>

```typescript
import { ApplicationLoadBalancedCodeDeployedFargateServiceProps } from '@cdklabs/cdk-ecs-codedeploy'

const applicationLoadBalancedCodeDeployedFargateServiceProps: ApplicationLoadBalancedCodeDeployedFargateServiceProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.capacityProviderStrategies">capacityProviderStrategies</a></code> | <code>aws-cdk-lib.aws_ecs.CapacityProviderStrategy[]</code> | A list of Capacity Provider strategies used to place a service. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.certificate">certificate</a></code> | <code>aws-cdk-lib.aws_certificatemanager.ICertificate</code> | Certificate Manager certificate to associate with the load balancer. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.circuitBreaker">circuitBreaker</a></code> | <code>aws-cdk-lib.aws_ecs.DeploymentCircuitBreaker</code> | Whether to enable the deployment circuit breaker. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.cloudMapOptions">cloudMapOptions</a></code> | <code>aws-cdk-lib.aws_ecs.CloudMapOptions</code> | The options for configuring an Amazon ECS service to use service discovery. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.cluster">cluster</a></code> | <code>aws-cdk-lib.aws_ecs.ICluster</code> | The name of the cluster that hosts the service. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.deploymentController">deploymentController</a></code> | <code>aws-cdk-lib.aws_ecs.DeploymentController</code> | Specifies which deployment controller to use for the service. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.desiredCount">desiredCount</a></code> | <code>number</code> | The desired number of instantiations of the task definition to keep running on the service. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.domainName">domainName</a></code> | <code>string</code> | The domain name for the service, e.g. "api.example.com.". |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.domainZone">domainZone</a></code> | <code>aws-cdk-lib.aws_route53.IHostedZone</code> | The Route53 hosted zone for the domain, e.g. "example.com.". |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.enableECSManagedTags">enableECSManagedTags</a></code> | <code>boolean</code> | Specifies whether to enable Amazon ECS managed tags for the tasks within the service. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.enableExecuteCommand">enableExecuteCommand</a></code> | <code>boolean</code> | Whether ECS Exec should be enabled. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.healthCheckGracePeriod">healthCheckGracePeriod</a></code> | <code>aws-cdk-lib.Duration</code> | The period of time, in seconds, that the Amazon ECS service scheduler ignores unhealthy Elastic Load Balancing target health checks after a task has first started. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.idleTimeout">idleTimeout</a></code> | <code>aws-cdk-lib.Duration</code> | The load balancer idle timeout, in seconds. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.listenerPort">listenerPort</a></code> | <code>number</code> | Listener port of the application load balancer that will serve traffic to the service. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.loadBalancer">loadBalancer</a></code> | <code>aws-cdk-lib.aws_elasticloadbalancingv2.IApplicationLoadBalancer</code> | The application load balancer that will serve traffic to the service. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.loadBalancerName">loadBalancerName</a></code> | <code>string</code> | Name of the load balancer. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.maxHealthyPercent">maxHealthyPercent</a></code> | <code>number</code> | The maximum number of tasks, specified as a percentage of the Amazon ECS service's DesiredCount value, that can run in a service during a deployment. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.minHealthyPercent">minHealthyPercent</a></code> | <code>number</code> | The minimum number of tasks, specified as a percentage of the Amazon ECS service's DesiredCount value, that must continue to run and remain healthy during a deployment. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.openListener">openListener</a></code> | <code>boolean</code> | Determines whether or not the Security Group for the Load Balancer's Listener will be open to all traffic by default. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.propagateTags">propagateTags</a></code> | <code>aws-cdk-lib.aws_ecs.PropagatedTagSource</code> | Specifies whether to propagate the tags from the task definition or the service to the tasks in the service. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.protocol">protocol</a></code> | <code>aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationProtocol</code> | The protocol for connections from clients to the load balancer. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.protocolVersion">protocolVersion</a></code> | <code>aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationProtocolVersion</code> | The protocol version to use. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.publicLoadBalancer">publicLoadBalancer</a></code> | <code>boolean</code> | Determines whether the Load Balancer will be internet-facing. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.recordType">recordType</a></code> | <code>aws-cdk-lib.aws_ecs_patterns.ApplicationLoadBalancedServiceRecordType</code> | Specifies whether the Route53 record should be a CNAME, an A record using the Alias feature or no record at all. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.redirectHTTP">redirectHTTP</a></code> | <code>boolean</code> | Specifies whether the load balancer should redirect traffic on port 80 to port 443 to support HTTP->HTTPS redirects This is only valid if the protocol of the ALB is HTTPS. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.serviceName">serviceName</a></code> | <code>string</code> | The name of the service. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.sslPolicy">sslPolicy</a></code> | <code>aws-cdk-lib.aws_elasticloadbalancingv2.SslPolicy</code> | The security policy that defines which ciphers and protocols are supported by the ALB Listener. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.targetProtocol">targetProtocol</a></code> | <code>aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationProtocol</code> | The protocol for connections from the load balancer to the ECS tasks. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.taskImageOptions">taskImageOptions</a></code> | <code>aws-cdk-lib.aws_ecs_patterns.ApplicationLoadBalancedTaskImageOptions</code> | The properties required to create a new task definition. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | The VPC where the container instances will be launched or the elastic network interfaces (ENIs) will be deployed. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.cpu">cpu</a></code> | <code>number</code> | The number of cpu units used by the task. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.memoryLimitMiB">memoryLimitMiB</a></code> | <code>number</code> | The amount (in MiB) of memory used by the task. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.platformVersion">platformVersion</a></code> | <code>aws-cdk-lib.aws_ecs.FargatePlatformVersion</code> | The platform version on which to run your service. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.runtimePlatform">runtimePlatform</a></code> | <code>aws-cdk-lib.aws_ecs.RuntimePlatform</code> | The runtime platform of the task definition. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.taskDefinition">taskDefinition</a></code> | <code>aws-cdk-lib.aws_ecs.FargateTaskDefinition</code> | The task definition to use for tasks in the service. TaskDefinition or TaskImageOptions must be specified, but not both. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.assignPublicIp">assignPublicIp</a></code> | <code>boolean</code> | Determines whether the service will be assigned a public IP address. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | The security groups to associate with the service. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.taskSubnets">taskSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | The subnets to associate with the service. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.accessLogBucket">accessLogBucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | The bucket to use for access logs from the Application Load Balancer. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.accessLogPrefix">accessLogPrefix</a></code> | <code>string</code> | The prefix to use for access logs from the Application Load Balancer. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.apiCanarySchedule">apiCanarySchedule</a></code> | <code>aws-cdk-lib.Duration</code> | The frequency for running the api canaries. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.apiCanaryThreadCount">apiCanaryThreadCount</a></code> | <code>number</code> | The number of threads to run concurrently for the synthetic test. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.apiCanaryTimeout">apiCanaryTimeout</a></code> | <code>aws-cdk-lib.Duration</code> | The threshold for how long a api canary can take to run. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.apiTestSteps">apiTestSteps</a></code> | <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApiTestStep">ApiTestStep</a>[]</code> | The steps to run in the canary. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.deploymentConfig">deploymentConfig</a></code> | <code>aws-cdk-lib.aws_codedeploy.IEcsDeploymentConfig</code> | The deployment configuration to use for the deployment group. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.deploymentTimeout">deploymentTimeout</a></code> | <code>aws-cdk-lib.Duration</code> | The timeout for a CodeDeploy deployment. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.deregistrationDelay">deregistrationDelay</a></code> | <code>aws-cdk-lib.Duration</code> | The amount of time for ELB to wait before changing the state of a deregistering target from 'draining' to 'unused'. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.healthCheck">healthCheck</a></code> | <code>aws-cdk-lib.aws_elasticloadbalancingv2.HealthCheck</code> | The healthcheck to configure on the Application Load Balancer target groups. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.responseTimeAlarmThreshold">responseTimeAlarmThreshold</a></code> | <code>aws-cdk-lib.Duration</code> | The threshold for response time alarm. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.terminationWaitTime">terminationWaitTime</a></code> | <code>aws-cdk-lib.Duration</code> | The time to wait before terminating the original (blue) task set. |

---

##### `capacityProviderStrategies`<sup>Optional</sup> <a name="capacityProviderStrategies" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.capacityProviderStrategies"></a>

```typescript
public readonly capacityProviderStrategies: CapacityProviderStrategy[];
```

- *Type:* aws-cdk-lib.aws_ecs.CapacityProviderStrategy[]
- *Default:* undefined

A list of Capacity Provider strategies used to place a service.

---

##### `certificate`<sup>Optional</sup> <a name="certificate" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.certificate"></a>

```typescript
public readonly certificate: ICertificate;
```

- *Type:* aws-cdk-lib.aws_certificatemanager.ICertificate
- *Default:* No certificate associated with the load balancer, if using the HTTP protocol. For HTTPS, a DNS-validated certificate will be created for the load balancer's specified domain name if a domain name and domain zone are specified.

Certificate Manager certificate to associate with the load balancer.

Setting this option will set the load balancer protocol to HTTPS.

---

##### `circuitBreaker`<sup>Optional</sup> <a name="circuitBreaker" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.circuitBreaker"></a>

```typescript
public readonly circuitBreaker: DeploymentCircuitBreaker;
```

- *Type:* aws-cdk-lib.aws_ecs.DeploymentCircuitBreaker
- *Default:* disabled

Whether to enable the deployment circuit breaker.

If this property is defined, circuit breaker will be implicitly
enabled.

---

##### `cloudMapOptions`<sup>Optional</sup> <a name="cloudMapOptions" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.cloudMapOptions"></a>

```typescript
public readonly cloudMapOptions: CloudMapOptions;
```

- *Type:* aws-cdk-lib.aws_ecs.CloudMapOptions
- *Default:* AWS Cloud Map service discovery is not enabled.

The options for configuring an Amazon ECS service to use service discovery.

---

##### `cluster`<sup>Optional</sup> <a name="cluster" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.cluster"></a>

```typescript
public readonly cluster: ICluster;
```

- *Type:* aws-cdk-lib.aws_ecs.ICluster
- *Default:* create a new cluster; if both cluster and vpc are omitted, a new VPC will be created for you.

The name of the cluster that hosts the service.

If a cluster is specified, the vpc construct should be omitted. Alternatively, you can omit both cluster and vpc.

---

##### `deploymentController`<sup>Optional</sup> <a name="deploymentController" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.deploymentController"></a>

```typescript
public readonly deploymentController: DeploymentController;
```

- *Type:* aws-cdk-lib.aws_ecs.DeploymentController
- *Default:* Rolling update (ECS)

Specifies which deployment controller to use for the service.

For more information, see
[Amazon ECS Deployment Types](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-types.html)

---

##### `desiredCount`<sup>Optional</sup> <a name="desiredCount" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.desiredCount"></a>

```typescript
public readonly desiredCount: number;
```

- *Type:* number
- *Default:* If the feature flag, ECS_REMOVE_DEFAULT_DESIRED_COUNT is false, the default is 1; if true, the default is 1 for all new services and uses the existing services desired count when updating an existing service.

The desired number of instantiations of the task definition to keep running on the service.

The minimum value is 1

---

##### `domainName`<sup>Optional</sup> <a name="domainName" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string
- *Default:* No domain name.

The domain name for the service, e.g. "api.example.com.".

---

##### `domainZone`<sup>Optional</sup> <a name="domainZone" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.domainZone"></a>

```typescript
public readonly domainZone: IHostedZone;
```

- *Type:* aws-cdk-lib.aws_route53.IHostedZone
- *Default:* No Route53 hosted domain zone.

The Route53 hosted zone for the domain, e.g. "example.com.".

---

##### `enableECSManagedTags`<sup>Optional</sup> <a name="enableECSManagedTags" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.enableECSManagedTags"></a>

```typescript
public readonly enableECSManagedTags: boolean;
```

- *Type:* boolean
- *Default:* false

Specifies whether to enable Amazon ECS managed tags for the tasks within the service.

For more information, see
[Tagging Your Amazon ECS Resources](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-using-tags.html)

---

##### `enableExecuteCommand`<sup>Optional</sup> <a name="enableExecuteCommand" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.enableExecuteCommand"></a>

```typescript
public readonly enableExecuteCommand: boolean;
```

- *Type:* boolean
- *Default:* false

Whether ECS Exec should be enabled.

---

##### `healthCheckGracePeriod`<sup>Optional</sup> <a name="healthCheckGracePeriod" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.healthCheckGracePeriod"></a>

```typescript
public readonly healthCheckGracePeriod: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* defaults to 60 seconds if at least one load balancer is in-use and it is not already set

The period of time, in seconds, that the Amazon ECS service scheduler ignores unhealthy Elastic Load Balancing target health checks after a task has first started.

---

##### `idleTimeout`<sup>Optional</sup> <a name="idleTimeout" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.idleTimeout"></a>

```typescript
public readonly idleTimeout: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* CloudFormation sets idle timeout to 60 seconds

The load balancer idle timeout, in seconds.

Can be between 1 and 4000 seconds

---

##### `listenerPort`<sup>Optional</sup> <a name="listenerPort" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.listenerPort"></a>

```typescript
public readonly listenerPort: number;
```

- *Type:* number
- *Default:* The default listener port is determined from the protocol (port 80 for HTTP, port 443 for HTTPS). A domain name and zone must be also be specified if using HTTPS.

Listener port of the application load balancer that will serve traffic to the service.

---

##### `loadBalancer`<sup>Optional</sup> <a name="loadBalancer" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.loadBalancer"></a>

```typescript
public readonly loadBalancer: IApplicationLoadBalancer;
```

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.IApplicationLoadBalancer
- *Default:* a new load balancer will be created.

The application load balancer that will serve traffic to the service.

The VPC attribute of a load balancer must be specified for it to be used
to create a new service with this pattern.

[disable-awslint:ref-via-interface]

---

##### `loadBalancerName`<sup>Optional</sup> <a name="loadBalancerName" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.loadBalancerName"></a>

```typescript
public readonly loadBalancerName: string;
```

- *Type:* string
- *Default:* Automatically generated name.

Name of the load balancer.

---

##### `maxHealthyPercent`<sup>Optional</sup> <a name="maxHealthyPercent" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.maxHealthyPercent"></a>

```typescript
public readonly maxHealthyPercent: number;
```

- *Type:* number
- *Default:* 100 if daemon, otherwise 200

The maximum number of tasks, specified as a percentage of the Amazon ECS service's DesiredCount value, that can run in a service during a deployment.

---

##### `minHealthyPercent`<sup>Optional</sup> <a name="minHealthyPercent" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.minHealthyPercent"></a>

```typescript
public readonly minHealthyPercent: number;
```

- *Type:* number
- *Default:* 0 if daemon, otherwise 50

The minimum number of tasks, specified as a percentage of the Amazon ECS service's DesiredCount value, that must continue to run and remain healthy during a deployment.

---

##### `openListener`<sup>Optional</sup> <a name="openListener" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.openListener"></a>

```typescript
public readonly openListener: boolean;
```

- *Type:* boolean
- *Default:* true -- The security group allows ingress from all IP addresses.

Determines whether or not the Security Group for the Load Balancer's Listener will be open to all traffic by default.

---

##### `propagateTags`<sup>Optional</sup> <a name="propagateTags" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.propagateTags"></a>

```typescript
public readonly propagateTags: PropagatedTagSource;
```

- *Type:* aws-cdk-lib.aws_ecs.PropagatedTagSource
- *Default:* none

Specifies whether to propagate the tags from the task definition or the service to the tasks in the service.

Tags can only be propagated to the tasks within the service during service creation.

---

##### `protocol`<sup>Optional</sup> <a name="protocol" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.protocol"></a>

```typescript
public readonly protocol: ApplicationProtocol;
```

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationProtocol
- *Default:* HTTP. If a certificate is specified, the protocol will be set by default to HTTPS.

The protocol for connections from clients to the load balancer.

The load balancer port is determined from the protocol (port 80 for
HTTP, port 443 for HTTPS).  If HTTPS, either a certificate or domain
name and domain zone must also be specified.

---

##### `protocolVersion`<sup>Optional</sup> <a name="protocolVersion" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.protocolVersion"></a>

```typescript
public readonly protocolVersion: ApplicationProtocolVersion;
```

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationProtocolVersion
- *Default:* ApplicationProtocolVersion.HTTP1

The protocol version to use.

---

##### `publicLoadBalancer`<sup>Optional</sup> <a name="publicLoadBalancer" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.publicLoadBalancer"></a>

```typescript
public readonly publicLoadBalancer: boolean;
```

- *Type:* boolean
- *Default:* true

Determines whether the Load Balancer will be internet-facing.

---

##### `recordType`<sup>Optional</sup> <a name="recordType" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.recordType"></a>

```typescript
public readonly recordType: ApplicationLoadBalancedServiceRecordType;
```

- *Type:* aws-cdk-lib.aws_ecs_patterns.ApplicationLoadBalancedServiceRecordType
- *Default:* ApplicationLoadBalancedServiceRecordType.ALIAS

Specifies whether the Route53 record should be a CNAME, an A record using the Alias feature or no record at all.

This is useful if you need to work with DNS systems that do not support alias records.

---

##### `redirectHTTP`<sup>Optional</sup> <a name="redirectHTTP" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.redirectHTTP"></a>

```typescript
public readonly redirectHTTP: boolean;
```

- *Type:* boolean
- *Default:* false

Specifies whether the load balancer should redirect traffic on port 80 to port 443 to support HTTP->HTTPS redirects This is only valid if the protocol of the ALB is HTTPS.

---

##### `serviceName`<sup>Optional</sup> <a name="serviceName" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.serviceName"></a>

```typescript
public readonly serviceName: string;
```

- *Type:* string
- *Default:* CloudFormation-generated name.

The name of the service.

---

##### `sslPolicy`<sup>Optional</sup> <a name="sslPolicy" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.sslPolicy"></a>

```typescript
public readonly sslPolicy: SslPolicy;
```

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.SslPolicy
- *Default:* The recommended elastic load balancing security policy

The security policy that defines which ciphers and protocols are supported by the ALB Listener.

---

##### `targetProtocol`<sup>Optional</sup> <a name="targetProtocol" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.targetProtocol"></a>

```typescript
public readonly targetProtocol: ApplicationProtocol;
```

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationProtocol
- *Default:* HTTP.

The protocol for connections from the load balancer to the ECS tasks.

The default target port is determined from the protocol (port 80 for
HTTP, port 443 for HTTPS).

---

##### `taskImageOptions`<sup>Optional</sup> <a name="taskImageOptions" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.taskImageOptions"></a>

```typescript
public readonly taskImageOptions: ApplicationLoadBalancedTaskImageOptions;
```

- *Type:* aws-cdk-lib.aws_ecs_patterns.ApplicationLoadBalancedTaskImageOptions
- *Default:* none

The properties required to create a new task definition.

TaskDefinition or TaskImageOptions must be specified, but not both.

---

##### `vpc`<sup>Optional</sup> <a name="vpc" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc
- *Default:* uses the VPC defined in the cluster or creates a new VPC.

The VPC where the container instances will be launched or the elastic network interfaces (ENIs) will be deployed.

If a vpc is specified, the cluster construct should be omitted. Alternatively, you can omit both vpc and cluster.

---

##### `cpu`<sup>Optional</sup> <a name="cpu" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.cpu"></a>

```typescript
public readonly cpu: number;
```

- *Type:* number
- *Default:* 256

The number of cpu units used by the task.

Valid values, which determines your range of valid values for the memory parameter:

256 (.25 vCPU) - Available memory values: 0.5GB, 1GB, 2GB

512 (.5 vCPU) - Available memory values: 1GB, 2GB, 3GB, 4GB

1024 (1 vCPU) - Available memory values: 2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB

2048 (2 vCPU) - Available memory values: Between 4GB and 16GB in 1GB increments

4096 (4 vCPU) - Available memory values: Between 8GB and 30GB in 1GB increments

8192 (8 vCPU) - Available memory values: Between 16GB and 60GB in 4GB increments

16384 (16 vCPU) - Available memory values: Between 32GB and 120GB in 8GB increments

This default is set in the underlying FargateTaskDefinition construct.

---

##### `memoryLimitMiB`<sup>Optional</sup> <a name="memoryLimitMiB" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.memoryLimitMiB"></a>

```typescript
public readonly memoryLimitMiB: number;
```

- *Type:* number
- *Default:* 512

The amount (in MiB) of memory used by the task.

This field is required and you must use one of the following values, which determines your range of valid values
for the cpu parameter:

512 (0.5 GB), 1024 (1 GB), 2048 (2 GB) - Available cpu values: 256 (.25 vCPU)

1024 (1 GB), 2048 (2 GB), 3072 (3 GB), 4096 (4 GB) - Available cpu values: 512 (.5 vCPU)

2048 (2 GB), 3072 (3 GB), 4096 (4 GB), 5120 (5 GB), 6144 (6 GB), 7168 (7 GB), 8192 (8 GB) - Available cpu values: 1024 (1 vCPU)

Between 4096 (4 GB) and 16384 (16 GB) in increments of 1024 (1 GB) - Available cpu values: 2048 (2 vCPU)

Between 8192 (8 GB) and 30720 (30 GB) in increments of 1024 (1 GB) - Available cpu values: 4096 (4 vCPU)

Between 16384 (16 GB) and 61440 (60 GB) in increments of 4096 (4 GB) - Available cpu values: 8192 (8 vCPU)

Between 32768 (32 GB) and 122880 (120 GB) in increments of 8192 (8 GB) - Available cpu values: 16384 (16 vCPU)

This default is set in the underlying FargateTaskDefinition construct.

---

##### `platformVersion`<sup>Optional</sup> <a name="platformVersion" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.platformVersion"></a>

```typescript
public readonly platformVersion: FargatePlatformVersion;
```

- *Type:* aws-cdk-lib.aws_ecs.FargatePlatformVersion
- *Default:* Latest

The platform version on which to run your service.

If one is not specified, the LATEST platform version is used by default. For more information, see
[AWS Fargate Platform Versions](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/platform_versions.html)
in the Amazon Elastic Container Service Developer Guide.

---

##### `runtimePlatform`<sup>Optional</sup> <a name="runtimePlatform" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.runtimePlatform"></a>

```typescript
public readonly runtimePlatform: RuntimePlatform;
```

- *Type:* aws-cdk-lib.aws_ecs.RuntimePlatform
- *Default:* If the property is undefined, `operatingSystemFamily` is LINUX and `cpuArchitecture` is X86_64

The runtime platform of the task definition.

---

##### `taskDefinition`<sup>Optional</sup> <a name="taskDefinition" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.taskDefinition"></a>

```typescript
public readonly taskDefinition: FargateTaskDefinition;
```

- *Type:* aws-cdk-lib.aws_ecs.FargateTaskDefinition
- *Default:* none

The task definition to use for tasks in the service. TaskDefinition or TaskImageOptions must be specified, but not both.

[disable-awslint:ref-via-interface]

---

##### `assignPublicIp`<sup>Optional</sup> <a name="assignPublicIp" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.assignPublicIp"></a>

```typescript
public readonly assignPublicIp: boolean;
```

- *Type:* boolean
- *Default:* false

Determines whether the service will be assigned a public IP address.

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]
- *Default:* A new security group is created.

The security groups to associate with the service.

If you do not specify a security group, a new security group is created.

---

##### `taskSubnets`<sup>Optional</sup> <a name="taskSubnets" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.taskSubnets"></a>

```typescript
public readonly taskSubnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection
- *Default:* Public subnets if `assignPublicIp` is set, otherwise the first available one of Private, Isolated, Public, in that order.

The subnets to associate with the service.

---

##### `accessLogBucket`<sup>Optional</sup> <a name="accessLogBucket" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.accessLogBucket"></a>

```typescript
public readonly accessLogBucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket
- *Default:* a new S3 bucket will be created

The bucket to use for access logs from the Application Load Balancer.

---

##### `accessLogPrefix`<sup>Optional</sup> <a name="accessLogPrefix" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.accessLogPrefix"></a>

```typescript
public readonly accessLogPrefix: string;
```

- *Type:* string
- *Default:* none

The prefix to use for access logs from the Application Load Balancer.

---

##### `apiCanarySchedule`<sup>Optional</sup> <a name="apiCanarySchedule" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.apiCanarySchedule"></a>

```typescript
public readonly apiCanarySchedule: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* 5 minutes

The frequency for running the api canaries.

---

##### `apiCanaryThreadCount`<sup>Optional</sup> <a name="apiCanaryThreadCount" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.apiCanaryThreadCount"></a>

```typescript
public readonly apiCanaryThreadCount: number;
```

- *Type:* number
- *Default:* 20

The number of threads to run concurrently for the synthetic test.

---

##### `apiCanaryTimeout`<sup>Optional</sup> <a name="apiCanaryTimeout" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.apiCanaryTimeout"></a>

```typescript
public readonly apiCanaryTimeout: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* no alarm is created for test duration

The threshold for how long a api canary can take to run.

---

##### `apiTestSteps`<sup>Optional</sup> <a name="apiTestSteps" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.apiTestSteps"></a>

```typescript
public readonly apiTestSteps: ApiTestStep[];
```

- *Type:* <a href="#@cdklabs/cdk-ecs-codedeploy.ApiTestStep">ApiTestStep</a>[]
- *Default:* no synthetic test will be created

The steps to run in the canary.

---

##### `deploymentConfig`<sup>Optional</sup> <a name="deploymentConfig" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.deploymentConfig"></a>

```typescript
public readonly deploymentConfig: IEcsDeploymentConfig;
```

- *Type:* aws-cdk-lib.aws_codedeploy.IEcsDeploymentConfig
- *Default:* EcsDeploymentConfig.ALL_AT_ONCE

The deployment configuration to use for the deployment group.

---

##### `deploymentTimeout`<sup>Optional</sup> <a name="deploymentTimeout" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.deploymentTimeout"></a>

```typescript
public readonly deploymentTimeout: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* 60 minutes

The timeout for a CodeDeploy deployment.

---

##### `deregistrationDelay`<sup>Optional</sup> <a name="deregistrationDelay" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.deregistrationDelay"></a>

```typescript
public readonly deregistrationDelay: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* 300 seconds

The amount of time for ELB to wait before changing the state of a deregistering target from 'draining' to 'unused'.

---

##### `healthCheck`<sup>Optional</sup> <a name="healthCheck" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.healthCheck"></a>

```typescript
public readonly healthCheck: HealthCheck;
```

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.HealthCheck
- *Default:* no health check is configured

The healthcheck to configure on the Application Load Balancer target groups.

---

##### `responseTimeAlarmThreshold`<sup>Optional</sup> <a name="responseTimeAlarmThreshold" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.responseTimeAlarmThreshold"></a>

```typescript
public readonly responseTimeAlarmThreshold: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* no alarm will be created

The threshold for response time alarm.

---

##### `terminationWaitTime`<sup>Optional</sup> <a name="terminationWaitTime" id="@cdklabs/cdk-ecs-codedeploy.ApplicationLoadBalancedCodeDeployedFargateServiceProps.property.terminationWaitTime"></a>

```typescript
public readonly terminationWaitTime: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* 10 minutes

The time to wait before terminating the original (blue) task set.

---

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

Construction properties of EcsDeployment.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps.Initializer"></a>

```typescript
import { EcsDeploymentProps } from '@cdklabs/cdk-ecs-codedeploy'

const ecsDeploymentProps: EcsDeploymentProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps.property.deploymentGroup">deploymentGroup</a></code> | <code>aws-cdk-lib.aws_codedeploy.IEcsDeploymentGroup</code> | The deployment group to target for this deployment. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps.property.targetService">targetService</a></code> | <code><a href="#@cdklabs/cdk-ecs-codedeploy.TargetService">TargetService</a></code> | The ECS service to target for the deployment. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps.property.autoRollback">autoRollback</a></code> | <code>aws-cdk-lib.aws_codedeploy.AutoRollbackConfig</code> | The configuration for rollback in the event that a deployment fails. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps.property.description">description</a></code> | <code>string</code> | The description for the deployment. |
| <code><a href="#@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps.property.timeout">timeout</a></code> | <code>aws-cdk-lib.Duration</code> | The timeout for the deployment. |

---

##### `deploymentGroup`<sup>Required</sup> <a name="deploymentGroup" id="@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps.property.deploymentGroup"></a>

```typescript
public readonly deploymentGroup: IEcsDeploymentGroup;
```

- *Type:* aws-cdk-lib.aws_codedeploy.IEcsDeploymentGroup

The deployment group to target for this deployment.

---

##### `targetService`<sup>Required</sup> <a name="targetService" id="@cdklabs/cdk-ecs-codedeploy.EcsDeploymentProps.property.targetService"></a>

```typescript
public readonly targetService: TargetService;
```

- *Type:* <a href="#@cdklabs/cdk-ecs-codedeploy.TargetService">TargetService</a>

The ECS service to target for the deployment.

see: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-resources.html#reference-appspec-file-structure-resources-ecs

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

Describe the target for CodeDeploy to use when creating a deployment for an ecs.EcsDeploymentGroup.

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

see: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/platform_versions.html

---

## Classes <a name="Classes" id="Classes"></a>

### EcsAppSpec <a name="EcsAppSpec" id="@cdklabs/cdk-ecs-codedeploy.EcsAppSpec"></a>

Represents an AppSpec to be used for ECS services.

see: https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-resources.html#reference-appspec-file-structure-resources-ecs

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





