const jwt = require("jsonwebtoken");
const Manufacturer = require("../models/manufacturer");
const Retailer = require("../models/retailer");
const Supplier = require("../models/raw_material_seller");

const register = async (req, res) => {
    const { email, name, password, type, address, phone_number ,typeOfManufacturer} = req.body;
    console.log("req.body",req.body);
    if (!email || !name || !password || !type || !address || !phone_number) {
        console.log("Please provide all the required fields")
        return res.status(400).json({message:"Please provide all the required fields"})
    }
    if (type == "manufacturer") {
        const manufacturer = await Manufacturer.find({ email });
        if (manufacturer.length) {
            return res.status(400).json({message:"Manufacturer already exists"})
        }
        const newManufacturer = new Manufacturer({ email, name, password, address, phone: phone_number ,typeOfManufacturer:typeOfManufacturer});
        await newManufacturer.save();
        const token = jwt.sign({newManufacturer}, process.env.JWT_SECRET, { expiresIn: "1d" });
                    console.log(token);
                    res.cookie("UserToken", token, {
                        httpOnly: true,
                        secure: false,
                        sameSite: "strict",
                        maxAge: 1000 * 60 * 60 * 24,
                    });
        return res.status(201).json({newManufacturer, message:"manufacture"})
    }
    else if (type == "retailer") {
        const retailer = await Retailer.find({ email });
        if (retailer.length) {
            return res.status(400).json({message:"User already exists"})
        }
        const newRetailer = new Retailer({ email, name, password, address, phone: phone_number });
        await newRetailer.save();
        const token = jwt.sign({newRetailer}, process.env.JWT_SECRET, { expiresIn: "1d" });
                    console.log(token);
                    res.cookie("UserToken", token, {
                        httpOnly: true,
                        secure: false,
                        sameSite: "strict",
                        maxAge: 1000 * 60 * 60 * 24,
                    });
        return res.status(201).json({newRetailer, message:"retailer"})
    }
    else if (type == "supplier") {
        const supplier = await Supplier.find({ email });
        if (supplier.length) {
            return res.status(400).json({message:"Supplier already exists"})
        }
        const newSupplier = new Supplier({ email, name, password,address,phone:phone_number });
        await newSupplier.save();
        const token = jwt.sign({newSupplier}, process.env.JWT_SECRET, { expiresIn: "1d" });
                    console.log(token);
                    res.cookie("UserToken", token, {
                        httpOnly: true,
                        secure: false,
                        sameSite: "strict",
                        maxAge: 1000 * 60 * 60 * 24,
                    });
        return res.status(201).json({newSupplier, message:"supplier"})
    }
    else {
        return res.status(400).json({message:"Invalid user type"})
    }

}

module.exports = {register};