const Order = require("../models/Order");
const Product = require("../models/Product");
const Review = require("../models/Review");

const fetchStats = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $count: "totalProducts",
      },
    ]);

    const reviews = await Review.aggregate([
      {
        $count: "totalReviews",
      },
    ]);

    const soldPrdouct = await Order.aggregate([
      {
        $match: { orderStatus: "Delivered" },
      },
      {
        $count: "totalSolds",
      },
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalProducts: products[0].totalProducts,
        totalReview: reviews[0].totalReviews,
        totalSoldProducts: soldPrdouct[0].totalSolds,
      },
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      message: "something is wrong",
    });
  }
};

module.exports = {
  fetchStats,
};
