const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HighscoreSchema = new Schema(
  {
    game_title: { type: String, required: true },
    name: { type: String, required: true },
    lrn: { type: String, required: true },
    points: { type: Number, required: true },
    duration: { type: Number, required: true },
    grade: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const HighScore = mongoose.model("HighScore", HighscoreSchema);

module.exports = HighScore;