import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

//placing order using cod
const placeOrder = async (req, res) => {
    console.log(placeOrder)
  try {
    const {  items, amount, address } = req.body;
    const userId=req.userId;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cardData: {} });
    res.status(200).json({ success: true, message: "Order placed " });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: error.message });
  }
};
const placeOrderStripe = async (req, res) => {};
const placeOrderRazorpay = async (req, res) => {};
// All orders data for admin panel
const allOrders = async (req, res) => {};
//User order data for frontend

const userOrders = async (req, res) => {
    try {
        const userId=req.userId;
        const orders=await orderModel.find({userId })
        res.status(200).json({success:true,orders})
    } catch (error) {
       console.log(error);
    res.status(404).json({ success: false, message: error.message });
    }
};
//updatre order status from admin panel
const updateStatus = async (req, res) => {};
export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
