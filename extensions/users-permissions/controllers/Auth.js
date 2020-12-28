"use strict";

/**
 * Auth.js controller
 *
 * @description: A set of functions called "actions" for managing `Auth`.
 */

/* eslint-disable no-useless-escape */
const crypto = require("crypto");
const _ = require("lodash");
const { sanitizeEntity } = require("strapi-utils");
const forgotPasswordTemplate = require("../../../email/templates/forgotPassword");

const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const formatError = (error) => [
  { messages: [{ id: error.id, message: error.message, field: error.field }] },
];

module.exports = {
  async forgotPassword(ctx) {
    console.log(ctx.request.body);
    let { email } = ctx.request.body;

    // Check if the provided email is valid or not.
    const isEmail = emailRegExp.test(email);

    if (isEmail) {
      email = email.toLowerCase();
    } else {
      return ctx.badRequest(
        null,
        formatError({
          id: "Auth.form.error.email.format",
          message: "Please provide valid email address.",
        })
      );
    }

    // Find the user by email.
    const user = await strapi
      .query("user", "users-permissions")
      .findOne({ email: email.toLowerCase() });

    // User not found.
    if (!user) {
      return ctx.badRequest(
        null,
        formatError({
          id: "Auth.form.error.user.not-exist",
          message: "This email does not exist.",
        })
      );
    }

    // Generate random token.
    const resetPasswordToken = crypto.randomBytes(64).toString("hex");

    try {
      // Send an email to the user.
      await strapi.plugins.email.services.email.sendTemplatedEmail(
        {
          to: user.email,
          from: "matt.ramotar@jhu.edu",
        },
        forgotPasswordTemplate,
        {
          user: {
            email: user.email,
            firstName: user.firstName,
            resetPasswordToken,
          },
        }
      );
    } catch (err) {
      return ctx.badRequest(null, err);
    }

    // Update the user.
    await strapi
      .query("user", "users-permissions")
      .update({ id: user.id }, { resetPasswordToken });

    ctx.send({ ok: true });
  },

  async resetPassword(ctx) {
    const params = ctx.request.body;

    if (
      params.password &&
      params.passwordConfirmation &&
      params.password === params.passwordConfirmation &&
      params.code
    ) {
      const user = await strapi
        .query("user", "users-permissions")
        .findOne({ resetPasswordToken: `${params.code}` });

      if (!user) {
        return ctx.badRequest(
          null,
          formatError({
            id: "Auth.form.error.code.provide",
            message: "Incorrect code provided.",
          })
        );
      }

      const password = await strapi.plugins[
        "users-permissions"
      ].services.user.hashPassword({
        password: params.password,
      });

      // Update the user.
      await strapi
        .query("user", "users-permissions")
        .update({ id: user.id }, { resetPasswordToken: null, password });

      ctx.send({
        jwt: strapi.plugins["users-permissions"].services.jwt.issue({
          id: user.id,
        }),
        user: sanitizeEntity(user.toJSON ? user.toJSON() : user, {
          model: strapi.query("user", "users-permissions").model,
        }),
      });
    } else if (
      params.password &&
      params.passwordConfirmation &&
      params.password !== params.passwordConfirmation
    ) {
      return ctx.badRequest(
        null,
        formatError({
          id: "Auth.form.error.password.matching",
          message: "Passwords do not match.",
        })
      );
    } else {
      return ctx.badRequest(
        null,
        formatError({
          id: "Auth.form.error.params.provide",
          message: "Link is invalid or has expired.",
        })
      );
    }
  },
};
