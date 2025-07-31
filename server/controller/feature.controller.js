const Feature = require("../models/Feature");
const { uploadOnCloudinary } = require("../utils/cloudinary");

// add new featured image
const addNewFeatureImage = async (req, res) => {
  try {
    const img = req.file.path;
    const featureImage = await uploadOnCloudinary(img); // create image url
    const newFeatureImage = await Feature.create({ image: featureImage.url });
    res.status(200).json({
      data: newFeatureImage,
      message: "Added feature image",
    });
  } catch (error) {
    console.log(error.message);
  }
};

// fetch all featured images
const fetchFeaturedImages = async (req, res) => {
  try {
    const fetchImages = await Feature.find({}).sort({ createdAt: -1 });
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

// delete all featured images
const deleteAllFeaturedImage = async (req, res) => {
  try {
    const deleteAllFeatureImages = await Feature.deleteMany({});
    res.status(200).json({
      data: deleteAllFeatureImages,
      message: "Delete all featured images",
    });
  } catch (error) {
    console.log(error.message);
  }
};

// delete single fetured image
const deleteFeaturedImage = async (req, res) => {
  try {
    const deletedID = req.query.id;
    const deletedFeatureImageId = await Feature.findByIdAndDelete(deletedID);
    if (deletedFeatureImageId) {
      res.status(200).json({
        success: true,
        data: deletedFeatureImageId,
        message: "Feature image deleted",
      });
    } else {
      res.status(201).json({
        data: deletedFeatureImageId,
        message: "Not found",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: `{error message ->  ${error.message}}`,
    });
  }
};

// update
const updateFeatureImage = async (req, res) => {
  try {
    const updateID = req.query.id;
    const file = req?.file?.path;

    if (!file) {
      return res.status(400).json({
        message: "Image is missing",
      });
    }

    const featureImage = await uploadOnCloudinary(file); // create image url
    const updatedImage = await Feature.findByIdAndUpdate(
      updateID,
      { image: featureImage.url },
      { new: true } // Return the updated document
    );
    res.status(200).json({
      success: true,
      data: updatedImage,
      message: "Feature image updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: `{error message ->  ${error.message}}`,
    });
  }
};

// fetch single featured image
const fetchSingleFeaturedImage = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await Feature.findById(id);
    res.status(200).json({
      data,
      message: "fetch feature image",
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
  deleteAllFeaturedImage,
  deleteFeaturedImage,
  updateFeatureImage,
  fetchSingleFeaturedImage,
};
