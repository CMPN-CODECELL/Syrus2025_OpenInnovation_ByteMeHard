const express = require("express");
const { Negotiation } = require("../models/Negotiation");
const product = require("../models/product");

const getProducerRouter = express.Router();

getProducerRouter.get("/getproducernegotiation", async (req, res) => {
  try {
    // Fetch all negotiation records
    const negotiations = await Negotiation.find();
    console.log(negotiations)

    if (!negotiations || negotiations.length === 0) {
      return res.status(404).json({ error: "No negotiations found" });
    }

    // Map through negotiations and fetch corresponding product details
    const negotiationData = await Promise.all(
      negotiations.map(async (negotiation) => {
        // Ensure productId exists
        if (!negotiation.productId) {
          return { error: "Product ID missing for negotiation" };
        }

        // Fetch product details by productId
        const productDetails = await product.findById(negotiation.productId);

        if (!productDetails) {
          return { error: "Product not found for the given ID" };
        }

        // Construct response data
        return {
          productName: productDetails.name,
          productPrice: productDetails.max_price,
          productQuantity: productDetails.quantity,
          details:productDetails.details,
          budget: negotiation.budget,
          quantity: negotiation.quantity,
        };
      })
    );

    res.status(200).json(negotiationData);
  } catch (error) {
    console.error("Error in negotiation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = getProducerRouter;
