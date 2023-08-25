const router = require("express").Router();
let Quiz = require("../models/quiz.model");

// select * quiz
router.get("/", async (req, res) => {
  Quiz.find()
    .then((response) => res.json({ success: true, data: response }))
    .catch((err) => res.json({ success: false, message: err.message }));
});

//select one quiz
router.get("/find/:id", async (req, res) => {
  Quiz.find({ _id: req.params.id })
    .sort({ createdAt: -1 })
    .then((response) => {
      res.json({ success: true, data: response });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
});

// add quiz
router.post("/add", async (req, res) => {
  const newQuiz = await Quiz.create(req.body)
    .then((response) => {
      res.json({ success: true, data: response });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
});

//update quiz
router.put("/update/:id", async (req, res) => {
  Quiz.findByIdAndUpdate(req.params.id, req.body)
    .then((response) => {
      if (response) {
        console.log(response);
        res.json({ success: true });
      } else {
        res.json({ success: false, message: "Quiz not found" });
      }
    })

    .catch((err) => res.json({ success: false, message: err.message }));
});

router.delete("/delete/:id", async (req, res) => {
  Quiz.findByIdAndDelete(req.params.id)
    .then(() => res.json("Quiz deleted"))
    .catch((err) => res.status(400).json(err.message));
});
// truncate collection quiz
// router.delete("/truncate", async (req, res) => {
//   await Quiz.deleteMany()
//     .then(() => res.json("Note truncated"))
//     .catch((err) => res.status(400).json(err.message));
// });

module.exports = router;
