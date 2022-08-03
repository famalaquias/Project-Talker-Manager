const validationEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
 
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } 

  next();
};

const validationPassword = (req, res, next) => {
  try { 
    const { password } = req.body;

    if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }  
    if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
  } catch (err) {
    return res.status(500).end();
  }
};

const validationToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const validationName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }  
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validationAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }  
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validationTalkWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const regexDate = /^\d{2}\/\d{2}\/\d{4}$/;
  try {
    if (!talk) {
      return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    if (!talk.watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }    
  if (!regexDate.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } 
  } catch (err) {
    return res.status(400).json({ message: err.message });    
  }

  next();
};

const validationTalkRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  try {
    if (rate === undefined) {
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }

    if (rate < 1 || rate > 5) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }    
  } catch (err) {
    return res.status(400).json({ message: err.message });    
  }

  next();
};

module.exports = {
  validationEmail,
  validationPassword,
  validationToken,
  validationName,
  validationAge,
  validationTalkWatchedAt,
  validationTalkRate,
};