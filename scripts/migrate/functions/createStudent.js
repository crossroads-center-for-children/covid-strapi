const axios = require("axios");

async function createStudent({
  firstName,
  lastName,
  parents,
  room,
  tags,
  active,
}) {
  const root = process.env.API_URL;

  const data = await axios.post(`${root}/graphql`, {
    query: `mutation(
      $firstName:String,
      $lastName:String,
      $parents:[ID],
      $room:ID,
      $tags:[ID],
      $active:Boolean
    ) {
      createStudent(input:{
        data:{
          firstName:$firstName,
          lastName:$lastName,
          parents:$parents,
          room:$room,
          tags:$tags,
          active:$active
        }}) {
        student {
          id
        }
      }
    }`,
    variables: {
      firstName,
      lastName,
      parents,
      room,
      tags,
      active,
    },
  });
}

module.exports = createStudent;
