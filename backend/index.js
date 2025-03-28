const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res
        .status(500)
        .json({ message: "Something went wrong!", error: err.message });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

