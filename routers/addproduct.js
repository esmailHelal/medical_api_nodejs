const express = require("express");
const Product = require("../models/addproduct");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/addproduct", auth, async (req, res) => {
  const product = new Product({ ...req.body, owner1: req.admin._id });
  try {
    await product.save();
    res.send(product);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});
router.get("/product", auth, async (req, res) => {
  const product = await Product.find({ owner1: req.admin._id }).sort({
    description: 1
  });
  res.send(product);
});
/*
router.patch("/article/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowed = ["title", "description"];

  var isvalid = updates.every(update => allowed.includes(update));
  console.log(isvalid);
  if (!isvalid) res.send("cann't update ");

  try {
    const user = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) return res.send("not found");
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});*/
module.exports = router;
