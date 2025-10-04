const Review = require("../models/Review");

const addProductReview = async (req, res) => {
  try {
    const { userId, productId, username, reviewMessage, reviewRating } =
      req.body;

    const addReview = await Review.create({
      userId,
      productId,
      username,
      reviewMessage,
      reviewRating,
    });

    return res.status(200).json({
      data: addReview,
      message: "added review",
      success: true,
    });
  } catch (e) {
    console.log(e.message);
  }
};

const fetchProductReview = async (req, res) => {
  try {
    const { id } = req.params;
    const productReview = await Review.find({ productId: id }).sort({
      _id: -1,
    });
    return res.status(200).json({
      data: productReview,
      message: "Fetch product Review",
    });
  } catch (e) {
    console.log(e.message);
  }
};

const checkValidUserForReview = async (req, res) => {
  try {
    const { userId, productId } = req.query;
    const response = await Review.find({ userId, productId });
    if (response.length === 0) {
      return res.status(200).json({
        check: false,
      });
    } else {
      return res.status(200).json({
        check: true,
      });
    }
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  addProductReview,
  fetchProductReview,
  checkValidUserForReview,
};
