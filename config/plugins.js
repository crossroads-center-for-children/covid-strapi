module.exports = ({ env }) => ({
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey: env("SENDGRID_API_KEY"),
    },
    settings: {
      defaultFrom: "matt.ramotar@jhu.edu",
      defaultReplyTo: "matt.ramotar@jhu.edu",
    },
  },
});
