import Users from '../Models/Users.js';
import { asyncHandler } from './../Middlewares/asyncErrorHandler.js';
import ErrorHandler from './../Utils/ErrorHandler.js';
export const SetNewAddress = asyncHandler(async (req, res, next) => {
    const { city, state, zipCode, PhoneNumber, area, nearestlandmark, street, floor } = req.body
    if (!city || !state || !zipCode || !PhoneNumber || !area || !street || !floor) {
        return next(new ErrorHandler('Please Fill all fields', 400))
    }
    let UserAddress = await Users.findOne({ _id: req.user.id });
    if (UserAddress.address.length < 1) {
        await Users.findByIdAndUpdate({ _id: req.user.id },
            {
                address: {city, state, zipCode, PhoneNumber, area, nearestlandmark, street, floor, isDefault: true}
            },
            { new: true });
        return res.json({ message: 'Added New Address' });
    } else {
        await Users.findByIdAndUpdate({ _id: req.user.id }, {
            $push: {
                address: req.body
            }
        }, { new: true });
        return res.json({ message: 'Added New Address' });
    }
});

export const Delete_All_Address = asyncHandler(async (req, res, next) => {
    await Users.findByIdAndUpdate({ _id: req.user.id }, {
        $set: {
            address: []
        }
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    return res.json({ message: 'All Address deleted successfully' });
});

export const Delete_Spacific_Address = asyncHandler(async (req, res, next) => {
    const { _id } = req.body;
    const user = await Users.findOne({ _id: req.user.id });
    user.address.find(p => p._id == _id);
    await Users.findOneAndUpdate({ _id: req.user._id, AddressId: req.body._id }, {
        $pull: {
            address: req.body._id
        }
    }, { new: true, });
    return res.json({ message: ' Address deleted ' });
})