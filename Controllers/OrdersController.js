import Orders from "../Models/Order.js";
import Users from '../Models/Users.js';
import Cart from "../Models/Cart.js";
import { asyncHandler } from './../Middlewares/asyncErrorHandler.js';
import ErrorHandler from './../Utils/ErrorHandler.js';
export const Add_NEW_Order = asyncHandler(async (req, res, next) => {
    let userAddress = await Users.findOne({ _id: req.user.id }).select('address');
    if (userAddress.address.length < 1 || !userAddress.address) return next(new ErrorHandler('Please Add Address First', 400));
    let Products = await Cart.findOne({ user: req.user.id }).select('items').populate('items.product_Id', 'price');
    if (!Products) return next(new ErrorHandler('No products founded in cart for this user', 400));
    let defaultAddress = userAddress.address.find(p => p.isDefault);
    if (!defaultAddress) next(new ErrorHandler('No Default user founded please add an address as default', 400));
    let purchaseprice = 0;
    for (let i = 0; i < Products.items.length; i++) {
        purchaseprice += Products.items[i].quentity * Products.items[i].product_Id.price;
    }
    await new Orders({
        user: req.user._id, address: defaultAddress._id, PhoneNumber: defaultAddress.PhoneNumber, orderitems: Products.items,
        totalPrice: purchaseprice
    }).save()
        .then((Saved_Order) => {
            Cart.findOneAndUpdate({ user: req.user.id }, {
                $set: { numofitems: 0 },
                // $inc: { 'items': { 'product_Id.stock': -1 } }
            }, { new: true });
            return res.json({ msg: 'You Order Is Placed Successfully' })
        }).catch((error) => {
            return next(new ErrorHandler(error.message, 500));
        });
});
export const Fetch_Users_Orders = asyncHandler(async (req, res, next) => {
    const userOrder = await Orders.find({ user: req.user.id })
        .populate('orderitems.product_Id', 'name des price images')
        .populate('user', 'firstname lastname')
        .populate('address'); //return null ? why
    return res.json(userOrder);
});
export const Fetch_All_Orders = asyncHandler(async (req, res, next) => {
    const userOrder = await Orders.find()
        .populate('orderitems.product_Id', 'name des price images')
        .populate('user', 'firstname lastname')
        .populate('address'); //return null ? why
    return res.json(userOrder);
});
export const Fetch_Order_Details = asyncHandler(async (req, res, next) => {
    const userOrder = await Orders.findById(req.params.id)
        .populate('orderitems.product_Id', 'name des price images')
        .populate('user', 'firstname lastname email')
        .populate('address');
    return res.json(userOrder);
});
export const Fetch_Notprocessed_Orders = asyncHandler(async (req, res, next) => {
    const userOrder = await Orders.find({ status: 'Not processed' })
        .populate('orderitems.product_Id', 'name des price images')
        .populate('user', 'firstname lastname')
        .populate('address');
    return res.json(userOrder);
});
export const Fetch_Shipped_Orders = asyncHandler(async (req, res, next) => {
    const userOrder = await Orders.find({ status: 'Shipped' })
        .populate('orderitems.product_Id', 'name des price images')
        .populate('user', 'firstname lastname')
        .populate('address');
    return res.json(userOrder);
});
export const Fetch_Delivered_Orders = asyncHandler(async (req, res, next) => {
    const userOrder = await Orders.find({ status: 'Delivered' })
        .populate('orderitems.product_Id', 'name des price images')
        .populate('user', 'firstname lastname')
        .populate('address');
    return res.json(userOrder);
});
export const Fetch_Cancelled_Orders = asyncHandler(async (req, res, next) => {
    const userOrder = await Orders.find({ status: 'Cancelled' })
        .populate('orderitems.product_Id', 'name des price images')
        .populate('user', 'firstname lastname')
        .populate('address');
    return res.json(userOrder);
});
export const ChangeStatus = asyncHandler(async (req, res, next) => {
    await Orders.findOneAndUpdate(req.params.id, {
        $set: { status: req.body.status }
    }, { new: true });
    return res.json({ msg: 'Changed Order Status Successfully' });
});
export const CancelOrder = asyncHandler(async (req, res, next) => {
    await Orders.findOneAndUpdate({ user: req.user._id, id: req.params.id }, {
        $inc: { 'product_Id.stock': 1 },
        $set: { status: 'Cancelled' }
    }, { new: true });
    return res.json({ msg: 'Order Canceled Successfully' });
});

