import Products from "../Models/Products.js";
import cloudinary from "../Utils/cloudinary.js";
import Features from './../Utils/Features.js';
import Cart from './../Models/Cart.js';
import { asyncHandler } from './../Middlewares/asyncErrorHandler.js';
import ErrorHandler from './../Utils/ErrorHandler.js';
export const UploadProduct = asyncHandler(async (req, res, next) => {
    const { name, price, stock, des, brand, category, title, desOfSpics, subcategory } = req.body
    let images = [...req.body.images];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }
    const imagesLink = [];
    if (!name || !price || !stock || !des || !brand || !category || !subcategory) {
        return res.status(400).json({ msg: 'Theses field with * are requiured to process your action' });
    }
    if (name > 50) {
        return res.status(400).json({ msg: 'Name can not more than 50 characters' });
    }
    if (images.length == 0) {
        return res.status(400).json({ msg: 'No Images founded Please upload one image at least' });
    }
    if (price < 0) {
        return res.status(400).json({ msg: 'Invailed price value' });
    }
    if (stock < 0) {
        return res.status(400).json({ msg: 'Invailed Product quentity value' });
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
    await Products.create(req.body)
        .then(Uploaded_Product => {
            return res.status(200).json({
                msg: 'Product uploaded successfully', Uploaded_Product
            });
        }).catch(error => {

            return res.status(500).json({ msg: error.message })
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
    const Product = await Products.find().populate('category', 'category subcategory');
    return res.status(200).json(Product);
})
export const Fetch_ProductDetails = asyncHandler(async (req, res, next) => {
    const Product = await Products.findById(req.params.id);
    if (!Product) {
        return res.status(400).json({ msg: 'Product Not Founded' });
    } else {
        return res.json(Product);
    }
})
export const Update_Product = asyncHandler(async (req, res, next) => {
    const Product = await Products.findById(req.params.id);
    if (!Product) {
        return res.status(400).json({ msg: 'Product Not Founded with this Id' });
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
        return res.status(400).json({ msg: 'Product Not Founded with this Id' });
    } else {
        // await Products.deleteOne({ _id: req.params.id });
        await Cart.findOneAndUpdate({ 'items.product_Id': Product }, {
            $pull: {
                items: { product_Id: Product }
            }
        }, { new: true })
        return res.status(200).json({ msg: 'Product deleted successfully' });
    }
})
