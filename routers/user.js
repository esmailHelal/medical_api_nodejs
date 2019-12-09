const express = require("express");
const User = require("../models/user");
const authUser = require("../middleware/authUser");
const router = new express.Router();
router.post("/user", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.send(e);
  }
});
router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.send(e);
  }
});
router.get("/user/myprofile", authUser, async (req, res) => {
  res.send(req.user);
});
router.post("/user/logoutAll", authUser, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.send(e);
  }
});
router.post("/user/logout", authUser, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(tok => {
      return tok.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.send(e);
  }
});

router.delete("/user", authUser, async (req, res) => {
  try {
    // user= User.findOne({_id: req.params._id})
    await req.user.remove();
    res.send("done");
  } catch (e) {
    res.send(e);
  }
});
router.patch("/user/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowed = ["name", "email"];

  var isvalid = updates.every(update => allowed.includes(update));
  console.log(isvalid);
  if (!isvalid) res.send("cann't update ");

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) return res.send("not found");
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
