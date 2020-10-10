const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const { parseBufferToJson } = require('./functions/buffer-to-json');
const { saveEveryNews } = require('./functions/fetch-fs');
require('./functions/save-data-interval');

const app = express();
app.use(cors());

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/sources', async (req, res) => {
  const bufferData = await fs.readFile('./json-data/sources.json');
  const jsonData = parseBufferToJson(bufferData);
  res.json(jsonData);
});

app.get('/top-headlines', async (req, res) => {
  const bufferData = await fs.readFile('./json-data/top-headlines.json');
  const jsonData = parseBufferToJson(bufferData);
  res.json(jsonData);
});

app.get('/every-news', async (req, res) => {
  const validQueryObject = {
    q: null,
    qInTitle: null,
    sources: null,
    domains: null,
    excludeDomains: null,
    from: null,
    to: null
  };
  
  for (let [key, value] of Object.entries(req.query)) {
    if (Object.keys(validQueryObject).includes(key)) {
      validQueryObject[key] = value;
    }
  }
  
  await saveEveryNews(...Object.values(validQueryObject));
  const bufferData = await fs.readFile('./json-data/everything.json');
  const jsonData = parseBufferToJson(bufferData);
  res.json(jsonData);
})

app.listen(port, () => {
  console.log(`listening at port: ${port}`);
});