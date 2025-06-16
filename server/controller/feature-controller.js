const Feature = require("../models/Feature");

const addNewFeatureImage = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
  }
};

// fetch all featured images
const fetchFeaturedImages = async (req, res) => {
  try {
    const fetchImages = await Feature.find({});
    res.status(200).json({
      data: fetchImages,
      message: "Feature image fetch successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: `{error message ->  ${error.message}}`,
    });
  }
};

module.exports = {
  addNewFeatureImage,
  fetchFeaturedImages,
};
