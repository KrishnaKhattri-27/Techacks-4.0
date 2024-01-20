const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const registerUser = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static log-in method
registerUser.statics.login = async function (name, password) {
  if (!name || !password) throw Error("Email already in use");

  const user = await this.findOne({ email });

  if (!user) throw Error("Email not exists. Please register first");

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw Error("Incoreect Password");

  return user;
};

module.exports = mongoose.model("user", registerUser);
