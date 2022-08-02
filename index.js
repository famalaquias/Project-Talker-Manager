const express = require('express');
const bodyParser = require('body-parser');

// const { } = require('./middlewares/validationTalker');
const { getTalker } = require('./fsTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  try {
    const talker = await getTalker();

    if (talker.length === 0) return res.status(200).json([]); 
    if (talker.length > 0) return res.status(200).json(talker); 
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log('Online');
  console.log('http://localhost:3000');
});