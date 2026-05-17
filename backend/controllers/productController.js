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
          resource_type: "auto",
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
      images: imagesUrl,
      date: Date.now(),
    };
    console.log(productData);
    const product = new productModel(productData);
    await product.save();

    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Error adding product" });
  }
};
//function for list products
const listProducts = async (req, res) => {};
//function for remove products
const removeProduct = async (req, res) => {};

//function for single product details
const singleProductDetails = async (req, res) => {};
export { addProduct, listProducts, removeProduct, singleProductDetails };
