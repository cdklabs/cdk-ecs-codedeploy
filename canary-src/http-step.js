const jmespath = require('jmespath');

function createRequestOptions(step, baseUrl) {
  const url = new URL(step.path, baseUrl);
  const defaultPort = (url.protocol === 'http:') ? 80 : ((url.protocol === 'https:') ? 443 : undefined);
  let path = url.pathname;
  if (url.search) {
    path += url.search;
  }
  return {
    protocol: url.protocol,
    hostname: url.hostname,
    port: parseInt(url.port) || defaultPort,
    path,
    method: step.method ?? 'GET',
    headers: step.headers,
    body: step.body,
  };
}

function assertStep(step, responseBody) {
  if (step.jmesPath) {
    const bodyJson = JSON.parse(responseBody);
    const actualValue = jmespath.search(bodyJson, step.jmesPath);
    if (actualValue != step.expectedValue) {
      throw new Error(`JMESPath doesn't match. path=${step.jmesPath} expected=${step.expectedValue} actual=${actualValue}`);
    }
  }
}

function executeHttpStepHandler(step) {
  return async (res) => {
    return new Promise((resolve, reject) => {
        if (res.statusCode < 200 || res.statusCode > 299) {
            throw res.statusCode + ' ' + res.statusMessage;
        }

        let responseBody = '';
        res.on('data', (d) => {
            responseBody += d;
        });

        // validate the response body
        res.on('end', () => {
          try {
            resolve(assertStep(step, responseBody));
          } catch (e) {
            reject(e);
          }
        });
    });
  };
};

exports.createRequestOptions = createRequestOptions;
exports.assertStep = assertStep;
exports.executeHttpStepHandler = executeHttpStepHandler;