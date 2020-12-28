require("dotenv").config();

const students = require("../../data/students");
const migrateStudent = require("./migrateStudent");

async function migrate() {
  const studentsWhoRideBus = students.filter((student) =>
    student.Tags.includes("Bus")
  );

  for (const student of studentsWhoRideBus) {
    try {
      await migrateStudent(student);
      console.log(`Student and parents migrated successfully.`);
    } catch (err) {
      console.error(err);
    }
  }
}

migrate();
