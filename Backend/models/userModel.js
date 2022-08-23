const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = new Schema({
  email: { type: String, required: true, unique: true }, //unique email should be unique
  password: { type: String, required: true },
});
//static signup method
userSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields musts be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }
  const salt = await bcrypt.genSalt(10); //rendom value to make pass more secure
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });
  return user;
};
//static login method
userSchema.statics.Login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields musts be filled");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect Email");
  }
  //const match = await bcrypt.compare(password, user.password);
 // if (!match) {
//throw Error("Invalid Password");
 // }
  return user;
};
module.exports = mongoose.model("User", userSchema);
