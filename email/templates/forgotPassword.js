module.exports = {
  subject: "Crossroads Password Reset",

  text: `
  Hi <%= user.firstName %>,

  We've received your request to reset your password.

  All you need to do is click on the link below and enter your new password in the box provided:

  http://www.crossroads-center.herokuapp.com/reset/<%= user.resetPasswordToken %>

  If you have any questions, please email matt.ramotar@jhu.edu.

  Best,
  Crossroads
  `,

  html: `
  <p>Hi <%= user.firstName %>,</p>

  <p>We've received your request to reset your password.</p>

  <p>All you need to do is click on the link below and enter your new password in the box provided:</p>

  <p>http://www.crossroads-center.herokuapp.com/reset/<%= user.resetPasswordToken %></p>

  <p>If you have any questions, please email matt.ramotar@jhu.edu.</p>

  <p>Best,</p>
  <p>Crossroads</p>
  `,
};
