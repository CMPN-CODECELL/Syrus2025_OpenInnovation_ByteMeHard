const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const crypto = require("crypto");
// const TestRouter = require("./routes/test");
const LoginRouter = require("./routes/login");
const ResgisterRouter = require('./routes/register')
// const SignupRouter = require("./routes/signup");
// const LogoutRouter = require("./routes/logout");
const NewProductRouter = require("./routes/new_product");
// const router = require("./routes/supplier");
// const RawMaterialRouter = require("./routes/raw_material");
// const transactionRouter = require("./routes/addTransaction");
// const retailerRouter = require("./routes/retailer");
// // const userRouter = require("./routes/user_details")
const negotiationRouter = require("./routes/negotiation");
const negotiationRequestRouter = require("./routes/manufacturer_request");
// const productRouter = require("./routes/new_product");
// const AddPostRouter = require("./routes/AddPost.routes");
// const GetPostRouter = require("./routes/GetPost.route");
const cookieParser = require("cookie-parser");
const Razorpay = require("razorpay");
const getProducerRouter = require("./routes/get_producer_negotiation");
const negogiationRetailerRouter = require("./routes/negiotiationRetailer");
const axios = require("axios");
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const csv = require("csv-parser");
const fs = require("fs");
const ExcelJS = require("exceljs");
const BalanceRouter = require("./routes/balance_sheet_details");
const { Negotiation } = require("./models/Negotiation");
const TransactionManufacturerRetailer = require("./models/transaction_between_manufacturer_retailer");
const Product = require("./models/product");
const Retailer = require("./models/retailer");
const Manufacturer = require("./models/manufacturer");

// Database Connection
connectDB();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin:
            process.env.FRONTEND_URL ||
            "http://localhost:5173" ||
            "http://localhost:5174",
        credentials: true,
    })
);

// Routes
// app.use("/api/test", TestRouter);
app.use("/api/login", LoginRouter);
app.use("/api/register", ResgisterRouter);
// app.use("/api/signup", SignupRouter);
// app.use("/api/logout", LogoutRouter);
app.use("/api/product", NewProductRouter);
app.use("/api/retailnego", negogiationRetailerRouter);
// app.use("/api/supplier", router);
// app.use("/api/raw_material", RawMaterialRouter);
// app.use("/api/transaction", transactionRouter);
// app.use("/api/retailer", retailerRouter);
// app.use("/api/user",userRouter)
app.use("/api/negotiate", negotiationRouter);
app.use("/api", negotiationRequestRouter);
// app.use("/api/posts", AddPostRouter);
// app.use("/api/posts", GetPostRouter);
app.use("/api", getProducerRouter);
app.use("/balance", BalanceRouter);
// MongoDB connection
// mongoose.connect(process.env.MONGODB_URI)
// .then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('MongoDB connection error:', err));

// Error handling 


// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});

console.log("Razorpay Key ID:", process.env.KEY_ID);
console.log("Razorpay Key Secret:", process.env.KEY_SECRET);
// Create Order
app.post('/order', async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount) {
            return res.status(400).json({ error: 'Amount is required' });
        }
        const options = {
            amount: amount * 100, // Razorpay works in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);
        res.json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.KEY_ID,
        });
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Verify Payment
// app.post('/payment/verify', async (req, res) => {
//     try {
//         const { id, budget, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
//         console.log("id", id);
//         console.log("budget", budget);
//         if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//             return res.status(400).json({ error: 'Missing payment details' });
//         }

//         const sha = crypto.createHmac('sha256', process.env.KEY_SECRET);
//         sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//         const generatedSignature = sha.digest('hex');

//         if (generatedSignature !== razorpay_signature) {
//             return res.status(400).json({ error: 'Invalid payment signature' });
//         }

//         const negotiation = await Negotiation.findById(id);
//         const product = await product.findById(negotiation.productId);
//         const retailer = await retailer.findById(negotiation.retailerId);
//         const customer = await manufacturer.findById(negotiation.customerId);// Ensure correct model reference
    
//         console.log("negogiation",negotiation);
//         console.log("product",product);
//         console.log("retailer",retailer);
//         console.log("customer",customer);
        
//       if (!negotiation) {
//         return res.status(404).json({ error: 'Negotiation not found' });
//       }
  
//       if (negotiation.status !== 'accepted') {
//         return res.status(400).json({ error: 'Negotiation is not accepted' });
//       }
  
//       const newTransaction = new TransactionManufacturerRetailer({
//         buyer: retailer._id, // Retailer as buyer
//         seller: customer._id, // Manufacturer as seller
//         product_details: product._id, // Product reference
//         quantity: negotiation.quantity,
//         amount: budget,
//       });
  
//       await newTransaction.save();
//       negotiation.status = 'completed';
//       await negotiation.save();
//         res.json({
//             success: true,
//             message: 'Payment verified successfully',
//             orderId: razorpay_order_id,
//             paymentId: razorpay_payment_id,
//         });
//     } catch (error) {
//         console.error('Payment verification error:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


// Verify Payment
app.post('/payment/verify', async (req, res) => {
  try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
          return res.status(400).json({ error: 'Missing payment details' });
      }

      const sha = crypto.createHmac('sha256', process.env.KEY_SECRET);
      sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const generatedSignature = sha.digest('hex');

      if (generatedSignature !== razorpay_signature) {
          return res.status(400).json({ error: 'Invalid payment signature' });
      }

      res.json({
          success: true,
          message: 'Payment verified successfully',
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
      });
  } catch (error) {
      console.error('Payment verification error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});



const GROQ_API_KEY = process.env.GROQ_API_KEY;
console.log("groq : ", GROQ_API_KEY);


// Load CSV Data
const loadCSVData = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.csv.readFile("./Services.csv");
  
      const sheet = workbook.worksheets[0];
      const services = [];
  
      sheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          console.log("Row Data: ", row.values); // Inspect row structure
          services.push({
            name: row.getCell(2).value || "", // Ensure the correct column index
            description: row.getCell(3).value || "",
            cgstRate: row.getCell(4).value || "",
            sgstRate: row.getCell(5).value || "",
            igstRate: row.getCell(6).value || "",
            condition: row.getCell(7).value || "",
          });
        }
      });
  
      return services;
    } catch (error) {
      console.error("Error loading CSV data:", error.message);
      return [];
    }
  };
  
  // Query Groq API
  const queryGroq = async (userMessage, context) => {
    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama3-8b-8192",
          messages: [
            { role: "system", content: context },
            { role: "user", content: userMessage },
          ],
          max_tokens: 300,
        },
        {
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data.choices[0]?.message?.content || "No response from AI.";
    } catch (error) {
      console.error("Error querying Groq:", error.message);
      return "Sorry, I encountered an error.";
    }
  };
  
  // Chatbot Route
  app.post("/chat", async (req, res) => {
    try {
      const { message } = req.body;
  
      if (!message) {
        return res.status(400).json({ error: "Message is required." });
      }
  
      const services = await loadCSVData();
  
      // Search in CSV Data
      const matchedServices = services.filter((s) =>
        s.name && message.toLowerCase().includes(s.name.toLowerCase())
      );
  
      let context = "You are an assistant helping with **Government Subsidies and Tax Filing** in India.";
  
      if (matchedServices.length) {
        context += "\n\n### 📊 **Relevant Subsidies:**\n";
        matchedServices.forEach((s, index) => {
          context += `\n**${index + 1}. ${s.name}**\n`;
          context += `- **Description:** ${s.description}\n`;
          context += `- **CGST Rate:** ${s.cgstRate}%\n`;
          context += `- **SGST Rate:** ${s.sgstRate}%\n`;
          context += `- **IGST Rate:** ${s.igstRate}%\n`;
          context += `- **Condition:** ${s.condition || "None"}\n\n`;
        });
      } else {
        context += "\n\n❓ **No matching subsidies found.** Ask about a specific subsidy or tax-related query.";
      }
  
      const botResponse = await queryGroq(message, context);
      res.json({ reply: botResponse });
    } catch (error) {
      console.error("Error in /chat route:", error.message);
      res.status(500).json({ error: "Internal server error." });
    }
  });
  
  
app.use((err, req, res, next) => {
    console.error(err.stack);
    res
        .status(500)
        .json({ message: "Something went wrong!", error: err.message });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

