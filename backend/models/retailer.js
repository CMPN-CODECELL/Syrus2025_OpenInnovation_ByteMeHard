const mongoose = require("mongoose");
const RetailerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    name:{
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },   
    transactions:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transactions"
      }
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Retailer", RetailerSchema);