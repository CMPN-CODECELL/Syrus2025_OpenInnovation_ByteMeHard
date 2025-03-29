// const jwt = require("jsonwebtoken");
// const Manufacturer = require("../models/manufacturer");
// const Retailer = require("../models/retailer");
// const Supplier = require("../models/raw_material_seller");

// const login = async (req, res) => {
//     const { email, password } = req.body;
//     console.log(email, password);
//     if (!email || !password) {
//         return res.status(400).send("Please provide all the required fields");
//     }
//     const manufacturer = await Manufacturer.find({ email });
//     const retailer = await Retailer.find({ email });
//     const supplier = await Supplier.find({ email });
//     console.log(manufacturer, retailer, supplier);
//     if (!manufacturer.length && !retailer.length && !supplier.length) {
//         return res.status(404).send("User not found");
//     }
    
//     try {
//         if (email == manufacturer[0].email) {
//             const user = manufacturer;
//             console.log(user);

//             if (user[0].password !== password) {
//                 return res.status(401).send("Invalid credentials");
//             }

//             const data = {
//                 userId: user[0]._id,
//             };
//             console.log(String(user[0]._id), data);
//             const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1d" });
//             console.log(token);
//             res.cookie("UserToken", token, {
//                 httpOnly: true,
//                 secure: false,
//                 sameSite: "strict",
//                 maxAge: 1000 * 60 * 60 * 24,
//             });

//             return res.status(200).json({
//                 username: user[0].email,
//                 message: "User logged in successfully",
//             });
//         }
//         else if(email == retailer[0].email){
//             const user = retailer;
//             console.log(user);
//             if (user[0].password !== password) {
//                 return res.status(401).send("Invalid credentials");
//             }
    
//             const data = {
//                 userId: user[0]._id,
//             };
//             console.log(String(user[0]._id), data);
//             const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1d" });
//             console.log(token);
//             res.cookie("UserToken", token, {
//                 httpOnly: true,
//                 secure: false,
//                 sameSite: "strict",
//                 maxAge: 1000 * 60 * 60 * 24,
//             });
    
//             return res.status(200).json({
//                 username: user[0].email,
//                 message: "User logged in successfully",
//             });
//         }
//         else{
//             const user = supplier;
//             console.log(user);
//             if (user[0].password !== password) {
//                 return res.status(401).send("Invalid credentials");
//             }
    
//             const data = {
//                 userId: user[0]._id,
//             };
//             console.log(String(user[0]._id), data);
//             const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1d" });
//             console.log(token);
//             res.cookie("UserToken", token, {
//                 httpOnly: true,
//                 secure: false,
//                 sameSite: "strict",
//                 maxAge: 1000 * 60 * 60 * 24,
//             });
    
//             return res.status(200).json({
//                 username: user[0].email,
//                 message: "User logged in successfully",
//             });
//         }
//     } catch (error) {
//         res.status(500).json(error.message);
//     }
// };

// module.exports = { login };

const jwt = require("jsonwebtoken");
const Manufacturer = require("../models/manufacturer");
const Retailer = require("../models/retailer");
const Supplier = require("../models/raw_material_seller");

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("Please provide all required fields");
    }

    try {
        const userTypes = [
            { model: Manufacturer, role: "manufacture" },
            { model: Retailer, role: "retailer" },
            { model: Supplier, role: "supplier" },
        ];

        let user = null;
        let role = "";

        for (const { model, role: userRole } of userTypes) {
            user = await model.findOne({ email });
            if (user) {
                role = userRole;
                break;
            }
        }

        if (!user) {
            return res.status(404).send("User not found");
        }

        if (password !== user.password) {
            return res.status(401).send("Invalid credentials");
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("UserToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        });

        return res.status(200).json({
            username: user.email,
            message: role,
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { login };
