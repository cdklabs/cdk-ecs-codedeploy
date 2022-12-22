const synthetics = require('Synthetics');
const httpStep = require('./http-step.js');

async function handler() {
  const baseUrl = process.env.baseUrl;
  const threadCount = parseInt(process.env.threadCount);
  const steps = JSON.parse(process.env.testSteps);
  const threads = [...Array(threadCount).keys()].map(async id => {
    for (let step of steps) {
      await synthetics.executeHttpStep(
        step.name, 
        httpStep.createRequestOptions(step, baseUrl), 
        httpStep.executeHttpStepHandler(step),
      );
    }
  });
  await Promise.all(threads);
};

exports.handler = handler;