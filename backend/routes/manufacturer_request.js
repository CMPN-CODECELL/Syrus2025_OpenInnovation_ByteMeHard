const express = require("express");
const NegotiationRequest = require("../models/negotiation_request");
const auth = require("../middlewares/auth");



const getManufacturerRequest = express.Router();

getManufacturerRequest.get("/getmanufacturerrequest", auth,async (req, res) => {
    const producerId = req.userId;
    console.log("producerId", producerId)
    try {
        // Fetch all negotiation records
        const negotiations = await NegotiationRequest.find({producerId:producerId}).populate("manufacturerId").populate("producerId")
        console.log("Negotiations", negotiations)
        console.log(negotiations)        
        res.status(200).json(negotiations);
    } catch (error) {
        console.error("Error in negotiation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = getManufacturerRequest;