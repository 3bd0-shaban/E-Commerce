import Category from "../Models/Category.js";
import { asyncHandler } from './../Middlewares/asyncErrorHandler.js';
import ErrorHandler from './../Utils/ErrorHandler.js';
import cloudinary from "../Utils/cloudinary.js";
export const Upload_Category = asyncHandler(async (req, res, next) => {
    const { category, nameOfSub, des } = req.body
    const file = req.body.image;
    if (!category || !nameOfSub || !des) {
        return next(new ErrorHandler('Please Enter All Fields', 400));
    }
    const CheckCategory = await Category.findOne({ category });
    if (CheckCategory) {
        return next(new ErrorHandler('Category Already Exist', 400));
    }
    const result = await cloudinary.uploader.upload(file, {
        folder: "E-Commerce/Category",
    });
    new Category({
        category, des,
        subcategory: [{
            nameOfSub
        }],
        image: {
            public_id: result.public_id,
            url: result.secure_url,
        }
    })
        .save()
        .then((Uploaded_Category) => {
            return res.json({ msg: 'Category added successfully' });
        }).catch(error => {
            return next(new ErrorHandler(error.message, 400));
        })
})

export const Get_All_Category = asyncHandler(async (req, res, next) => {
    const Get_Category = await Category.find()
    return res.json(Get_Category)
})
export const Get_Spicific_Category = asyncHandler(async (req, res, next) => {
    const CategoryDetals = await Category.findById(req.params.id);
    if (!CategoryDetals) return next(new ErrorHandler('Catregory do not exist', 400));
    return res.json(CategoryDetals)
})

export const Update_Category = asyncHandler(async (req, res, next) => {
    let newCategory = {}
    const { category, des, nameOfSub } = req.body
    const file = req.body.image;
    const isCategory = await Category.findById(req.params.id);
    if (!isCategory) {
        return next(new ErrorHandler('No Categpry founded with this id', 400));
    };
    const CheckCategory = await Category.findOne({ category });
    if (CheckCategory) {
        return next(new ErrorHandler('Category Already exist', 400));
    };
    if (category == '' || nameOfSub == '' || des == '') return next(new ErrorHandler('Fields can not be empty', 400));
    if (file) {
        await cloudinary.uploader.destroy(isCategory.image.public_id);
        const result = await cloudinary.uploader.upload(file, {
            folder: "E-Commerce/Category",
        });
        newCategory = {
            image: {
                public_id: result.public_id,
                url: result.secure_url,
            }
        };
    }
    const UpdatedCategory = await Category.findByIdAndUpdate(req.params.id, { category, des, newCategory, nameOfSub }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    return res.json({ msg: 'Category updated successfully' })
})
export const Delete_Category = asyncHandler(async (req, res, next) => {
    const isCategory = await Category.findById(req.params.id);
    if (!isCategory) {
        return next(new ErrorHandler('No Category founded with that ID', 400));
    };
    await Category.deleteOne({ _id: req.params.id });
    return res.json({ msg: 'Category Deleted successfully' })
})
