const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ModuleSchema = new Schema(
  {
    teacher_name: { type: String, required: true },
    teacher_id: { type: String, required: true },
    profile_picture: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Module = mongoose.model("Module", ModuleSchema);

module.exports = Module;
