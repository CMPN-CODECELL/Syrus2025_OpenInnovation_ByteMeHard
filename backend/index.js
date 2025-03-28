const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const crypto = require("crypto");
// const TestRouter = require("./routes/test");
// const LoginRouter = require("./routes/login");
// const SignupRouter = require("./routes/signup");
// const LogoutRouter = require("./routes/logout");
// const NewProductRouter = require("./routes/new_product");
// const router = require("./routes/supplier");
// const RawMaterialRouter = require("./routes/raw_material");
// const transactionRouter = require("./routes/addTransaction");
// const retailerRouter = require("./routes/retailer");
// // const userRouter = require("./routes/user_details")
// const negotiationRouter = require("./routes/negotiation");
// const productRouter = require("./routes/new_product");
// const AddPostRouter = require("./routes/AddPost.routes");
// const GetPostRouter = require("./routes/GetPost.route");
const cookieParser = require("cookie-parser");
const Razorpay = require("razorpay");
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

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
// app.use("/api/login", LoginRouter);
// app.use("/api/signup", SignupRouter);
// app.use("/api/logout", LogoutRouter);
// app.use("/api/product", NewProductRouter);
// app.use("/api/supplier", router);
// app.use("/api/raw_material", RawMaterialRouter);
// app.use("/api/transaction", transactionRouter);
// app.use("/api/retailer", retailerRouter);
// app.use("/api/user",userRouter)
// app.use("/api/negotiate", negotiationRouter);
// app.use("/api/posts", AddPostRouter);
// app.use("/api/posts", GetPostRouter);

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
app.use((err, req, res, next) => {
    console.error(err.stack);
    res
        .status(500)
        .json({ message: "Something went wrong!", error: err.message });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

