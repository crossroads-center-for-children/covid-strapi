const axios = require("axios");

async function createParent({
  fullName,
  firstName,
  lastName,
  email,
  username,
  phone,
  password,
  signInCode,
  type,
  verified,
  resetToken,
  summary,
}) {
  const root = process.env.API_URL;

  const data = await axios.post(`${root}/graphql`, {
    query: `mutation (
      $fullName:String,
      $firstName:String,
      $lastName:String,
      $email:String!,
      $username:String!,
      $phone:Long,
      $password:String,
      $signInCode:Int,
      $type:ENUM_USERSPERMISSIONSUSER_TYPE,
      $verified:Boolean,
      $resetToken:String,
      $summary:JSON){
      createUser(input:{
        data:{
          fullName:$fullName,
          firstName:$firstName,
          lastName:$lastName,
          email:$email,
          username:$username,
          phone:$phone,
          password:$password,
          signInCode:$signInCode,
          type:$type,
          verified:$verified,
          resetToken:$resetToken,
          summary:$summary
        }
      }){
        user{
          id
          username
          email
        }
      }
    }`,
    variables: {
      fullName,
      firstName,
      lastName,
      email,
      username,
      phone,
      password,
      signInCode,
      type,
      verified,
      resetToken,
      summary,
    },
  });

  return (await data).data.data.createUser.user.id;
}

module.exports = createParent;
