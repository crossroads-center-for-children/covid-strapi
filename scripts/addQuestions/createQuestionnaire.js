const axios = require("axios");
const createQuestions = require("./createQuestions");

async function createQuestionnaire(questionnaire) {
  const root = process.env.API_URL;

  const questionIds = await createQuestions(questionnaire.type);

  await axios.post(`${root}/questionnaires`, {
    type: questionnaire.type,
    questions: questionIds,
  });
}

module.exports = createQuestionnaire;
