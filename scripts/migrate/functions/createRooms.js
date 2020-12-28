require("dotenv").config();
const axios = require("axios");

const rooms = [
  "Room 1",
  "Room 2",
  "Room 3",
  "Room 4",
  "Room 5",
  "Room 6",
  "Room 7",
  "Room 8",
  "Room 11",
  "Room 12",
  "Room 13",
  "Room 14",
  "Room 15",
  "Clinic",
  "Daycare",
];

async function createRooms() {
  for (const room of rooms) {
    try {
      await createRoom(room);
    } catch (err) {
      console.log(err);
    }
  }
}

async function createRoom(slug) {
  const root = process.env.API_URL;

  const data = await axios.post(`${root}/graphql`, {
    query: `mutation ($slug:String){
    createRoom(input:{data:{slug:$slug}}){
      room {
        id
      }
    }
  }`,
    variables: {
      slug: slug,
    },
  });
}

createRooms();
