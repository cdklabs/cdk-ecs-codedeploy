// @ts-ignore
import * as httpStep from '../canary-src/http-step';

describe('http-step createRequestOptions', () => {
  test('GET request', async () => {
    const baseUrl = 'http://localhost';
    const requestOptions = httpStep.createRequestOptions({
      name: 'testStep',
      path: '/api/fruits',
    }, baseUrl);

    expect(requestOptions).toEqual({
      protocol: 'http:',
      hostname: 'localhost',
      path: '/api/fruits',
      port: 80,
      method: 'GET',
      headers: undefined,
      body: undefined,
    });
  });

  test('Query string request', async () => {
    const baseUrl = 'https://localhost';
    const requestOptions = httpStep.createRequestOptions({
      name: 'testStep',
      path: '/api/fruits?name=apple',
    }, baseUrl);

    expect(requestOptions).toEqual({
      protocol: 'https:',
      hostname: 'localhost',
      path: '/api/fruits?name=apple',
      port: 443,
      method: 'GET',
      headers: undefined,
      body: undefined,
    });
  });

  test('POST request', async () => {
    const baseUrl = 'https://localhost:8443/api/';
    const requestOptions = httpStep.createRequestOptions({
      name: 'testStep',
      path: 'fruits',
      method: 'POST',
      body: JSON.stringify({ name: 'pear' }),
      headers: { 'Content-Type': 'application/json' },
    }, baseUrl);

    expect(requestOptions).toEqual({
      protocol: 'https:',
      hostname: 'localhost',
      port: 8443,
      path: '/api/fruits',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{"name":"pear"}',
    });
  });
});

describe('http-step assertStep', () => {
  test('step without jmespath', async () => {
    httpStep.assertStep({
      name: 'testStep',
      path: '/api/fruits',
    }, '');
  });

  test('step with valid jmespath', async () => {
    httpStep.assertStep({
      name: 'testStep',
      path: '/api/fruits',
      jmesPath: 'length(@)',
      expectedValue: 3,
    }, JSON.stringify([
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]));
  });

  test('step with invalid jmespath', async () => {
    expect(() => {
      httpStep.assertStep({
        name: 'testStep',
        path: '/api/fruits',
        jmesPath: 'length(@)',
        expectedValue: 3,
      }, JSON.stringify([]));
    }).toThrow('JMESPath doesn\'t match. path=length(@) expected=3 actual=0');
  });
});