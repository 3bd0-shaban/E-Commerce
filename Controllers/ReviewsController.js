import Products from "../Models/Products.js";
import Reviews from "../Models/Reviews.js";
import Features from "../Utils/Features.js";
import { asyncHandler } from "./../Middlewares/asyncErrorHandler.js";
import ErrorHandler from "./../Utils/ErrorHandler.js";

export const Send_New_Review = asyncHandler(async (req, res, next) => {
  const { comment, rating } = req.body;
  if (!req.params.id) {
    return next(
      new ErrorHandler(
        "Product not founded or may be you not eligable to add a review at this product",
        400
      )
    );
  }
  if (!comment || !rating) {
    return next(
      new ErrorHandler(
        "Please add a comment and review to prosses your review",
        400
      )
    );
  }
  const AlreadyCommented = await Reviews.findOne({ user: req.user.id, product: req.params.id });
  if (AlreadyCommented) {
    return next(new ErrorHandler("You already submitted a review", 400));
  }
  const review = new Reviews({
    rating,
    comment,
    product: req.params.id,
    user: req.user.id,
  }).save()
    .then(async () => {
      const product = await Products.findByIdAndUpdate(
        req.params.id,
        {
          $inc: { numofreviews: 1, sumOfRating: rating },
        },
        { new: true }
      );

      await Products.findByIdAndUpdate(
        req.params.id,
        {
          $set: { rating: product.sumOfRating / product.numofreviews },
        },
        { new: true }
      );
    })

  return res.json({ message: "Your review added successfully", review });
});

export const Fetch_Product_Review = asyncHandler(async (req, res, next) => {

  const resultperpage = 10;
  const features = new Features(
    Reviews.find({ product: req.params.id })
      .populate("user", "firstname lastname email"),
    req.query
  ).Pagination(resultperpage);
  const reviews = await features.query;
  if (!reviews)
    return next(
      new ErrorHandler(
        "Product not founded or may be you not eligable to add a review at this product",
        400
      )
    );
  return res.json({ status: "success", results: reviews.length, reviews });
});
export const Delete_User_Review = asyncHandler(async (req, res, next) => {
  await Reviews.deleteOne({ product: req.params.id, user: req.user.id })
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
