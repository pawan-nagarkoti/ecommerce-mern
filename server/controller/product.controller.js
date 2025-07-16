const Product = require("../models/Product");
const { uploadOnCloudinary } = require("../utils/cloudinary");

// fetch all products
const fetchProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: products,
      message: "Product fetched successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

// add new product
const addProducts = async (req, res) => {
  try {
    const p = req.body;
    const img = req.file.path;
    const productImage = await uploadOnCloudinary(img);

    const productObj = {
      image: productImage?.url,
      title: p.title,
      description: p.description,
      category: p.category,
      brand: p.brand,
      price: p.price,
      salePrice: p.salePrice,
      stock: p.stock,
    };
    const newProduct = await Product.create(productObj);

    res.status(200).json({
      success: true,
      data: newProduct,
      message: "new product added succssfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

// delete all products
const deleteAllProducts = async (req, res) => {
  try {
    const deleteProducts = await Product.deleteMany({});
    res.status(200).json({
      data: deleteProducts,
      message: "Delete all Products",
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  fetchProducts,
  addProducts,
  deleteAllProducts,
};
