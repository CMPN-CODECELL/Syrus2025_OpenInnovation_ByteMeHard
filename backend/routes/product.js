const {createNewProduct,getAllProducts} = require("../controllers/product");
const express = require("express");
const auth = require("../middlewares/auth");
const NewProductRouter = express.Router();

NewProductRouter.post("/",createNewProduct);
NewProductRouter.get("/getall", auth,getAllProducts);

module.exports = NewProductRouter;