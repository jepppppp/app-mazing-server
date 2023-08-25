const router = require("express").Router();
let Module = require("../models/module.model");

// select * module
router.get("/", async (req, res) => {
  Module.find()
    .then((response) => res.json({ success: true, data: response }))
    .catch((err) => res.json({ success: false, message: err.message }));
});

//select one module
router.get("/find/:id", async (req, res) => {
  Module.find({ _id: req.params.id })
    .sort({ createdAt: -1 })
    .then((response) => {
      res.json({ success: true, data: response });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
});

// add module
router.post("/add", async (req, res) => {
  const newModule = await Module.create(req.body)
    .then((response) => {
      res.json({ success: true, data: response });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
});
//update module
router.put("/update/:id", async (req, res) => {
  Module.findByIdAndUpdate(req.params.id, req.body)
    .then((response) => {
      if (response) {
        res.json({ success: true });
      } else {
        res.json({ success: false, message: "Module not found" });
      }
    })

    .catch((err) => res.json({ success: false, message: err.message }));
});
router.delete("/delete/:id", async (req, res) => {
  Module.findByIdAndDelete(req.params.id)
    .then(() => res.json("Video deleted"))
    .catch((err) => res.status(400).json(err.message));
});

// truncate collection module
// router.delete("/truncate", async (req, res) => {
//   await Module.deleteMany()
//     .then(() => res.json("Note truncated"))
//     .catch((err) => res.status(400).json(err.message));
// });

module.exports = router;
