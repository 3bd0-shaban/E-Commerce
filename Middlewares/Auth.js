import jwt from "jsonwebtoken";
import Users from '../Models/Users.js';
import ErrorHandler from './../Utils/ErrorHandler.js';
export const auth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return next(
                new ErrorHandler('You are not authorized you need to log in first', 403)
            );
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Users.findById(verify.id);
        next();
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resouce `, 403)
            );
        }
        next();
    };
};