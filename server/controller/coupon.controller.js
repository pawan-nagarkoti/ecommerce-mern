const Coupon = require("../models/coupon");

const addCoupon = async (req, res) => {
  try {
    const c = req.body;
    const createCouponObj = {
      title: c.title,
      code: c.code,
      type: c.type,
      value: c.value,
      minimumOrder: c.minimumOrder,
      useleft: c.useleft,
      expireOn: c.expireOn,
      active: c.active,
    };

    const createCoupon = await Coupon.create(createCouponObj);
    if (createCoupon) {
      return res.status(201).json({
        success: true,
        data: createCoupon,
        message: "added coupon",
      });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      message: "something is wrong",
    });
  }
};

const getAllCoupon = async (req, res) => {
  try {
    const fetchCoupon = await Coupon.find();
    if (fetchCoupon) {
      return res.status(200).json({
        success: true,
        data: fetchCoupon,
        message: "fetch all coupon",
      });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      message: "something is wrong",
    });
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const { couponId } = req.params;

    if (!couponId) {
      return res.status(400).json({
        message: "coupon id is required",
      });
    }
    const deletedCoupon = await Coupon.findByIdAndDelete({ _id: couponId });

    if (deletedCoupon) {
      return res.status(200).json({
        success: true,
        data: deletedCoupon,
        message: "coupon deleted",
      });
    } else {
      return res.status(400).json({
        success: false,
        data: deleteCoupon,
        message: "coupon not found",
      });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      success: false,
      message: "something is wrong",
    });
  }
};

const deleteAllCoupon = async (req, res) => {
  try {
    const deletedAllCoupon = await Coupon.deleteMany({});
    return res.status(200).json({
      success: true,
      data: deletedAllCoupon,
      message: "deleted all coupon",
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      success: false,
      message: "something is wrong",
    });
  }
};

const updateCoupon = async (req, res) => {};
const getSingleCoupon = async (req, res) => {};

module.exports = {
  addCoupon,
  getAllCoupon,
  deleteCoupon,
  deleteAllCoupon,
  updateCoupon,
  getSingleCoupon,
};
