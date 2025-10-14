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

const getAllCoupon = async (req, res) => {};
const deleteCoupon = async (req, res) => {};
const deleteAllCoupon = async (req, res) => {};
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
