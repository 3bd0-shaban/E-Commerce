import Products from "../Models/Products.js";
import { asyncHandler } from './../Middlewares/asyncErrorHandler.js';
import ErrorHandler from './../Utils/ErrorHandler.js';
export const Send_New_Review = asyncHandler(async (req, res, next) => {
    const { comment, rating } = req.body
    const product = await Products.findById(req.params.id).populate('reviews.user');
    if (!product) return next(new ErrorHandler('Product not founded or may be you not eligable to add a review at this product', 400));
    if (!comment || !rating) return next(new ErrorHandler('Please add a comment and review to prosses your review', 400));
    const AlreadyCommented = product.reviews.find((p) => p.user._id == req.user.id);
    if (AlreadyCommented) return next(new ErrorHandler('You already submitted a review', 400));
    await Products.findByIdAndUpdate(req.params.id, {
        $push: {
            reviews: { user: req.user.id, name: req.user.firstname + ' ' + req.user.lastname, rating, comment }
        },
        $inc: { numofreviews: 1, sumOfRating: rating },
    }, { new: true });
    const SetRating = await Products.findByIdAndUpdate(req.params.id, {
        $set: { rating: product.sumOfRating / product.numofreviews }
    }, { new: true });
    return res.json({ msg: "Your review added successfully", SetRating });
})
export const Fetch_Product_Review = asyncHandler(async (req, res, next) => {
    const reviews = await Products.findById(req.params.id);
    if (!reviews) return next(new ErrorHandler('Product not founded or may be you not eligable to add a review at this product', 400));
    return res.json(reviews);
})
export const Delete_User_Review = asyncHandler(async (req, res, next) => {

})
