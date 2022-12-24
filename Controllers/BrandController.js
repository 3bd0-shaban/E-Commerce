import Brand from "../Models/Brand.js";
import { asyncHandler } from './../Middlewares/asyncErrorHandler.js';
import ErrorHandler from './../Utils/ErrorHandler.js';
import cloudinary from "../Utils/cloudinary.js";
export const Add_New_Brand = asyncHandler(async (req, res, next) => {
    const { brand, des } = req.body
    const file = req.body.image;
    if (!brand || !des) return next(new ErrorHandler('Please fill all fields', 400));
    const CheckBrand = await Brand.findOne({ brand });
    if (CheckBrand) {
        return next(new ErrorHandler('Brand Already Exist', 400));
    }
    const result = await cloudinary.uploader.upload(file, {
        folder: "E-Commerce/Brand",
    });
    new Brand({
        brand, des,
        image: {
            public_id: result.public_id,
            url: result.secure_url,
        }
    })
        .save()
        .then(brand => {
            return res.json({ msg: 'Banner uploaded successfully', brand });
        }).catch(error => {
            return next(new ErrorHandler(error.message, 500));
        })
})
export const Fetch_All_Brands = asyncHandler(async (req, res, next) => {
    const brand = await Brand.find().limit(8);
    if (!brand) return next(new ErrorHandler('No Brand Founded', 400));
    return res.json(brand);
})
export const Get_Spicific_Brand = asyncHandler(async (req, res, next) => {
    const BrandDetails = await Brand.findById(req.params.id);
    if (!BrandDetails) return next(new ErrorHandler('Brand does not exist', 400));
    return res.json(BrandDetails)
})
export const Delete_Brand = asyncHandler(async (req, res, next) => {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
        return next(new ErrorHandler('No brand founded with that ID', 400));
    };
    await cloudinary.uploader.destroy(brand.image.public_id);
    await Brand.deleteOne({ _id: req.params.id });
    return res.json({ msg: 'Brand Deleted Successfully' });
})
export const Update_Brand = asyncHandler(async (req, res, next) => {
    const { brand, des } = req.body;
    let newImage = {};
    const file = req.body.image;
    const isBrand = await Brand.findById(req.params.id);
    if (!isBrand) {
        return next(new ErrorHandler('No Brand founded with that ID', 400));
    };
    const CheckBrand = await Brand.findOne({ brand });
    if (CheckBrand) {
        return res.status(400).json({ msg: 'Brand aleardy exists' });
    };
    if (brand == '' || des == '') return next(new ErrorHandler('Fields can not be empty', 400));
    if (file) {
        await cloudinary.uploader.destroy(isBrand.image.public_id);
        const result = await cloudinary.uploader.upload(file, {
            folder: "E-Commerce/Brand",
        });
        newImage = {
            public_id: result.public_id,
            url: result.secure_url,
        }
    }
    await Brand.findByIdAndUpdate(req.params.id, {
        brand, des, image: newImage
    }, { new: true, });
    return res.json({ msg: 'Brand updated successfully' });
})