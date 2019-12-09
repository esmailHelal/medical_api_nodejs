const express = require("express");
const Article = require("../models/article");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/article", auth, async (req, res) => {
  const article = new Article({ ...req.body, owner: req.admin._id });
  try {
    await article.save();
    res.send(article);
  } catch (e) {
    console.log(e);
  }
});
router.get("/article", auth, async (req, res) => {
  const article = await Article.find({ owner: req.admin._id }).sort({
    description: 1
  });
  res.send(article);
});
router.patch("/article/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowed = ["title", "description"];

  var isvalid = updates.every(update => allowed.includes(update));
  console.log(isvalid);
  if (!isvalid) res.send("cann't update ");

  try {
    const user = await Article.findByIdAndUpdate(req.params.id, req.body, {
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
