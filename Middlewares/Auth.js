import jwt from "jsonwebtoken";
import Users from '../Models/Users.js';
export const auth = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token){
            return res.status(500).json({ msg: 'not authorized' });

        }
        const verify =jwt.verify(token,process.env.JWT_SECRET);
        req.user = await Users.findById(verify.id);
        next();
    } catch (error) {
        return res.status(500).json({ msg: error.message });

    }
}
export const isAdmin = async (req, res, next) => {
    try {
        const admin = req.user && req.user.isAdmin;
        if (!admin) {
            res.status(401).json({ msg: 'Only Admin can Access this Page' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}