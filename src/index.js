const express = require("express");
require("../db/mongoose");
const cors = require("cors");
const admainRouter = require("../routers/admin");
const articleRouter = require("../routers/article");
const userRouter = require("../routers/user");
const productRouter = require("../routers/addproduct");
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(admainRouter);
app.use(articleRouter);
app.use(userRouter);
app.use(productRouter);
app.listen(port, () => {
  console.log("server up on ", port);
});
