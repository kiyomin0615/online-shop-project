const bcryptjs = require("bcryptjs");

const database = require("../database/database.js");

class User {
  constructor(email, password, fullname, street, postal, city) {
    this.email = email;
    this.password = password;
    this.fullname = fullname;
    this.address = {
      street: street,
      postal: postal,
      city: city,
    };
  }

  async signup() {
    const hashedPassword = await bcryptjs.hash(this.password, 12);

    await database.getDatabase().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      fullname: this.fullname,
      address: this.address,
    });
  }
}

module.exports = User;
