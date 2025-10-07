const Order = require("../models/Order");

const addOrder = async (req, res) => {
  try {
    const {
      userId,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartItems,
      addressInfo,
    } = req.body;

    const addOrder = await Order.create({
      userId,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartItems,
      addressInfo,
    });
    return res.status(200).json({
      success: true,
      data: addOrder,
      message: "Order Added",
    });
  } catch (e) {
    console.log(e.message);
  }
};

const fetchOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const fechedOrder = await Order.find({ userId: id });
    res.status(200).json({
      success: true,
      data: fechedOrder,
      message: "order fetch successfully !",
    });
  } catch (e) {
    console.log(e.message);
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const { orderStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      {
        _id: id,
        userId: userId,
      },
      {
        orderStatus: orderStatus,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      data: updatedOrder,
      message: "successfully updated ordered",
    });
  } catch (e) {
    console.log(e.message);
  }
};

const fetchSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const singleOrder = await Order.findById(id);
    return res.status(200).json({
      success: true,
      data: singleOrder,
      message: "order fatched",
    });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  addOrder,
  fetchOrder,
  updateOrder,
  fetchSingleOrder,
};
