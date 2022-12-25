import Users from '../Models/Users.js';
import { asyncHandler } from './../Middlewares/asyncErrorHandler.js';
import ErrorHandler from './../Utils/ErrorHandler.js';
export const SetNewAddress = asyncHandler(async (req, res, next) => {
    let UserAddress = await Users.findOne({ _id: req.user.id });
    if (UserAddress.address.length < 1) {
        const updated_address = await Users.findByIdAndUpdate({ _id: req.user.id }, { address: req.body }, { new: true });
        return res.json({ updated_address });
    } else {
        await Users.findByIdAndUpdate({ _id: req.user.id }, {
            $push: {
                address: req.body
            }
        }, { new: true });
        return res.json({ msg: 'Added New Address' });
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
    return res.json({ msg: 'All Address deleted successfully' });
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
    return res.json({ msg: ' Address deleted ' });
})