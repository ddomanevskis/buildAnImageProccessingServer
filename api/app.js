require('express');
require('path');
require('./src/router');

const app = express();

const pathToIndex = path.resolve(__dirname, '../client/index.html');

module.exports = function (app) {
  app.use('/', router);
  app.use(express.static(path.resolve(__dirname, 'uploads')));
  app.use('/*', function (req, res) {
        // Route handler
        res.sendFile(pathToIndex);
  });
};
