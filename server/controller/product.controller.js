const Product = require("../models/Product");
const { uploadOnCloudinary } = require("../utils/cloudinary");

// fetch all products
const fetchProducts = async (req, res) => {
  const category = req.query.category || [];
  const brand = req.query.brand || [];
  const sortBy = req.query.sortBy || "price-lowToHigh";

  const filters = {};

  if (category.length > 0) {
    filters.category = { $in: category.split(",") };
  }

  if (brand.length > 0) {
    filters.brand = { $in: brand.split(",") };
  }

  const sort = {};

  switch (sortBy) {
    case "price-lowToHigh":
      sort.price = 1;
      break;
    case "price-highToLow":
      sort.price = -1;
      break;
    case "title-aToz":
      sort.title = 1;
      break;
    case "title-zToa":
      sort.title = -1;
      break;
    default:
      createdAt = -1;
      break;
  }

  try {
    const products = await Product.find(filters).sort(sort);
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

// delete product
const deleteProduct = async (req, res) => {
  try {
    const dp = req.query.id;
    const deletedProduct = await Product.findByIdAndDelete(dp);
    if (!deletedProduct) {
      return res.status(200).json({
        data: deletedProduct,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      data: deletedProduct,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

// update products
const updateProducts = async (req, res) => {
  try {
    const up = req.body;
    const upID = req?.query?.id;
    const img = req?.file?.path;

    const productImage = req?.body?.image
      ? req.body.image
      : await uploadOnCloudinary(img);

    const updatedProductObj = {
      title: up.title,
      description: up.description,
      category: up.category,
      brand: up.brand,
      price: up.price,
      salePrice: up.salePrice,
      stock: up.stock,
      image: req.body.image ? req.body.image : productImage.url,
    };
    const updatedProduct = await Product.findByIdAndUpdate(
      upID,
      updatedProductObj,
      { new: true }
    );

    res.status(200).json({
      data: updatedProduct,
      message: "Product updated",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// fetch single products
const fetchSingleProduct = async (req, res) => {
  const id = req.query.id;
  const response = await Product.findById(id);
  res.status(200).json({
    data: response,
    success: true,
    message: "single product fetched",
  });
  try {
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  fetchProducts,
  addProducts,
  deleteAllProducts,
  deleteProduct,
  updateProducts,
  fetchSingleProduct,
};
