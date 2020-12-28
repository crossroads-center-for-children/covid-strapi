const Parent = require("./classes/Parent");
const createParent = require("./functions/createParent");
const fs = require("fs").promises;

async function migrateParents(student) {
  const parentIds = [];

  let que = ["Parent1", "Parent2", "Parent3", "Parent4", "Parent5"];

  while (que.length > 0) {
    let cur = que.shift();

    if (student[`${cur} Name`]) {
      const parent = new Parent(
        student[`${cur} Name`],
        student[`${cur} Email`],
        student[`${cur} Phone`],
        student[`${cur} Sign-In Code`]
      );

      parent.init();

      try {
        const parentId = await createParent(parent);
        parentIds.push(parentId);
      } catch (err) {
        fs.appendFile(
          "./errors/parents.log",
          `
          STUDENT: ${student["First Name"]} ${student["Last Name"]}:
          ERROR: ${cur} ===============================================
          Name: ${student[`${cur} Name`]}
          Email: ${
            student[`${cur} Email`] ? student[`${cur} Email`] : "MISSING"
          }
          `
        );
      }
    }
  }

  return parentIds;
}

module.exports = migrateParents;
