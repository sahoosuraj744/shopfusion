import express from "express";
import {
  listProducts,
  removeProduct,
  addProduct,
  singleProductDetails,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
const productRouter = express.Router();

productRouter.get("/list", listProducts);
productRouter.post(
  "/add",adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct,
);
productRouter.delete("/remove",adminAuth, upload.none(), removeProduct);
productRouter.get("/details", singleProductDetails);
export default productRouter;
