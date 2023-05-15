import Users from '../Models/Users.js';
import { asyncHandler } from './../Middlewares/asyncErrorHandler.js';
import ErrorHandler from './../Utils/ErrorHandler.js';
import Features from './../Utils/Features.js';
export const UserInfo = asyncHandler(async (req, res, next) => {
    const user = await Users.findOne({ _id: req.user.id });
    if (!user) {
        return next(new ErrorHandler('User Not Founded', 400));
    }
    res.json(user);
})
export const Get_UserInfo = asyncHandler(async (req, res, next) => {
    const user = await Users.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler('User Not Founded', 400));
    }
    res.json(user);
})
export const Update_UserInfo = asyncHandler(async (req, res, next) => {
    const user = await Users.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler('User Not Founded with that ID', 400));
    } else {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        return res.json(user);
    }
})
export const Update_UserRole = asyncHandler(async (req, res, next) => {
    const user = await Users.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler('User Not Founded with that ID', 400));
    } else {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body.isAdmin, {   //{$set :{isAdmin:true}}
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        return res.json({ message: 'User Updated Successfully', user });
    }
})
export const Delete_UserInfo = asyncHandler(async (req, res, next) => {
    const user = await Users.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler('User Not Founded with that ID', 400));
    } else {
        await Users.deleteOne({ _id: req.params.id });
        return res.json({ message: 'User deleted successfully' });
    }
})

export const AllUsers = asyncHandler(async (req, res, next) => {
    const resultperpage = 10;
    const features = new Features(Users.find(), req.query).Pagination(resultperpage)
    const users = await features.query;
    return res.json({ status: 'success', results: 10, users });
});
export const AllAdmins = asyncHandler(async (req, res, next) => {
    const resultperpage = 10;
    const features = new Features(Users.find({ isAdmin: true }), req.query).Pagination(resultperpage)
    const users = await features.query;
    return res.json({ status: 'success', results: 10, users });
});
