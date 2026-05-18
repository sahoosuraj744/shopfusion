import jwt from "jsonwebtoken";
const adminAuth = (req, res, next) => {
    try {
        const {token} = req.headers;
        if (!token) {
            return res.status(401).json({ message: "Not Authorized for Login Again" });
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (token_decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD) {
            return res.status(403).json({ message: "Not Authorized for Login Again" });
        }
        // req.user = token_decode;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}
export default adminAuth;