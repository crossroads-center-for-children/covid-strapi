module.exports = {
  subject: "Crossroads Account Activation",

  text: `
  Hi <%= entity.firstName %> <%= entity.lastName %>,

  We've set up your account.

  Please visit this link to set your password: http://www.crossroads-center.herokuapp.com/reset/<%= entity.resetPasswordToken %>

  If you have any questions, please email matt.ramotar@jhu.edu.

  Best,
  Crossroads
  `,

  html: `
  <p>Hi <%= entity.firstName %> <%= entity.lastName %>,</p>

  <p>We've set up your account.</p>

  <p>Please visit this link to set your password: http://www.crossroads-center.herokuapp.com/reset/<%= entity.resetPasswordToken %></p>

  <p>If you have any questions, please email matt.ramotar@jhu.edu.</p>

  <p>Best,</p>
  <p>Crossroads</p>
  `,
};
