const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authUser = async (req, res, next) => {
  try {
    //ejfddsffdfdfdd    Bearer ejf
    console.log("l2a");
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    const decoded = jwt.verify(token, "mytoken1");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });
    if (!user) throw new Error();
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.send({ error: "unauthorized" });
  }
};
module.exports = authUser;
