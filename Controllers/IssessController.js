import Issess from "../Models/Issess.js";
import { asyncHandler } from './../Middlewares/asyncErrorHandler.js';
import ErrorHandler from './../Utils/ErrorHandler.js';
export const Send_Issess_Report = asyncHandler(async (req, res, next) => {
    const { content } = req.body
    if (!content) return next(new ErrorHandler('Please type your issess before sending', 400));
    await new Issess({
        user: req.user._id, content
    }).save()
        .then((sendedReport) => {
            return res.json(sendedReport);
        }).catch((error) => {
            return res.status(500).json({ message: error.message })
        })
})
export const Fetch_Issess_Report = asyncHandler(async (req, res, next) => {
    const issess = await Issess.find().populate('user', 'firstname lastname avatar');
    return res.json(issess);
})
export const Delete_Issess_Report = asyncHandler(async (req, res, next) => {
    const issess = await Issess.findById(req.params.id);
    if (!issess) {
        return next(new ErrorHandler('No reports founded with that ID', 400));
    } else {
        await Issess.deleteOne({ _id: req.params.id });
        return res.json({ message: 'Report deleted successfully' });
    }
})
