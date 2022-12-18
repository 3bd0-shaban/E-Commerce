import Banners from "../Models/Banners.js";
import { asyncHandler } from './../Middlewares/asyncErrorHandler.js';
import ErrorHandler from './../Utils/ErrorHandler.js';
import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({
    cloud_name: 'abdo9',
    api_key: '464953298584214',
    api_secret: 'Sbv2ng6sVzLNNLLxA9T6rmvKdtU',
    secure: true
});
export const Upload_Banners = asyncHandler(async (req, res, next) => {

    const file = req.body.image;
    // const { banners } = req.boby;
    // if (!banners) return res.status(400).json({ msg: 'Image is required to upload ' })
    // if (!file) return res.status(400).json({ msg: 'Image is required to upload ' })
    const result = await cloudinary.uploader.upload(file, {
        folder: "E-Commerce/Banners",
    });
    new Banners({
        banners: {
            public_id: result.public_id,
            url: result.secure_url,
        }
    })
        .save()
        .then(Uploaded_Banners => {
            return res.json({ msg: 'Banner uploaded successfully' });
        }).catch(error => {
            return next(new ErrorHandler(error.message, 500));
        })
})

export const Get_Banners = asyncHandler(async (req, res, next) => {
    const banners = await Banners.find()
    return res.json(banners)
})
