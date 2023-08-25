const router = require("express").Router();
let Video = require("../models/video.model");

// select * video
router.get("/", async (req, res) => {
  Video.find()
    .then((response) => res.json({ success: true, data: response }))
    .catch((err) => res.json({ success: false, message: err.message }));
});

//select one video
router.get("/find/:id", async (req, res) => {
  Video.find({ _id: req.params.id })
    .sort({ createdAt: -1 })
    .then((response) => {
      res.json({ success: true, data: response });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
});

// add video
router.post("/add", async (req, res) => {
  const newVideo = await Video.create(req.body)
    .then((response) => {
      res.json({ success: true, data: response });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
});
//update video
router.put("/update/:id", async (req, res) => {
  Video.findByIdAndUpdate(req.params.id, req.body)
    .then((response) => {
      if (response) {
        res.json({ success: true });
      } else {
        res.json({ success: false, message: "Video not found" });
      }
    })

    .catch((err) => res.json({ success: false, message: err.message }));
});
router.delete("/delete/:id", async (req, res) => {
  Video.findByIdAndDelete(req.params.id)
    .then(() => res.json("Video deleted"))
    .catch((err) => res.status(400).json(err.message));
});
// truncate collection video
// router.delete("/truncate", async (req, res) => {
//   await Video.deleteMany()
//     .then(() => res.json("Note truncated"))
//     .catch((err) => res.status(400).json(err.message));
// });

module.exports = router;
