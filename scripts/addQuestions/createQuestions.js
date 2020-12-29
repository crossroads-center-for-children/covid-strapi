const questions = require("../../data/questions");
const createQuestion = require("./createQuestion");

async function createQuestions(type) {
  const questionIds = [];
  let que = questions[type];

  while (que.length > 0) {
    const question = que.shift();

    const questionId = await createQuestion(question);
    questionIds.push(questionId);
  }

  return questionIds;
}

module.exports = createQuestions;
