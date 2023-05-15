import Users from "../Models/Users.js";
import Products from "../Models/Products.js";
import { asyncHandler } from "./../Middlewares/asyncErrorHandler.js";
import ErrorHandler from "./../Utils/ErrorHandler.js";
import Reviews from "../Models/Reviews.js";
import Features from "../Utils/Features.js";

export const Fetch_Reviews = asyncHandler(async (req, res, next) => {
    const resultperpage = 10;
    const features = new Features(
        Reviews.find()
        .populate("user", "firstname lastname email")
        .populate("product", "name rating images price"),
        req.query
    ).Pagination(resultperpage);
    const reviews = await features.query;
    if (!reviews) return next(new ErrorHandler("No Reviews Founded", 400));
    return res.json({
        status: "success",
        results: reviews.length,
        reviews,
    });
});

export const Delete_Review = asyncHandler(async (req, res, next) => {
    await Reviews.deleteOne(req.params.id)
        .then(() => {
            return res.json({ message: "Review Deleted !" });
        })
        .catch(() => {
            return next(
                new ErrorHandler(
                    "Product not founded or may be you not eligable to delete this review",
                    400
                )
            );
        });
});
