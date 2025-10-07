const Address = require("../models/Address");

const addAddress = async (req, res) => {
  try {
    const { userID, address, city, pincode, phone, notes } = req.body;
    const addAddress = await Address.create({
      userID,
      address,
      city,
      pincode,
      phone,
      notes,
    });
    return res.status(200).json({
      data: addAddress,
      message: "address added successfully",
    });
  } catch (e) {
    console.log(e.message);
  }
};

const fetchAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const fetchAddress = await Address.find({ userID: id });
    return res.status(200).json({
      data: fetchAddress,
      message: "Fetched address",
    });
  } catch (e) {
    console.log(e.message);
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAddress = await Address.findByIdAndDelete(id);

    return res.status(200).json({
      data: deletedAddress,
      message: "Address is deleted",
    });
  } catch (e) {
    console.log(e.message);
  }
};

const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { address, city, pincode, phone, notes } = req.body;
    const updatedAddressObj = {
      address,
      city,
      pincode,
      phone,
      notes,
    };
    const updatedAddress = await Address.findByIdAndUpdate(
      id,
      updatedAddressObj,
      { new: true }
    );
    return res.status(200).json({
      data: updatedAddress,
      message: "address updated",
    });
  } catch (e) {
    console.log(e.message);
  }
};

const fetchSingleAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Address.findById(id);
    console.log(data, id);
    return res.status(200).json({
      data,
      message: "Fetch single address",
    });
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  addAddress,
  fetchAddress,
  deleteAddress,
  updateAddress,
  fetchSingleAddress,
};
