import userModel from "../models/userModel.js";

//add product to usercart
const addToCart = async (req, res) => {
  try {
    const {  itemId, size } = req.body;
    const userId  = req.userId;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "Item added to cart" });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
//update user cart
const updateCart = async (req, res) => {
  try {
   
    const { itemId,  size, quantity } = req.body;
    const userId  = req.userId;

    const userData = await userModel.findById(userId);
    if(!userData){
        return res.status(404).json({ success: false, message: "User not found" });
    }
    let cartData = await userData.cartData;
   
    cartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "Cart updated" });
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message:error.message });
  }
};

//get user cart
// const getUserCart = async (req, res) => {
//   try {
//     const { userId } = req.userId;
//     const userData = await userModel.findById(userId);
//     let cartData = await userData.cartData;
//     res.status(200).json({ success: true, cartData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };
// get user cart
const getUserCart = async (req, res) => {
    try {
        const { userId } = req; // verified via your auth middleware
        const userData = await userModel.findById(userId);
        
        // 1. ADD THIS SAFETY CHECK
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        // 2. Fallback to an empty object if cartData doesn't exist yet
        let cartData = await userData.cartData || {}; 
        
        res.status(200).json({ success: true, cartData });
        
        // NOTE: toast.success() is a frontend library! 
        // Calling it here on the backend will crash if it's executed, 
        // though your code currently sends 'res' before it, terminating the block execution.
        // It's best to delete line 51 altogether.

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
//delete user cart
export { addToCart, updateCart, getUserCart };
