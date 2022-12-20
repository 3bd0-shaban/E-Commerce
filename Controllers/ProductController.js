import Products from "../Models/Products.js";
import cloudinary from "../Utils/cloudinary.js";
import Features from './../Utils/Features.js';
import Cart from './../Models/Cart.js';
import { asyncHandler } from './../Middlewares/asyncErrorHandler.js';
import ErrorHandler from './../Utils/ErrorHandler.js';
export const UploadProduct = asyncHandler(async (req, res, next) => {
    const { name, price, stock, des, brand, category, desOfSpics, subcategory } = req.body
    let images = [...req.body.images];
    let specifications = [...req.body.specs];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }
    const imagesLink = [];
    if (!name || !price || !stock || !des || !brand || !category || !subcategory) {
        return next(new ErrorHandler('Theses field with * are requiured to process your action', 400));
    }
    if (name > 50) {
        return next(new ErrorHandler('Name can not more than 50 characters', 400));
    }
    if (images.length == 0) {
        return next(new ErrorHandler('No Images founded Please upload one image at least', 400));
    }
    if (price < 0) {
        return next(new ErrorHandler('Invailed price value', 400));
    }
    if (stock < 0) {
        return next(new ErrorHandler('Invailed Product quentity value', 400));
    }
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
            folder: "E-Commerce/Products",
        });
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    };
    req.body.images = imagesLink;
    req.body.specs = specifications
    await Products.create(req.body)
        .then(saved => {
            return res.json({
                msg: 'Product uploaded successfully', saved
            });
        }).catch(error => {
            return next(new ErrorHandler(error.message, 500));
        })
})

// export const Fetch_Products = async (req, res,next) => {
//     try {
//         const resultperpage = 10;
//         // const productCount = await Products.countDocuments();
//         const features = new Features(Products.find(), req.query).search().Filter().Pagination(resultperpage)
//         const Product = await features.query;
//         return res.status(200).json(Product);
//     } catch (error) {
//         return res.status(500).json({ msg: error.message })
//     }
// }
export const Fetch_Products = asyncHandler(async (req, res, next) => {
    const Product = await Products.find().populate('category', 'category')
    .populate('brand','brand')
    .populate('subcategory', 'nameOfSub');
    return res.json(Product);
})
export const Fetch_ProductDetails = asyncHandler(async (req, res, next) => {
    const Product = await Products.findById(req.params.id);
    if (!Product) {
        return next(new ErrorHandler('Product Not Founded', 400));
    } else {
        return res.json(Product);
    }
})
export const Update_Product = asyncHandler(async (req, res, next) => {
    const Product = await Products.findById(req.params.id);
    if (!Product) {
        return next(new ErrorHandler('Product Not Founded with this Id', 400));
    } else {
        const Product = await Products.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useUnified: true,
        });
        return res.json(Product);
    }
})
export const Delete_Product = asyncHandler(async (req, res, next) => {
    const Product = await Products.findById(req.params.id);
    const productincart = await Cart.find({ 'items.product_Id': Product });
    if (!Product) {
        return next(new ErrorHandler('Product Not Founded with this Id', 400));
    } else {
        // await Products.deleteOne({ _id: req.params.id });
        await Cart.findOneAndUpdate({ 'items.product_Id': Product }, {
            $pull: {
                items: { product_Id: Product }
            }
        }, { new: true })
        return res.json({ msg: 'Product deleted successfully' });
    }
})
