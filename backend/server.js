import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
//App Confg
const app = express();
const port = process.env.PORT || 4000;
connectDb();
connectCloudinary();
//middlewares
app.use(express.json());
app.use(cors());
//api endpoints
app.get("/", (req, res) => {
  res.send("Api working");
});
app.use("/api/user", userRouter);
app.listen(port, (req, res) => {
  console.log(`App is listening on port ${port}`);
});
app.use("/api/product", productRouter);