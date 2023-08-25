const router = require("express").Router();
let Highscore = require("../models/highscore.model");

// select * highscore
router.get("/", async (req, res) => {
  Highscore.find()
    .then((response) => res.json({ success: true, data: response }))
    .catch((err) => res.json({ success: false, message: err.message }));
});

//select one game highscore
router.get("/find/:game_title", async (req, res) => {
  Highscore.find({ game_title: req.params.game_title })
    .sort({ points: -1 })
    .then((response) => {
      res.json({ success: true, data: response });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
});

// add highscore
router.post("/add", async (req, res) => {
  const newHighscore = await Highscore.create(req.body)
    .then((response) => {
      res.json({ success: true, data: response });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
});

// truncate collection highscore
// router.delete("/truncate", async (req, res) => {
//   await Highscore.deleteMany()
//     .then(() => res.json("Highscore truncated"))
//     .catch((err) => res.status(400).json(err.message));
// });

module.exports = router;
