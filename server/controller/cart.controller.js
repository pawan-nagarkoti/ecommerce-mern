const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");
const { Types } = require("mongoose");

const addToCart = async (req, res) => {
  try {
    const { userID, productID, price } = req.body;

    if (!Types.ObjectId.isValid(productID)) {
      return res.status(400).json({ message: "Invalid product id format" });
    }
    if (!Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: "Invalid user id format" });
    }

    const [product, user] = await Promise.all([
      Product.findById(productID),
      User.findById(userID),
    ]);

    if (!product) {
      return res.status(400).json({ message: "Product is not available" });
    }
    if (!user) {
      return res.status(400).json({ message: "User is not available" });
    }

    const hasMatchDataOnCart = await Cart.findOne({
      uniqueID: userID,
      productID,
    });

    if (!hasMatchDataOnCart) {
      const obj = {
        uniqueID: userID,
        productID,
        quantity: 1,
        price,
        totalPrice: price * 1,
      };
      const cartIteam = await Cart.create(obj);
      return res.status(200).json({
        data: cartIteam,
        message: "successfully added cart iteam",
      });
    } else {
      const findQuntity = await Cart.findOne({ uniqueID: userID, productID });

      if (findQuntity.quantity >= 5) {
        res.status(500).json({
          message: "more than 5 are not allowed",
        });
      } else {
        const updatedQuntity = await Cart.findOneAndUpdate(
          { uniqueID: userID, productID },
          {
            $set: {
              quantity: findQuntity.quantity + 1,
              price,
              totalPrice: (findQuntity.quantity + 1) * price,
            },
          },
          {
            new: true,
          }
        );

        res.status(200).json({
          data: updatedQuntity,
          message: "updated quntity",
        });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

const fetchCartData = async (req, res) => {
  try {
    const { id } = req.params;
    const cartData = await Cart.find({ uniqueID: id }).populate("productID");

    const totalAmount = cartData
      .map((v) => v.totalPrice)
      .reduce((a, v) => (a += v), 0);

    res.status(200).json({
      data: cartData,
      totalAmount,
      message: "Cart data successfully",
    });
  } catch (e) {
    console.log(e.message);
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const deletedID = req.params.id;

    const itemDelete = await Cart.findByIdAndDelete(deletedID);

    if (itemDelete) {
      return res.status(200).json({
        data: itemDelete,
        message: "Item deleted",
      });
    } else {
      return res.status(400).json({
        message: "Not found",
      });
    }
  } catch (e) {
    console.log(e.message);
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { id, sign, price } = req.body;
    const data = await Cart.find({ _id: id });

    switch (sign) {
      case "increment":
        const quantityIncrease = data.map((v) => v.quantity + 1);
        const cartUpdateAfterIncrement = await Cart.findByIdAndUpdate(
          id,
          {
            quantity: quantityIncrease[0],
            totalPrice: quantityIncrease * price,
          },
          { new: true }
        );
        res.status(200).json({
          data: cartUpdateAfterIncrement,
          message: "quntity increase",
        });
        break;
      case "decrement":
        const quntityDecrease = data.map((v) => v.quantity - 1);
        const cartUpdateAfterDecrement = await Cart.findByIdAndUpdate(
          id,
          {
            quantity: quntityDecrease[0],
            totalPrice: quntityDecrease * price,
          },
          { new: true }
        );
        res.status(200).json({
          data: cartUpdateAfterDecrement,
          message: "quntity decrease",
        });
        break;
      default:
        console.log("something is wrong");
        break;
    }
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  addToCart,
  fetchCartData,
  deleteCartItem,
  updateCartItem,
};
