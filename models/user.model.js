const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    role: { type: Number, required: true },
    profile_picture: { type: String, required: true },
    birthday: { type: String, required: true },
    id_number: { type: String, required: true, unique: true },
    assestment: { type: String },
    pre_assestment: { type: String },

    // for students
    grade: { type: String },
    //for teachers
    description: { type: String },
    major: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
