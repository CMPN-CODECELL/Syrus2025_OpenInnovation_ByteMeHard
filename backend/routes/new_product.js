const {createNewProduct,getAllProducts, getProductBySearch} = require("../controllers/product");
const express = require("express");
const auth = require("../middlewares/auth");
const NewProductRouter = express.Router();

NewProductRouter.post("/", auth,createNewProduct);
NewProductRouter.get("/getall", auth,getAllProducts);
NewProductRouter.get("/getproductbysearch", getProductBySearch);

module.exports = NewProductRouter;