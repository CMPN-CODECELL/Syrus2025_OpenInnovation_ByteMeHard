const express = require("express");
const negogiationRetailerRouter = express.Router();

const auth = require("../middlewares/auth");
const { NegotiationRetailer } = require("../models/negotiationRetailer");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const retailer = require("../models/retailer");

const genAI = new GoogleGenerativeAI("AIzaSyB2_MywtpPEtPI8kNDpsWffWo_gRFpdVGA");



negogiationRetailerRouter.post("/", async (req, res) => {
    let aiSuggestedPrice = null;

    try {
        const {
            productId,
            message,
            budget,
            quantity,
            productName,
            initialPrice,
            minimumPrice,
            maximumDiscount = 2, // Default max discount
            retailerId,
            stage, 
            previousPrompt,
        } = req.body;

        console.log("req : body", req.body);

        if (
            !productId ||
            !message ||
            !budget ||
            !quantity ||
            !productName ||
            !initialPrice ||
            !minimumPrice ||
            !retailerId
        ) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        let negotiation = await NegotiationRetailer.findOne({
            productId,
            status: "active",
        });

        if (!negotiation) {
            negotiation = new NegotiationRetailer({
                productId,
                retailerId: retailerId,
                customerId: req.user ? req.user.id : "guest",
                initialPrice,
                minimumPrice,
                budget,
                quantity,
                messages: [{ role: "customer", content: message }],
                status: "active",
                previousPrompt
            });
            await negotiation.save();
        } else {
            negotiation.messages.push({ role: "customer", content: message });
            await negotiation.save();
        }


        if (message.toLowerCase().includes("deal done")) {
          negotiation.status = "completed";
          await negotiation.save();
          console.log( negotiation.budget);
          console.log( negotiation.status);

          return res.json({
              message: "confirmed",
              negotiationId: negotiation._id,
              budget: negotiation.budget,
              status: negotiation.status,
          });
      }

        const totalBudget = parseFloat(budget);
        const totalInitialPrice = parseFloat(initialPrice) * parseInt(quantity, 10);
        const discountRequested = (
            ((totalInitialPrice - totalBudget) / totalInitialPrice) *
            10
        ).toFixed(2);
        const pricePerUnit = (totalBudget / parseInt(quantity, 10)).toFixed(2);

        // Initialize Gemini AI
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
            You are an AI negotiation assistant. Your goal is to negotiate product prices effectively.

            Product: ${productName}
            Original price: $${initialPrice} per unit
            Customer's budget: $${totalBudget} total ($${pricePerUnit} per unit)
            Quantity requested: ${quantity} units
            Discount requested: ${discountRequested}%
            Minimum acceptable price: $${minimumPrice}
            Previous Negogiation : ${previousPrompt}

            Customer message: "${message}"

            Current negotiation stage: ${stage}

            Instructions:
            1. Always provide a clear, final price to the customer in your response (e.g., "I can offer you a final price of $XYZ.")—this is mandatory in every reply.
            2. Ensure the price you provide is the **total price** (not per unit) and follows the format: **"I can offer you a final price of $XYZ."**
            3. If the requested discount is within 4-5%, accept or propose a small adjustment.
            4. If the requested discount exceeds 5%, negotiate but do not drop below the **minimum price ($${minimumPrice})**.
            5. If the customer insists on a price below the minimum, respond with: "I understand your request, but going below $${minimumPrice} would not be profitable for us."
            6. Keep responses short, persuasive, and professional.
        `;

        // Get AI-generated response
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        const response =
            result.response.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Unable to generate response";
        console.log("[AI Response]:", response);

        // Improved regex to capture full price values (including 4+ digits)
        const pricePattern =
            /\b(?:final price|I can offer(?: you)?|how about|we agree on)[^\$]*\$(\d{1,})(?:,?\d{3})*(?:\.\d{1,2})?/i;

        const priceMatch = response.match(pricePattern);
        console.log("[PRICE MATCH]:", priceMatch);

        if (priceMatch) {
            aiSuggestedPrice = parseFloat(priceMatch[1].replace(/,/g, ""));
            console.log("[INFO] AI Suggested Price: $", aiSuggestedPrice);
        }

        // Ensure valid quantity and price for updating
        const quantityInt = parseInt(quantity, 10);
        const isValidPrice =
            !isNaN(aiSuggestedPrice) && aiSuggestedPrice >= minimumPrice;

        if (isValidPrice) {
            negotiation.budget = aiSuggestedPrice; // Set total price (not per unit)
            await negotiation.save();
            console.log("[INFO] Budget updated successfully: $", aiSuggestedPrice);
        } else {
            console.warn(
                "[WARN] No valid price extracted from AI response or price below minimum."
            );
        }

        // Save AI response to negotiation
        negotiation.previousPrompt = response;
        negotiation.messages.push({ role: "assistant", content: response });
        await negotiation.save();

        res.json({
            message: response,
            negotiationId: negotiation._id,
            aiSuggestedPrice,
        });
    } catch (error) {
        console.error("[ERROR] Negotiation error:", error);
        res.status(500).json({ error: "Server error during negotiation" });
    }
});


negogiationRetailerRouter.get('/get/retailer', async (req, res) => {
    try {
      const negotiations = await NegotiationRetailer.find();
  
      if (!negotiations.length) {
        return res.status(404).json({ message: 'No negotiations found' });
      }
  
      const responseData = await Promise.all(
        negotiations.map(async (negotiation) => {
          const retailerData = await retailer.findById(negotiation.retailerId);
          const lastMessage = negotiation.messages?.[negotiation.messages.length - 1] || {};
  
          return {
            budget: negotiation.budget || 0,
            quantity: negotiation.quantity || 0,
            retailerInfo: retailerData
              ? {
                  name: retailerData.name || 'Unknown',
                  email: retailerData.email || 'No Email',
                  phone: retailerData.phone || 'No Phone',
                }
              : null,
            lastMessage: lastMessage
              ? {
                  role: lastMessage.role || 'Unknown',
                  content: lastMessage.content || 'No message available.',
                  timestamp: lastMessage.timestamp || new Date(),
                }
              : null,
            status: negotiation.status || 'Pending',
          };
        })
      );
  
      res.status(200).json(responseData);
    } catch (error) {
      console.error('Error fetching negotiation details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  
// Get specific negotiation details for retailer
negogiationRetailerRouter.get("/retailer/negotiations/:negotiationId", async (req, res) => {
    try {
        const negotiation = await NegotiationRetailer.findById(req.params.negotiationId)
            .populate("productId", "name price images")
            .populate("customerId", "name email");

        if (!negotiation) {
            console.log("negotiation not found");
            return res.status(404).json({ error: "Negotiation not found" });
        }

        res.json(negotiation);
    } catch (error) {
        console.error("Error fetching negotiation details:", error);
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = negogiationRetailerRouter;
