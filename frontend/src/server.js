const express = require('express');
const path = require('path');

const app = express();

const staticFolder = path.join(__dirname, '..', 'dist', 'babymonitor');
console.debug(`Static folder [${staticFolder}]`);
app.use(express.static(staticFolder));

app.get('/*', function(req, res) {
  const indexFile = path.join(__dirname, '..', 'dist', 'babymonitor', 'index.html');
  console.debug(`Index file [${indexFile}]`);
  res.sendFile(indexFile);
});

const port = process.env.PORT || 4200;

app.listen(port);

console.info(`Listening on port [${port}]`);
