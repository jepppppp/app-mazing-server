const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.set("strictQuery", true);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb database connection established successfully");
});

const highscoreRouter = require("./routes/highscore");
app.use("/api/highscore", highscoreRouter);

const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);

const moduleRouter = require("./routes/module");
app.use("/api/module", moduleRouter);

const quizRouter = require("./routes/quiz");
app.use("/api/quiz", quizRouter);

const userRouter = require("./routes/user");
app.use("/api/user", userRouter);

const videoRouter = require("./routes/video");
app.use("/api/video", videoRouter);

const auditRouter = require("./routes/audit");
app.use("/api/audit", auditRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
