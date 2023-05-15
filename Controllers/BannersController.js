import Banners from "../Models/Banners.js";
import { asyncHandler } from './../Middlewares/asyncErrorHandler.js';
import ErrorHandler from './../Utils/ErrorHandler.js';
import cloudinary from "../Utils/cloudinary.js";
export const Upload_Banners = asyncHandler(async (req, res, next) => {
    const file = req.body.image;
    const banner = await Banners.find();
    if (banner.length >= 4) {
        return next(new ErrorHandler('Banners can not exeeds 4 banner', 500));
    };
    const result = await cloudinary.uploader.upload(file, {
        folder: "E-Commerce/Banners",
    });
    await new Banners({
        banners: {
            public_id: result.public_id,
            url: result.secure_url,
        }
    })
        .save()
        .then(banners => {
            return res.json({ message: 'Banner uploaded successfully' });
        }).catch(error => {
            return next(new ErrorHandler(error.message, 500));
        })
});
export const Add_top_Banners = asyncHandler(async (req, res, next) => {
    const file = req.body.imageTop;
    const banner = await Banners.find({ istop: true });
    if (banner.length >= 2) {
        return next(new ErrorHandler('Banners at top can not exeeds 2 banner', 500));
    };
    const result = await cloudinary.uploader.upload(file, {
        folder: "E-Commerce/Banners",
    });
    await new Banners({
        istop: true,
        banners: {
            public_id: result.public_id,
            url: result.secure_url,
        }
    })
        .save()
        .then(banners => {
            return res.json({ message: 'Banner uploaded successfully' });
        }).catch(error => {
            return next(new ErrorHandler(error.message, 500));
        })
});
export const Add_side_Banners = asyncHandler(async (req, res, next) => {
    const file = req.body.imageSide;
    const banner = await Banners.find({ isSide: true });
    if (banner.length >= 2) {
        return next(new ErrorHandler('Side Banners can not exeeds 2 banner', 500));
    };
    const result = await cloudinary.uploader.upload(file, {
        folder: "E-Commerce/Banners",
    });
    await new Banners({
        isSide: true,
        banners: {
            public_id: result.public_id,
            url: result.secure_url,
        }
    })
        .save()
        .then(banners => {
            return res.json({ message: 'Banner uploaded successfully' });
        }).catch(error => {
            return next(new ErrorHandler(error.message, 500));
        })
});
export const Get_Banners = asyncHandler(async (req, res, next) => {
    const banners = await Banners.find({ istop: false, isSide: false })
    return res.json(banners)
});
export const Get_Top_Banners = asyncHandler(async (req, res, next) => {
    const banners = await Banners.find({ istop: true })
    return res.json(banners)
});
export const Get_Side_Banners = asyncHandler(async (req, res, next) => {
    const banners = await Banners.find({ isSide: true })
    return res.json(banners)
});
export const Delete_Banner = asyncHandler(async (req, res, next) => {
    const banners = await Banners.findById(req.params.id);
    if (!banners) {
        return next(new ErrorHandler('Banner Not Founded with that ID', 400));
    } else {
        await cloudinary.uploader.destroy(banners.banners.public_id);
        await Banners.deleteOne({ _id: req.params.id });
        return res.json({ message: 'Banner deleted successfully' });
    }
});