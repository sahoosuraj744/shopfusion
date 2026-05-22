import jwt from "jsonwebtoken";
// 
const authUser = async (req, res, next) => {
    try {
        // 1. ADD THIS LOG TO SEE WHAT THE FRONTEND SENT:
        console.log("Headers received at backend:", req.headers);

        const { token } = req.headers;

        if (!token) {
            return res.json({ success: false, message: "Not Authorized. Login Again." });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
       req.userId = token_decode.id; 

        next();

    } catch (error) {
        console.log("Auth Middleware Error:", error);
        res.json({ success: false, message: error.message });
    }
}


//
export default authUser;