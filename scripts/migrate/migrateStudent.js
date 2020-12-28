const migrateParents = require("./migrateParents");
const createStudent = require("./functions/createStudent");
const getRoomId = require("./functions/getRoomId");
const getTagIds = require("./functions/getTagIds");

async function migrateStudent(student) {
  const parentIds = await migrateParents(student);

  const room = student.Room;
  const roomId = getRoomId(room);

  const tags = student.Tags.split(",");
  const tagIds = getTagIds(tags);

  await createStudent({
    firstName: student["First Name"],
    lastName: student["Last Name"],
    parents: parentIds,
    room: roomId,
    tags: tagIds,
    active: true,
  });
}

module.exports = migrateStudent;
