const axios = require("axios");

async function createQuestion(question) {
  const root = process.env.API_URL;
  const data = await axios.post(`${root}/questions`, question);
  console.log(data.data);
  return (await data).data.id;
}

module.exports = createQuestion;
