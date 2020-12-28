require("dotenv").config();
const axios = require("axios");

const tags = ["Bus", "In Person", "Virtual"];

async function createTags() {
  for (const tag of tags) {
    try {
      await createTag(tag);
    } catch (err) {
      console.log(err);
    }
  }
}

async function createTag(tag) {
  const root = process.env.API_URL;

  const data = await axios.post(`${root}/graphql`, {
    query: `mutation ($tag:String){
      createTag(input:{data:{tag:$tag}}){
        tag {
          id
        }
      }
    }`,
    variables: {
      tag: tag,
    },
  });
}

createTags();
