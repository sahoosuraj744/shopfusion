//function for add products
import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;
    // const image1 = req.files['image1'] ? req.files['image1'][0].path : null;
    // const image2 = req.files['image2'] ? req.files['image2'][0].path : null;
    // const image3 = req.files['image3'] ? req.files['image3'][0].path : null;
    // const image4 = req.files['image4'] ? req.files['image4'][0].path : null;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter(
      (image) => image !== undefined,
    );
    let imagesUrl = await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );
    const productData = {
      name,
      price: Number(price),
      description,
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true" ? true : false,
      image: imagesUrl,
      date: Date.now(),
    };
    console.log(productData);
    const product = new productModel(productData);
    await product.save();

    res.status(200).json({success: true, message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: "Error adding product" });
  }
};
//function for list products
const listProducts = async (req, res) => {
    try {
       const products=await productModel.find({}).sort({createdAt:-1});
       res.status(200).json({success: true, products})
    } catch (error) {
        console.error("Error listing products:", error);
        res.status(500).json({ success: false, message: "Error listing products" });
    }
};
//function for remove products
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, message: "Error removing product" });
    }
};

//function for single product details
const singleProductDetails = async (req, res) => {
    try {
     const {productId}=req.body;
     const product=await productModel.findById(productId);
     res.status(200).json({success: true, product})
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).json({ success: false, message: "Error fetching product details" });
    }
};
export { addProduct, listProducts, removeProduct, singleProductDetails };
