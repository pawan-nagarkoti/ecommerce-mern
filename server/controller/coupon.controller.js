const Coupon = require("../models/coupon");
const Cart = require("../models/Cart");

const addCoupon = async (req, res) => {
  try {
    const c = req.body;
    const createCouponObj = {
      title: c.title,
      code: c.code,
      type: c.type,
      value: c.value,
      minimumOrder: c.minimumOrder,
      useLeft: c.useLeft,
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

const getSingleCoupon = async (req, res) => {
  try {
    const { couponId } = req.params;
    if (!couponId) {
      return res.status(400).json({
        message: "coupon id is required",
      });
    }
    const coupon = await Coupon.findById({ _id: couponId });

    if (coupon) {
      return res.status(200).json({
        success: true,
        data: coupon,
        message: "fetch single coupon",
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

const updateCoupon = async (req, res) => {
  try {
    const { couponId } = req.params;

    const {
      title,
      code,
      type,
      value,
      minimumOrder,
      useLeft,
      expireOn,
      active,
    } = req.body;

    const updatedCoupon = await Coupon.findByIdAndUpdate(
      couponId,
      {
        title,
        code,
        type,
        value,
        minimumOrder,
        useLeft,
        expireOn,
        active,
      },
      { new: true }
    );

    if (updatedCoupon) {
      return res.status(200).json({
        success: true,
        data: updatedCoupon,
        message: "coupon updated",
      });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      message: "something error",
    });
  }
};

const applyCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({
        success: false,
        message: "coupon is required",
      });
    }

    const validCoupon = await Coupon.find({ code });
    if (!validCoupon) {
      return res.status(400).json({
        success: false,
        message: "coupon is not valid",
      });
    }

    const decode = req.user;
    const cartData = await Cart.find({ uniqueID: decode.id });

    const totalAmount = cartData
      .map((v) => v.totalPrice)
      .reduce((a, v) => (a += v), 0);

    const cartTotal = Math.floor(totalAmount);

    if (cartAmount < validCoupon[0].minimumOrder) {
      return res.status(400).json({
        success: false,
        message: "Total cart ammount is less",
      });
    }

    let discountAmount;
    let totalAfterDiscount;

    if (validCoupon[0].type === "Percent") {
      // Calculate discount amount as a percentage of cart total
      discountAmount = (cartTotal * validCoupon[0].value) / 100;
    } else {
      // Fixed amount discount
      discountAmount = validCoupon[0].value;
    }

    // Calculate final total after discount
    totalAfterDiscount = Math.floor(cartTotal - discountAmount);

    return res.status(200).json({
      success: true,
      totalAfterDiscount,
      message: "discount applied",
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      success: false,
      message: "something error",
    });
  }
};

module.exports = {
  addCoupon,
  getAllCoupon,
  deleteCoupon,
  deleteAllCoupon,
  updateCoupon,
  getSingleCoupon,
  applyCoupon,
};
