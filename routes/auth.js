const router = require("express").Router();
let User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");
const { serialize } = require("cookie");

require("dotenv").config();
// add user
const secret = process.env.SECRET;
router.post("/login", async (req, res) => {
  const { id_number, password } = req.body;
  let newError = {};
  if (id_number?.trim() == "" || id_number == undefined) {
    newError = { ...newError, idNumberError: "Please enter id_number!" };
  }
  if (password?.trim() == "" || password == undefined) {
    newError = { ...newError, passwordError: "Please enter password!" };
  }
  if (
    newError.hasOwnProperty("id_numberError") ||
    newError.hasOwnProperty("passwordError")
  ) {
    return response({ res, status_code: 400, success: false, error: newError });
  } else {
    let result = null;
    try {
      const user = await User.findOne({
        id_number,
        role: { $in: [1, 2] },
      });

      const decryptPassword = await bcrypt.compare(password, user.password);
      if (decryptPassword) {
        result = user;
      } else {
        result = null;
      }
    } catch (error) {}
    if (result) {
      try {
        const token = sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 100,
            id: result._id,
            role: result.role == 1 ? "teacher" : "student",
          },
          secret
        );
        res.status(200).json({ success: true, data: result, token });
      } catch (e) {
        return res.status(400).json({ success: false, error: e });
      }
    } else {
      res.json({
        success: false,
        errors: { id_numberError: "Wrong password or id_number!" },
      });
    }
  }
});

router.post("/checkauth", async (req, res) => {
  try {
    const jwt = req.body.token;
    if (!jwt) {
      return res.json({ success: false, message: "no token" });
    }
    const user = verify(jwt, secret);
    const user_data = await User.findById(user.id).select([
      "-password",
      "-__v",
    ]);
    if (user_data) {
      return res.json({ success: true, data: user_data });
    } else {
      throw new Error("Invalid Token");
    }
  } catch (error) {
    res.status(400).json({ success: false, error: "Invalid Token" });
  }
});
module.exports = router;
