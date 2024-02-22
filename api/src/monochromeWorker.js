const gm = require('gm');
require('workerData');
require('parentPort');

gm(workerData.source).monochrome().write(workerData.destination, (error) => {
  if error {
    throw error;
  }
  parentPort.postMessage(monochrome:true);
});
