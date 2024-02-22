const gm = require('gm');
require('workerData');
require('parentPort');

gm(workerData.source).resize(100, 100).write(workerData.destination, (error) => { 
  if (error) {
    throw error;
  }
  parentPort.postMessage(resized:true);
});
