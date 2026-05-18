import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
//route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user._id);
    
      return res.status(200).json({success: true, message: "Login successful", token });
    } else {
      return res.status(400).json({ success: false, message: "Invalid Password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};
//route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    //validatiing userformat and strong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({success: false, message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be at least 8 characters long" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();
    const token = createToken(user._id);
    console.log(token);

    res.status(201).json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, message: "Registration failed" });
  }
};
//Route for admin login
const adminLogin = async (req, res) => {
  try {
    const {email,password}=req.body;
    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
        const token = jwt.sign(email+password, process.env.JWT_SECRET);
        return res.status(200).json({ success: true, message: "Admin login successful", token });
    }else{
        return res.status(400).json({ success: false, message: "Invalid admin credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Admin login failed" });
  }
};
export { loginUser, registerUser, adminLogin };
