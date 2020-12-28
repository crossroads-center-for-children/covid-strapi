const { v4: uuidv4 } = require("uuid");

class Parent {
  constructor(fullName, email, phone, signInCode) {
    this.fullName = fullName;
    this.firstName = "";
    this.lastName = "";
    this.email = email;
    this.username = email;
    this.phone = this.setPhone(phone);
    this.password = "";
    this.signInCode = this.setSignInCode(signInCode);
    this.type = "parent";
    this.verified = false;
    this.resetToken = "";
    this.summary = {};
  }

  init() {
    this.setFirstAndLastName();
    this.setResetToken();
    this.setPassword();
    this.setSummary();
  }

  setFirstAndLastName() {
    const split = this.fullName.split(" ").filter((name) => name !== "");

    if (split.length > 2) {
      this.firstName = split[0];

      if (split[1] === "Van") {
        this.lastName = `${split[1]} ${split[2]}`;
      } else {
        this.lastName = split[2];
      }
    } else {
      this.firstName = split[0];
      this.lastName = split[1];
    }
  }

  setResetToken() {
    this.resetToken = uuidv4();
  }

  setPassword() {
    this.password = this.resetToken;
  }

  setPhone(phone) {
    return Number.parseInt(phone);
  }

  setSignInCode(signInCode) {
    return Number.parseInt(signInCode);
  }

  setSummary() {
    this.summary = {
      2021: {
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {},
        8: {},
        9: {},
        10: {},
        11: {},
        12: {},
      },
    };
  }
}

module.exports = Parent;
