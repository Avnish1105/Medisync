import jwt from "jsonwebtoken";
 
//Admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const { token } = req.headers; // <-- changed from atoken to token
        if (!token) {
            return res.json({ success: false, message: "Not authorized, token missing" });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        if(token_decode.email !== process.env.ADMIN_EMAIL){
              return res.json({ success: false, message: "Not authorized, token invalid" });
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default authAdmin;