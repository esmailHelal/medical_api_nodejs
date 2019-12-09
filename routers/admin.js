const express = require("express");
const Admain = require("../models/admin");
const auth = require("../middleware/auth");
const router = new express.Router();
router.post("/admain", async (req, res) => {
  const admain = new Admain(req.body);
  try {
    await admain.save();
    const token = await admain.generateAuthToken();
    res.status(200).send({ admain, token });
  } catch (e) {
    res.send(e);
  }
});
router.post("/admain/login", async (req, res) => {
  try {
    const admain = await Admain.findByCredentials(
      req.body.email,
      req.body.password
    );
    console.log(admain);
    if (!admain) {
      console.log(admain);
    }
    const token = await admain.generateAuthToken();
    res.send({ admain, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});
router.get("/admain/myprofile", auth, async (req, res) => {
  res.send(req.admin);
});
router.post("/admain/logoutAll", auth, async (req, res) => {
  try {
    req.admin.tokens = [];
    await req.admin.save();
    res.send();
  } catch (e) {
    res.send(e);
  }
});
router.post("/admain/logout", auth, async (req, res) => {
  try {
    req.admin.tokens = req.admin.tokens.filter(tok => {
      return tok.token != req.token;
    });
    await req.admin.save();
    res.send();
  } catch (e) {
    res.send(e);
  }
});

router.delete("/admain", auth, async (req, res) => {
  try {
    // user= User.findOne({_id: req.params._id})
    await req.admin.remove();
    res.send();
  } catch (e) {
    res.send(e);
  }
});
router.patch("/admain", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowed = ["name", "email"];

  var isvalid = updates.every(update => allowed.includes(update));
  console.log(isvalid);
  if (!isvalid) res.send("cann't update ");

  try {
    /*
    const user = await Admain.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) return res.send("not found");
    res.send(user);*/
    req.admin.name = req.body.name;
    req.admin.email = req.body.email;
    await req.admin.save();
    res.send(req.admin);
  } catch (e) {
    res.send(e);
  }
});
module.exports = router;
