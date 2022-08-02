const fs = require('fs').promises;

const getTalker = async () => {
  const talker = await fs.readFile('./talker.json', 'utf-8');
  return JSON.parse(talker);
};

const setGetTalker = async (talker) => {
  await fs.writeFile('./talker.json', JSON.stringify(talker));
};

module.exports = {
  getTalker,
  setGetTalker,
};