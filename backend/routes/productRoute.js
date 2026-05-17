import express from "express";
import {
  listProducts,
  removeProduct,
  addProduct,
  singleProductDetails,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
const productRouter = express.Router();

productRouter.get("/list", listProducts);
productRouter.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct,
);
productRouter.delete("/remove", upload.none(), removeProduct);
productRouter.get("/details", singleProductDetails);
export default productRouter;
