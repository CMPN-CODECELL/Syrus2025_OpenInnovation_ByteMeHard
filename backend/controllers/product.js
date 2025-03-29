const Product = require("../models/product");
const Manufacturer = require("../models/manufacturer");
const RawMaterial = require("../models/raw_material");
const product = require("../models/product");


// Create and Save a new Product
const createNewProduct = async (req, res) => {
    const {
        name,
        min_price,
        max_price,
        quantity,
        manufacturer,
        raw_materials,
        manufacturer_id,
    } = req.body;
    if (
        !name ||
        !min_price ||
        !max_price ||
        !quantity ||
        !manufacturer ||
        !raw_materials
    ) {
        return res.status(400).send("Please provide all the required fields");
    }

    const raw_materials_array = []
    for (const raw_material of raw_materials) {
        const raw_materialExists = await RawMaterial.findById(raw_material);
        if (!raw_materialExists) {
            return res.status(404).send("Raw material not found");
        }
        raw_materials_array.push(raw_materialExists);
    }


    const manufacturerExists = await Manufacturer.findById(manufacturer);

    const newProduct = new Product({
        name,
        max_price,
        min_price,
        quantity,
        raw_materials: raw_materials_array.map((raw_material) => raw_material._id),
        manufacturer: manufacturerExists,
    });
    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("manufacturer");
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const getProductBySearch = async (req, res) => {
  try {
    const { quantity, budget, requirements} = req.query;

    // Validate input
    // if (!quantity || !budget) {
    //   return res.status(400).json({ message: "Quantity and budget are required" });
    // }

    // Ensure inputs are numbers
    const quantityNum = Number(quantity);
    const budgetNum = Number(budget);

    if (isNaN(quantityNum) || isNaN(budgetNum)) {
      return res.status(400).json({ message: "Quantity and budget must be valid numbers" });
    }

    // Fetch products meeting the criteria
    const query = {
      quantity: { $gte: quantityNum },
      max_price: { $gte: budgetNum },
    };

    // Add text search for product name if requirements exist
    if (requirements) {
      query.name = { $regex: requirements, $options: "i" }; // Case-insensitive search
    }

    // Fetch products meeting the criteria
    const products = await product.find(query).populate("manufacturer");

    console.log("Matching Products:", products);

    if (!products.length) {
      return res.status(404).json({ message: "No matching products found" });
    }

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

  
  module.exports = { createNewProduct, getAllProducts, getProductBySearch };
  