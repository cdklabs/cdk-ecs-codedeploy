import { CodeDeployClient, GetDeploymentCommand } from '@aws-sdk/client-codedeploy';
import { mockClient } from 'aws-sdk-client-mock';
import lambdaTester from 'lambda-tester';
import { handler, IsCompleteRequest, IsCompleteResponse, DeploymentStatus } from '../src/ecs-deployment-provider/is-complete.lambda';
import 'aws-sdk-client-mock-jest';

const codeDeployMock = mockClient(CodeDeployClient);

describe('isComplete', () => {
  afterEach(() => {
    codeDeployMock.reset();
  });
  test('Empty event payload fails', () => {
    codeDeployMock.on(GetDeploymentCommand).rejects(new Error());
    return lambdaTester(handler)
      .event({} as IsCompleteRequest)
      .expectError((err: Error) => {
        expect(err.message).toBeDefined();
      });
  });
  test('Unknown event type fails', () => {
    codeDeployMock.on(GetDeploymentCommand).resolves({
      deploymentInfo: {
        status: DeploymentStatus.SUCCEEDED,
      },
    });
    return lambdaTester(handler)
      .event({
        RequestType: 'FOO',
        PhysicalResourceId: '11111111',
      } as IsCompleteRequest)
      .expectError((err: Error) => {
        expect(err.message).toBe('Unknown request type: FOO');
      });
  });

  test('Throws error finding deploymentId for Create', () => {
    const getDeploymentMock = codeDeployMock
      .on(GetDeploymentCommand)
      .rejects(new Error('Unable to find deployment'));

    return lambdaTester(handler)
      .event({
        RequestType: 'Create',
        PhysicalResourceId: '11111111',
      } as IsCompleteRequest)
      .expectReject((error: Error) => {
        expect(getDeploymentMock).toHaveReceivedCommandTimes(GetDeploymentCommand, 1);
        expect(getDeploymentMock).toHaveReceivedCommandWith(GetDeploymentCommand, {
          deploymentId: '11111111',
        });
        expect(error.message).toEqual('Unable to find deployment');
      });
  });

  test('Ignores error finding deploymentId for Delete', () => {
    const getDeploymentMock = codeDeployMock
      .on(GetDeploymentCommand)
      .rejects(new Error('Unable to find deployment'));

    return lambdaTester(handler)
      .event({
        RequestType: 'Delete',
        PhysicalResourceId: '11111111',
      } as IsCompleteRequest)
      .expectResolve((resp: IsCompleteResponse) => {
        expect(getDeploymentMock).toHaveReceivedCommandTimes(GetDeploymentCommand, 1);
        expect(getDeploymentMock).toHaveReceivedCommandWith(GetDeploymentCommand, {
          deploymentId: '11111111',
        });
        expect(resp).toEqual({ IsComplete: true });
      });
  });
  test('Is complete when create deployment succeeds', () => {
    const getDeploymentMock = codeDeployMock.on(GetDeploymentCommand).resolves({
      deploymentInfo: {
        status: DeploymentStatus.SUCCEEDED,
      },
    });

    return lambdaTester(handler)
      .event({
        RequestType: 'Create',
        PhysicalResourceId: '11111111',
      } as IsCompleteRequest)
      .expectResolve((resp: IsCompleteResponse) => {
        expect(getDeploymentMock).toHaveReceivedCommandTimes(GetDeploymentCommand, 1);
        expect(getDeploymentMock).toHaveReceivedCommandWith(GetDeploymentCommand, {
          deploymentId: '11111111',
        });
        expect(resp).toEqual({ IsComplete: true });
      });
  });
  test('Is not complete when create deployment in progress', () => {
    const getDeploymentMock = codeDeployMock.on(GetDeploymentCommand).resolves({
      deploymentInfo: {
        status: DeploymentStatus.IN_PROGRESS,
      },
    });

    return lambdaTester(handler)
      .event({
        RequestType: 'Create',
        PhysicalResourceId: '11111111',
      } as IsCompleteRequest)
      .expectResolve((resp: IsCompleteResponse) => {
        expect(getDeploymentMock).toHaveReceivedCommandTimes(GetDeploymentCommand, 1);
        expect(getDeploymentMock).toHaveReceivedCommandWith(GetDeploymentCommand, {
          deploymentId: '11111111',
        });
        expect(resp).toEqual({ IsComplete: false });
      });
  });
  test('Is not complete when create deployment failed and rollback in progress', () => {

    const getDeploymentMock = codeDeployMock
      .on(GetDeploymentCommand, {
        deploymentId: '11111111',
      }).resolves({
        deploymentInfo: {
          status: DeploymentStatus.FAILED,
          rollbackInfo: {
            rollbackDeploymentId: '22222222',
          },
          errorInformation: {
            code: 'xxx',
            message: 'failure occurred',
          },
        },
      })
      .on(GetDeploymentCommand, {
        deploymentId: '22222222',
      }).resolves({
        deploymentInfo: {
          status: DeploymentStatus.IN_PROGRESS,
        },
      });

    return lambdaTester(handler)
      .event({
        RequestType: 'Create',
        PhysicalResourceId: '11111111',
      } as IsCompleteRequest)
      .expectResolve((resp: IsCompleteResponse) => {
        expect(getDeploymentMock).toHaveReceivedCommandTimes(GetDeploymentCommand, 2);
        expect(resp.IsComplete).toBe(false);
      });
  });
  test('Throws error when create deployment failed and rollback failed', () => {
    const getDeploymentMock = codeDeployMock
      .on(GetDeploymentCommand, {
        deploymentId: '11111111',
      }).resolves({
        deploymentInfo: {
          status: DeploymentStatus.FAILED,
          rollbackInfo: {
            rollbackDeploymentId: '22222222',
          },
          errorInformation: {
            code: 'xxx',
            message: 'failure occurred',
          },
        },
      })
      .on(GetDeploymentCommand, {
        deploymentId: '22222222',
      }).resolves({
        deploymentInfo: {
          status: DeploymentStatus.FAILED,
        },
      });

    return lambdaTester(handler)
      .event({
        RequestType: 'Create',
        PhysicalResourceId: '11111111',
      } as IsCompleteRequest)
      .expectReject((error: Error) => {
        expect(getDeploymentMock).toHaveReceivedCommandTimes(GetDeploymentCommand, 2);
        expect(error.message).toEqual('Deployment Failed: [xxx] failure occurred');
      });
  });
  test('Throws error when create deployment failed and no rollback found', () => {
    const getDeploymentMock = codeDeployMock
      .on(GetDeploymentCommand, {
        deploymentId: '11111111',
      }).resolves({
        deploymentInfo: {
          status: DeploymentStatus.FAILED,
          errorInformation: {
            code: 'xxx',
            message: 'failure occurred',
          },
        },
      });

    return lambdaTester(handler)
      .event({
        RequestType: 'Create',
        PhysicalResourceId: '11111111',
      } as IsCompleteRequest)
      .expectReject((error: Error) => {
        expect(getDeploymentMock).toHaveReceivedCommandTimes(GetDeploymentCommand, 1);
        expect(error.message).toEqual('Deployment Failed: [xxx] failure occurred');
      });
  });
  test('Is complete when delete deployment succeeds', () => {
    const getDeploymentMock = codeDeployMock
      .on(GetDeploymentCommand, {
        deploymentId: '11111111',
      }).resolves({
        deploymentInfo: {
          status: DeploymentStatus.SUCCEEDED,
        },
      });

    return lambdaTester(handler)
      .event({
        RequestType: 'Delete',
        PhysicalResourceId: '11111111',
      } as IsCompleteRequest)
      .expectResolve((resp: IsCompleteResponse) => {
        expect(getDeploymentMock).toHaveReceivedCommandTimes(GetDeploymentCommand, 1);
        expect(resp).toEqual({ IsComplete: true });
      });
  });
  test('Is not complete when delete deployment in progress', () => {
    const getDeploymentMock = codeDeployMock
      .on(GetDeploymentCommand, {
        deploymentId: '11111111',
      }).resolves({
        deploymentInfo: {
          status: DeploymentStatus.IN_PROGRESS,
        },
      });

    return lambdaTester(handler)
      .event({
        RequestType: 'Delete',
        PhysicalResourceId: '11111111',
      } as IsCompleteRequest)
      .expectResolve((resp: IsCompleteResponse) => {
        expect(getDeploymentMock).toHaveReceivedCommandTimes(GetDeploymentCommand, 1);
        expect(resp).toEqual({ IsComplete: false });
      });
  });
  test('Is complete when delete deployment failed with final rollback status', () => {
    const getDeploymentMock = codeDeployMock
      .on(GetDeploymentCommand, {
        deploymentId: '11111111',
      }).resolves({
        deploymentInfo: {
          status: DeploymentStatus.FAILED,
          rollbackInfo: {
            rollbackDeploymentId: '22222222',
          },
          errorInformation: {
            code: 'xxx',
            message: 'failure occurred',
          },
        },
      })
      .on(GetDeploymentCommand, {
        deploymentId: '22222222',
      }).resolves({
        deploymentInfo: {
          status: DeploymentStatus.FAILED,
        },
      });

    return lambdaTester(handler)
      .event({
        RequestType: 'Delete',
        PhysicalResourceId: '11111111',
      } as IsCompleteRequest)
      .expectResolve((resp: IsCompleteResponse) => {
        expect(getDeploymentMock).toHaveReceivedCommandTimes(GetDeploymentCommand, 2);
        expect(resp).toEqual({ IsComplete: true });
      });
  });
  test('Is complete when delete deployment failed with no rollback', () => {
    const getDeploymentMock = codeDeployMock
      .on(GetDeploymentCommand, {
        deploymentId: '11111111',
      }).resolves({
        deploymentInfo: {
          status: DeploymentStatus.FAILED,
          errorInformation: {
            code: 'xxx',
            message: 'failure occurred',
          },
        },
      });

    return lambdaTester(handler)
      .event({
        RequestType: 'Delete',
        PhysicalResourceId: '11111111',
      } as IsCompleteRequest)
      .expectResolve((resp: IsCompleteResponse) => {
        expect(getDeploymentMock).toHaveReceivedCommandTimes(GetDeploymentCommand, 1);
        expect(resp).toEqual({ IsComplete: true });
      });
  });
  test('Is not complete when delete deployment failed with rollback in progress', () => {
    const getDeploymentMock = codeDeployMock
      .on(GetDeploymentCommand, {
        deploymentId: '11111111',
      }).resolves({
        deploymentInfo: {
          status: DeploymentStatus.FAILED,
          rollbackInfo: {
            rollbackDeploymentId: '22222222',
          },
          errorInformation: {
            code: 'xxx',
            message: 'failure occurred',
          },
        },
      })
      .on(GetDeploymentCommand, {
        deploymentId: '22222222',
      }).resolves({
        deploymentInfo: {
          status: DeploymentStatus.IN_PROGRESS,
        },
      });

    return lambdaTester(handler)
      .event({
        RequestType: 'Delete',
        PhysicalResourceId: '11111111',
      } as IsCompleteRequest)
      .expectResolve((resp: IsCompleteResponse) => {
        expect(getDeploymentMock).toHaveReceivedCommandTimes(GetDeploymentCommand, 2);
        expect(resp).toEqual({ IsComplete: false });
      });
  });

});
