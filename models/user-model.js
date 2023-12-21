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

  getUserWithSameEmail() {
    return database
      .getDatabase()
      .collection("users")
      .findOne({ email: this.email });
  }

  async existAlready() {
    const existingUser = await this.getUserWithSameEmail();

    return existingUser ? true : false;
  }

  hasMatchingPassword(hashedPassword) {
    return bcryptjs.compare(this.password, hashedPassword);
  }
}

module.exports = User;
