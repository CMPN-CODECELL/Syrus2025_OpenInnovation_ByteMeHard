const mongoose = require("mongoose");

const NegotiationRequestSchema = new mongoose.Schema({
    manufacturerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manufacturer",
        required: true,
    },
    producerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RawMaterialSeller",
        required: true,
    },
    rawMaterial: {
        type: String,
        required: true,
    },
    requestedQuantity: {
        type: Number,
        required: true,
    },
    proposedBudget: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected", "counter-offered"],
        default: "pending",
    },
    counterOffer: {
        type: Number, // If producer wants to negotiate, they can propose a new amount
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to update `updatedAt` before saving
NegotiationRequestSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("NegotiationRequest", NegotiationRequestSchema);
