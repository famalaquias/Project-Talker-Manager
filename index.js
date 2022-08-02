const express = require('express');
const bodyParser = require('body-parser');

const { 
  validationEmail, 
  validationPassword,
} = require('./middlewares/validationTalker');

const { getTalker } = require('./fsTalker');
const generateToken = require('./generateToken');

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

app.get('/talker/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talker = await getTalker();
    const talkerId = talker.find((index) => Number(index.id) === Number(id));
    if (!talkerId) throw new Error('Pessoa palestrante não encontrada');
      res.status(200).json(talkerId);    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.post('/login', validationEmail, validationPassword, (_req, res) => {
  res.status(200).json({ token: generateToken() }); 
});

app.listen(PORT, () => {
  console.log('Online');
  console.log('http://localhost:3000');
});