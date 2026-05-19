import jwt from "jsonwebtoken";
const authUser = async (req, res, next) => {
    // 1. Get the Authorization header
    const authHeader = req.headers.authorization;

    // 2. Check if it exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        // 3. Extract the token value after "Bearer "
        const token = authHeader.split(" ")[1];

        // 4. Verify it
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
}

// const authUser= (req, res, next) => {
//     const token=req.headers.authorization;
//     if(!authHeader || !token.startsWith("Bearer ")){
//         return res.status(401).json({success:false, message:"Unauthorized"});
//     }
//     try {
//         const token_decode=jwt.verify(token, process.env.JWT_SECRET);
//         req.body.userId=token_decode.id;
//         next();
//     } catch (error) {
//         console.log(error);
//         return res.status(401).json({success:false, message:"Invalid token"});
//     }
// }
export default authUser;