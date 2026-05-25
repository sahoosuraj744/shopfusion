import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
//App Confg
const app = express();
const port = process.env.PORT || 4000;
connectDb();
connectCloudinary();
//middlewares
app.use(express.json());

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "https://shopfusion-backend.vercel.app"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  }),
);
//api endpoints
app.get("/", (req, res) => {
  res.send("Api working");
});
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.listen(port, (req, res) => {
  console.log(`App is listening on port ${port}`);
});
export default app;