const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const auth = async (req, res, next) => {
  try {
    //ejfddsffdfdfdd    Bearer ejf

    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.verify(token, "mytoken");
    const admin = await Admin.findOne({
      _id: decoded._id,
      "tokens.token": token
    });
    if (!admin) throw new Error();
    req.token = token;
    req.admin = admin;
    next();
  } catch (e) {
    res.send({ error: "unauthorized" });
  }
};
module.exports = auth;
