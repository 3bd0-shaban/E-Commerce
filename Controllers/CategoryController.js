import Category from "../Models/Category.js";
import { asyncHandler } from './../Middlewares/asyncErrorHandler.js';
import ErrorHandler from './../Utils/ErrorHandler.js';
import cloudinary from "../Utils/cloudinary.js";
export const Upload_Category = asyncHandler(async (req, res, next) => {
    const { category, nameOfSub, des } = req.body
    const file = req.body.image;
    // if (!category || !nameOfSub || !des) {
    //     return res.status(400).json({ msg: 'Please enter all fields' });
    // }
    // const CheckCategory = await Category.findOne({ category });
    // if (CheckCategory) {
    //     return res.status(400).json({ msg: 'Category aleardy exists' });
    // }
    // const result = await cloudinary.uploader.upload(file, {
    //     folder: "E-Commerce/Category",
    // });
    new Category({
        category, des,
        subcategory: [{
            nameOfSub
        }],
        // image: {
        //     public_id: result.public_id,
        //     url: result.secure_url,
        // }
    })
        .save()
        .then((Uploaded_Category) => {
            return res.json({ msg: 'Category added successfully', Uploaded_Category });
        }).catch(error => {
            return res.status(500).json({ msg: error.message })
        })
})

export const Get_All_Category = asyncHandler(async (req, res, next) => {
    const Get_Category = await Category.find()
    return res.json(Get_Category)
})
export const Get_Spicific_Category = asyncHandler(async (req, res, next) => {
    const CategoryDetals = await Category.findById(req.params.id);
    if (!CategoryDetals) return res.status(400).json({ msg: 'Category does not exists' });
    return res.json(CategoryDetals)
})

export const Update_Category = asyncHandler(async (req, res, next) => {
    let newCategory = {}
    const { category, des, nameOfSub } = req.body
    const file = req.body.image;
    const isCategory = await Category.findById(req.params.id);
    if (!isCategory) {
        return res.status(400).json({ msg: 'No Category Founded with this ID Or something happened' });
    };
    const CheckCategory = await Category.findOne({ category });
    if (CheckCategory) {
        return res.status(400).json({ msg: 'Category aleardy exists' });
    };
    if (category == '' || nameOfSub == '' || des == '') return res.status(400).json({ msg: 'Fields can not be empty' });
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
    return res.status(200).json({ msg: 'Category updated successfully', UpdatedCategory })
})
export const Delete_Category = asyncHandler(async (req, res, next) => {
    const isCategory = await Category.findById(req.params.id);
    if (!isCategory) {
        return res.status(400).json({ msg: 'No Category Founded with this ID Or something happened' });
    };
    await Category.deleteOne({ _id: req.params.id });
    return res.status(200).json({ msg: 'Category Deleted successfully' })
})
