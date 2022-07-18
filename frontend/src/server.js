const express = require('express');
const path = require('path');

const app = express();

const staticFolder = path.join(__dirname, 'dist', 'babymonitor');
logger.debug(`Static folder [${staticFolder}]`);
app.use(express.static(staticFolder));

app.get('/*', function(req, res) {
  const indexFile = path.join(__dirname, 'dist', 'babymonitor', 'index.html');
  logger.debug(`Index file [${indexFile}]`);
  res.sendFile(indexFile);
});

const port = process.env.PORT || 4200;

app.listen(port);

logger.info(`Listening on port [${port}]`);
