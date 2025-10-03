const Product = require("../models/Product");

const searchProduct = async (req, res) => {
  try {
    const { keyword } = req.params;

    // const search = await Product.find({
    //   title: { $regex: keyword, $options: "i" },
    // });

    const regEx = new RegExp(keyword, "i");

    const createSearchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx },
      ],
    };

    const searchResult = await Product.find(createSearchQuery);

    res.status(200).json({
      data: searchResult,
      message: "product found",
    });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  searchProduct,
};
