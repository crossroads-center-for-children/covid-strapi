const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const _ = require("lodash");
const crypto = require("crypto");

const activationTemplate = require("../../../email/templates/activation");
const forgotPasswordTemplate = require("../../../email/templates/forgotPassword");

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;

    // Generate random token.
    const resetPasswordToken = crypto.randomBytes(64).toString("hex");

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.plugins["users-permissions"].services.user.add(
        data,
        { files }
      );
    } else {
      console.log(ctx.request.body);
      entity = await strapi.plugins["users-permissions"].services.user.add({
        resetPasswordToken,
        ...ctx.request.body,
      });
    }

    console.log(entity);

    await strapi.plugins.email.services.email.sendTemplatedEmail(
      {
        to: entity.email,
        from: "matt.ramotar@jhu.edu",
      },
      activationTemplate,
      {
        entity: {
          email: entity.email,
          firstName: entity.firstName,
          lastName: entity.lastName,
          resetPasswordToken: resetPasswordToken,
        },
      }
    );

    return sanitizeEntity(entity, {
      model: strapi.plugins["users-permissions"].models.user,
    });
  },
};
