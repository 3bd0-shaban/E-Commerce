import Users from "../Models/Users.js";
import Products from "../Models/Products.js";
import { asyncHandler } from './../Middlewares/asyncErrorHandler.js';
import ErrorHandler from './../Utils/ErrorHandler.js';
export const Add_To_WhiteList = asyncHandler(async (req, res, next) => {
    const productId = await Products.findById(req.params.id);
    const user = await Users.findOne(req.user._id);
    const isfounded = user.whiteList.find(p => p._id == productId);
    if (!productId) return next(new ErrorHandler('Product not founded or may be you not eligable to add a review at this product', 400));
    if (isfounded) return next(new ErrorHandler('Product already exist', 400));
    const whitelist = await Users.findByIdAndUpdate(req.user._id, {
        $push: {
            whiteList: productId
        },
    }, { new: true });
    return res.json({ msg: 'Product added to white list' });
})
export const Fetch_Product_In_WhiteList = asyncHandler(async (req, res, next) => {
    const whiteList = await Users.findOne(req.user._id).select('whiteList').populate('whiteList._id', 'name images des price');
    if (!whiteList) return next(new ErrorHandler('you do not have any products in white list', 400));
    return res.json(whiteList);
})
export const Delete_All_User_Whitelist = asyncHandler(async (req, res, next) => {
    const user = await Users.findOne(req.user._id);
    if (!user) return next(new ErrorHandler('Log in', 400));
    const whitelist = await Users.findByIdAndUpdate(req.user._id, {
        $unset: {
            whiteList: 1
        },
    }, { new: true });
    return res.json(whitelist);
})

export const Delete_User_Product_Whitelist = asyncHandler(async (req, res, next) => {
    const productId = await Products.findById(req.params.id);
    if (!productId) return next(new ErrorHandler('Product not founded', 400));
    await Users.findByIdAndUpdate(req.user._id, {
        $pull: {
            whiteList: productId
        },
    }, { new: true });
    return res.json({ msg: 'deleted successfully' });
})
