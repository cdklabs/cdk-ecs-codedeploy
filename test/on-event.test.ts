import { AutoRollbackEvent, CodeDeployClient, CreateDeploymentCommand, StopDeploymentCommand, StopStatus } from '@aws-sdk/client-codedeploy';
import { mockClient } from 'aws-sdk-client-mock';
import lambdaTester from 'lambda-tester';
import { handler, OnEventRequest, OnEventResponse } from '../src/ecs-deployment-provider/on-event.lambda';
import 'aws-sdk-client-mock-jest';

const codeDeployMock = mockClient(CodeDeployClient);

describe('onEvent', () => {
  afterEach(() => {
    codeDeployMock.reset();
  });

  test('Empty event payload fails', () => {
    return lambdaTester(handler)
      .event({} as OnEventRequest)
      .expectError((err: Error) => {
        expect(err.message).toBe('Unknown request type: undefined');
      });
  });

  test('Create deployment succeeds', () => {
    codeDeployMock.on(CreateDeploymentCommand).resolves({
      deploymentId: '1111111',
    });

    return lambdaTester(handler)
      .event({
        RequestType: 'Create',
        ResourceProperties: {
          applicationName: 'testapp',
          deploymentConfigName: 'testdeployconfig',
          deploymentGroupName: 'testdeploygroup',
          autoRollbackConfigurationEnabled: 'true',
          autoRollbackConfigurationEvents: 'DEPLOYMENT_STOP_ON_ALARM,DEPLOYMENT_FAILURE',
          description: 'testing',
          revisionAppSpecContent: 'appspec-goes-here',
        },
      } as OnEventRequest)
      .expectResolve((resp: OnEventResponse) => {
        expect(codeDeployMock).toHaveReceivedCommandTimes(CreateDeploymentCommand, 1);
        expect(codeDeployMock).toHaveReceivedCommandWith(CreateDeploymentCommand, {
          applicationName: 'testapp',
          deploymentConfigName: 'testdeployconfig',
          deploymentGroupName: 'testdeploygroup',
          autoRollbackConfiguration: {
            enabled: true,
            events: [AutoRollbackEvent.DEPLOYMENT_STOP_ON_ALARM, AutoRollbackEvent.DEPLOYMENT_FAILURE],
          },
          description: 'testing',
          revision: {
            revisionType: 'AppSpecContent',
            appSpecContent: {
              content: 'appspec-goes-here',
            },
          },
        });
        expect(resp.PhysicalResourceId).toBe('1111111');
        expect(resp.Data?.deploymentId).toBe('1111111');
      });
  });

  test('Create deployment succeeds with autorolllback disabled', () => {
    codeDeployMock.on(CreateDeploymentCommand).resolves({
      deploymentId: '1111111',
    });

    return lambdaTester(handler)
      .event({
        RequestType: 'Create',
        ResourceProperties: {
          applicationName: 'testapp',
          autoRollbackConfigurationEnabled: 'false',
          deploymentConfigName: 'testdeployconfig',
          deploymentGroupName: 'testdeploygroup',
          description: 'testing',
          revisionAppSpecContent: 'appspec-goes-here',
        },
      } as OnEventRequest)
      .expectResolve((resp: OnEventResponse) => {
        expect(codeDeployMock).toHaveReceivedCommandTimes(CreateDeploymentCommand, 1);
        expect(codeDeployMock).toHaveReceivedCommandWith(CreateDeploymentCommand, {
          applicationName: 'testapp',
          deploymentConfigName: 'testdeployconfig',
          deploymentGroupName: 'testdeploygroup',
          autoRollbackConfiguration: {
            enabled: false,
            events: undefined,
          },
          description: 'testing',
          revision: {
            revisionType: 'AppSpecContent',
            appSpecContent: {
              content: 'appspec-goes-here',
            },
          },
        });
        expect(resp.PhysicalResourceId).toBe('1111111');
        expect(resp.Data?.deploymentId).toBe('1111111');
      });
  });

  test('Create deployment fails', () => {
    codeDeployMock.on(CreateDeploymentCommand).resolves({});

    return lambdaTester(handler)
      .event({
        RequestType: 'Create',
        ResourceProperties: {
          applicationName: 'testapp',
          deploymentConfigName: 'testdeployconfig',
          deploymentGroupName: 'testdeploygroup',
          autoRollbackConfigurationEnabled: 'true',
          autoRollbackConfigurationEvents: 'event1,event2',
          description: 'testing',
          revisionAppSpecContent: 'appspec-goes-here',
        },
      } as OnEventRequest)
      .expectReject((error: Error) => {
        expect(codeDeployMock).toHaveReceivedCommandTimes(CreateDeploymentCommand, 1);
        expect(error.message).toBe('No deploymentId received from call to CreateDeployment');
      });
  });

  test('Update deployment succeeds', () => {
    codeDeployMock.on(CreateDeploymentCommand).resolves({
      deploymentId: '1111111',
    });

    return lambdaTester(handler)
      .event({
        RequestType: 'Update',
        ResourceProperties: {
          applicationName: 'testapp',
          deploymentConfigName: 'testdeployconfig',
          deploymentGroupName: 'testdeploygroup',
          description: 'testing',
          revisionAppSpecContent: 'appspec-goes-here',
        },
      } as OnEventRequest)
      .expectResolve((resp: OnEventResponse) => {
        expect(codeDeployMock).toHaveReceivedCommandTimes(CreateDeploymentCommand, 1);
        expect(codeDeployMock).toHaveReceivedCommandWith(CreateDeploymentCommand, {
          applicationName: 'testapp',
          deploymentConfigName: 'testdeployconfig',
          deploymentGroupName: 'testdeploygroup',
          autoRollbackConfiguration: undefined,
          description: 'testing',
          revision: {
            revisionType: 'AppSpecContent',
            appSpecContent: {
              content: 'appspec-goes-here',
            },
          },
        });
        expect(resp.PhysicalResourceId).toBe('1111111');
        expect(resp.Data?.deploymentId).toBe('1111111');
      });
  });

  test('Delete deployment successfully stops', () => {
    codeDeployMock.on(StopDeploymentCommand).resolves({
      status: StopStatus.SUCCEEDED,
      statusMessage: 'successfully stopped',
    });

    return lambdaTester(handler)
      .event({
        RequestType: 'Delete',
        PhysicalResourceId: '22222222',
      } as OnEventRequest)
      .expectResolve((resp: OnEventResponse) => {
        expect(codeDeployMock).toHaveReceivedCommandTimes(StopDeploymentCommand, 1);
        expect(codeDeployMock).toHaveReceivedCommandWith(StopDeploymentCommand, {
          deploymentId: '22222222',
          autoRollbackEnabled: true,
        });
        expect(resp.PhysicalResourceId).toBe('22222222');
        expect(resp.Data?.deploymentId).toBe('22222222');
      });
  });

  test('Delete deployment fails to stop', () => {
    codeDeployMock.on(StopDeploymentCommand).rejects(new Error('Unable to stop'));

    return lambdaTester(handler)
      .event({
        RequestType: 'Delete',
        PhysicalResourceId: '22222222',
      } as OnEventRequest)
      .expectResolve((resp: OnEventResponse) => {
        expect(codeDeployMock).toHaveReceivedCommandTimes(StopDeploymentCommand, 1);
        expect(codeDeployMock).toHaveReceivedCommandWith(StopDeploymentCommand, {
          deploymentId: '22222222',
          autoRollbackEnabled: true,
        });
        expect(resp.PhysicalResourceId).toBe('22222222');
        expect(resp.Data?.deploymentId).toBe('22222222');
      });
  });
});
