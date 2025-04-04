const mongoose = require("mongoose");
const ManufacturerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
    },
    password:{
      type:String,
      required:true
    },
    address: {
      type: String,
      required: true,
    },
    typeOfManufacturer: {
      type: String,
      enum: [
        "clothing",
        "furniture",
        "electronics",
        "food",
        "toys",
        "cosmetics",
        "sports equipment",
      ],
      required: true,
    },
    products:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ],
    transactions:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transactions"
      }
    ],
    bank_details:{
      account_number:{
        type: Number,

      },
      ifsc_code:{
        type: String,

      },
      bank_name:{
        type: String,

      },
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Manufacturer", ManufacturerSchema);
