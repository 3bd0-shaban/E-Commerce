import jwt from "jsonwebtoken";
import Users from '../Models/Users.js';
import ErrorHandler from './../Utils/ErrorHandler.js';
import { asyncHandler } from "./asyncErrorHandler.js";
export const auth = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) return next(
        new ErrorHandler('You Are Not Authorized, Please log in again', 403)
    );
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(
            new ErrorHandler('You Are Not Authorized, Please log in again', 403)
        );
        req.user = user
        next()
    })
});

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