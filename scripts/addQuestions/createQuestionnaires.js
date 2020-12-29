require("dotenv").config();

const questionnaires = require("../../data/questionnaires");
const createQuestionnaire = require("./createQuestionnaire");

async function createQuestionnaires() {
  for (const questionnaire of questionnaires) {
    await createQuestionnaire(questionnaire);
  }
}

createQuestionnaires();
