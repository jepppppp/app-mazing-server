const router = require("express").Router();
let Audit = require("../models/audit.model");


// select * audit
router.get("/", async (req, res) => {
  Audit.find()
    .then((response) => res.json({ success: true, data: response }))
    .catch((err) => res.json({ success: false, message: err.message }));
});

// add audit
router.post("/add", async (req, res) => {
  const newAudit = await Audit.create(req.body)
    .then((response) => {
      res.json({ success: true, data: response });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
});

module.exports = router;
