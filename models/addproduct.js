const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true
    },

    title: {
      type: String,
      require: true,
      trim: true
    },
    prize: {
      type: Number,
      required: true,
      min: 1
    },
    owner1: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Admain"
    }
  },
  {
    timestamps: true
  }
);
const product = mongoose.model("product", productSchema);
module.exports = product;
