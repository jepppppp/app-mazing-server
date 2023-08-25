const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuizSchema = new Schema(
  {
    teacher_name: { type: String, required: true },
    teacher_id: { type: String, required: true },
    profile_picture: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    category: { type: String, required: true },
    questions: {
      type: [
        {
          id: { type: String, required: true },
          question: { type: String, required: true },
          answer: { type: String, required: true },
          type: { type: String, required: true },
          choices: {
            type: [{ id: { type: String }, value: { type: String } }],
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;
