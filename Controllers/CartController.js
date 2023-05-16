import Products from "../Models/Products.js";
import { asyncHandler } from "./../Middlewares/asyncErrorHandler.js";
import ErrorHandler from "./../Utils/ErrorHandler.js";
import Cart from "../Models/Cart.js";
export const Add_New_Cart = asyncHandler(async (req, res, next) => {
    const { product_Id } = req.params;
    if (!req.params.product_Id)
        return next(new ErrorHandler("No product founded to add to cart", 400));
    let UserCart = await Cart.findOne({ user: req.user.id });
    if (!UserCart) {
        new Cart({
            user: req.user._id,
            items: { product_Id: req.params.product_Id, quentity: 1 },
            numofitems: 1,
        })
            .save()
            .then((Added_Cart) => {
                return res.json({ message: "Product Added To Cart Successfully" });
            })
            .catch((error) => {
                return next(new ErrorHandler(error.message, 500));
            });
    } else {
        let isExist = UserCart.items.find((p) => p.product_Id == product_Id);
        if (isExist) {
            return next(new ErrorHandler("Product Already Exist In our Cart", 400));
        } else {
            await Cart.findOneAndUpdate(
                { user: req.user.id },
                {
                    $inc: { numofitems: 1 },
                    $push: {
                        items: { product_Id: req.params.product_Id, quentity: 1 },
                    },
                },
                { new: true }
            );
            return res.json({ message: "Product Added To Your Cart" });
        }
    }
});

export const Increment = asyncHandler(async (req, res, next) => {
    const { product_Id } = req.params;
    let UserCart = await Cart.findOne({ user: req.user.id });
    let ProductInCart = UserCart.items.find((p) => p.product_Id == product_Id);
    let Product = await Cart.findOne({ user: req.user.id }).populate(
        "items.product_Id",
        "stock"
    );
    let stockQuentity = Product.items.find((p) => p.product_Id._id == product_Id);
    if (ProductInCart) {
        if (ProductInCart.quentity == stockQuentity.product_Id.stock) {
            return next(new ErrorHandler("Can not increase more", 400));
        }
        const Updated_Cart = await Cart.findOneAndUpdate(
            { user: req.user._id, "items.product_Id": req.params.product_Id },
            {
                $inc: { "items.$.quentity": 1 },
            },
            { new: true }
        );
        return res.json(Updated_Cart);
    }
    return next(new ErrorHandler("Product not exist in your cart", 400));
});

export const Decrement = asyncHandler(async (req, res, next) => {
    const { product_Id } = req.params;
    let UserCart = await Cart.findOne({ user: req.user.id });
    let isExist = UserCart.items.find((p) => p.product_Id == product_Id);
    if (isExist) {
        if (isExist.quentity < 2) {
            return next(new ErrorHandler("Can not decrease more", 400));
        }
        const Updated_Cart = await Cart.findOneAndUpdate(
            { user: req.user._id, "items.product_Id": req.params.product_Id },
            {
                $inc: { "items.$.quentity": -1 },
            },
            { new: true }
        );
        return res.status(201).json(Updated_Cart);
    }
    return next(new ErrorHandler("Product not exist in your cart", 400));
});

export const Find_Items_In_Cart = asyncHandler(async (req, res, next) => {
    const User_Cart = await Cart.findOne({ user: req.user.id }).populate(
        "items.product_Id",
        "name des price images"
    );
    if (!User_Cart) return next(new ErrorHandler("Cart is empty", 400));
    return res.json(User_Cart);
});
export const Delete_All_Items_In_Cart = asyncHandler(async (req, res, next) => {
    const userCart = await Cart.findOne({ user: req.user.id });
    if (!userCart)
        return next(new ErrorHandler("No cart founded for that user", 400));
    await Cart.findOneAndUpdate(
        { user: req.user.id },
        {
            $set: { numofitems: 0, items: [] },
        },
        { new: true }
    );
    return res.json({ message: "All Items in cart deleted successfully" });
});
export const Delete_Specific_Item_In_Cart = asyncHandler(
    async (req, res, next) => {
        const { product_Id } = req.params;
        const userCart = await Cart.findOne({ user: req.user.id });
        if (!userCart)
            return next(new ErrorHandler("No cart founded for that user", 400));
        const cart = userCart.items.find((p) => p.product_Id == product_Id);
        if (!cart) {
            return res
                .status(400)
                .json({ message: "No cart founded for with that id" });
        }
        await Cart.findOneAndUpdate(
            { user: req.user._id, "items.product_Id._id": req.params.product_Id },
            {
                $inc: { numofitems: -1 },
                $pull: { items: { "product_Id._id": req.params.product_Id } },
            },
            { new: true }
        );
        return res.json({ message: "Product Deleted from cart" });
    }
);
