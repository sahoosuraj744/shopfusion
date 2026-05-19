import userModel from "../models/userModel.js";
//add product to usercart
const addToCart = async (req, res) => {
    try {
        const {userId,itemId,size}=req.body;
       
        const userData=await userModel.findById(userId);
        let cartData=await userData.cartData;
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }else{
                cartData[itemId][size]=1;
            }
        }else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
        await userModel.findByIdAndUpdate(userId,{cartData});
        res.status(200).json({ success: true, message: "Item added to cart" });
        toast.success("Item added to cart");
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
//update user cart
const updateCart = async (req, res) => {
    try {
        const {userId,itemId,size,quantity}=req.body;
       
        const userData=await userModel.findById(userId);
        let cartData=await userData.cartData;
       cartData[itemId][size]=quantity;
        await userModel.findByIdAndUpdate(userId,{cartData});
        res.status(200).json({ success: true, message: "Cart updated" });
        toast.success("Cart updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

//get user cart
const getUserCart = async (req, res) => {
    try {
        const {userId}=req.body;
        const userData=await userModel.findById(userId);
        let cartData=await userData.cartData;
        res.status(200).json({ success: true, cartData });
        toast.success("Cart data fetched successfully");

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
//delete user cart
export { addToCart, updateCart, getUserCart }