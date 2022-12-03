const { Schema, model } = require("mongoose");

const registerSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    image: {
      type: String,
      requied: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("User", registerSchema);
