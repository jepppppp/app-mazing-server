const router = require("express").Router();
const Module = require("../models/module.model");
const User = require("../models/user.model");
const Quiz = require("../models/quiz.model");
const Video = require("../models/video.model");
const bcrypt = require("bcrypt");
// select * user
router.get("/", async (req, res) => {
  User.find()
    .then((response) => res.json({ success: true, data: response }))
    .catch((err) => res.json({ success: false, message: err.message }));
});

// select * teacher user
router.get("/teachers", async (req, res) => {
  User.find({ role: 1 })
    .then((response) => res.json({ success: true, data: response }))
    .catch((err) => res.json({ success: false, message: err.message }));
});

//select one user
router.get("/find/:id", async (req, res) => {
  User.find({ _id: req.params.id })
    .sort({ createdAt: -1 })
    .then((response) => {
      res.json({ success: true, data: response });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
});

//change password
router.post("/change-password/:id", async (req, res) => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(req.body?.password, salt);
  const user = await User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      password: hashPassword,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (user) {
    return res.status(200).json({ success: true });
  }
  return res.status(400).json({
    success: false,
    errors: {
      oldPasswordError: "User doesn't exist!",
    },
  });
});

// add user
router.post("/add", async (req, res) => {
  const newUser = await User.create(req.body)
    .then((response) => {
      res.json({ success: true, data: response });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
});
//update user
router.put("/update/:id", async (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((response) => {
      if (response) {
        console.log(response);
        res.json({ success: true });
      } else {
        res.json({ success: false, message: "User not found" });
      }
    })

    .catch((err) => res.json({ success: false, message: err.message }));
});

//update profile picture
router.put("/update/profile/:id", async (req, res) => {
  let counter = 0;
  await User.findOneAndUpdate(
    { _id: req.params.id },
    {
      profile_picture: req.body.image,
    }
  ).then((response) => {
    counter += 1;
  });
  await Video.updateMany(
    { teacher_id: req.params.id },
    { $set: { profile_picture: req.body.image } }
  ).then((response) => {
    counter += 1;
  });
  await Module.updateMany(
    { teacher_id: req.params.id },
    { $set: { profile_picture: req.body.image } }
  ).then((response) => {
    counter += 1;
  });
  await Quiz.updateMany(
    { teacher_id: req.params.id },
    { $set: { profile_picture: req.body.image } }
  ).then((response) => {
    counter += 1;
    if (counter == 4) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});
router.delete("/delete/:id", async (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted"))
    .catch((err) => res.status(400).json(err.message));
});
// truncate collection user
// router.delete("/truncate", async (req, res) => {
//   await User.deleteMany()
//     .then(() => res.json("Note truncated"))
//     .catch((err) => res.status(400).json(err.message));
// });

module.exports = router;
