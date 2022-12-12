import Orders from "../Models/Order.js";
import Users from '../Models/Users.js';
import Cart from "../Models/Cart.js";

export const Add_NEW_Order = async (req, res) => {
    try {
        let userAddress = await Users.findOne({ _id: req.user._id }).select('address');
        if (userAddress.length < 1 && !userAddress) return res.status(400).json({ msg: 'Please add address first' });
        let Products = await Cart.findOne({ user: req.user._id }).select('items').populate('items.product_Id', 'price');
        if (!Products) return res.status(400).json({ msg: 'No products founded in cart for this user' });
        let defaultAddress = userAddress.address.find(p => p.isDefault);
        let purchaseprice = 0;
        for (let i = 0; i < Products.items.length; i++) {
            purchaseprice += Products.items[i].quentity * Products.items[i].product_Id.price;
        }
        await new Orders({
            user: req.user._id, address: defaultAddress._id, PhoneNumber: defaultAddress.PhoneNumber, orderitems: Products.items,
            totalPrice: purchaseprice
        }).save()
            .then((Saved_Order) => {
                Cart.findOneAndUpdate({ user: req.user._id }, {
                    $set: { numofitems: 0 },
                    // $inc: { 'items': { 'product_Id.stock': -1 } }
                }, { new: true });
                return res.status(200).json({ msg: 'You Order Is Placed Successfully' })
            }).catch((error) => {
                return res.status(500).json({ msg: error.message });
            });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message });
    }
}

export const Fetch_Users_Orders = async (req, res) => {
    try {
        const userOrder = await Orders.find({ user: req.user._id })
            .populate('orderitems.product_Id', 'name des price images')
            .populate('user', 'firstname lastname')
        // .populate('address');
        return res.status(200).json(userOrder);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
export const Fetch_All_Orders = async (req, res) => {
    try {
        const userOrder = await Orders.find()
            .populate('orderitems.product_Id', 'name des price images')
            .populate('user', 'firstname lastname')
        // .populate('address');
        return res.status(200).json(userOrder);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
export const Fetch_Order_Details = async (req, res) => {
    try {
        const userOrder = await Orders.findById(req.params.id)
            .populate('orderitems.product_Id', 'name des price images')
            .populate('user', 'firstname lastname email')
        .populate('address');
        return res.status(200).json(userOrder);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
export const Fetch_Notprocessed_Orders = async (req, res) => {
    try {
        const userOrder = await Orders.find({ status: 'Not processed' })
            .populate('orderitems.product_Id', 'name des price images')
            .populate('user', 'firstname lastname')
            .populate('address');
        return res.status(200).json(userOrder);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
export const Fetch_Shipped_Orders = async (req, res) => {
    try {
        const userOrder = await Orders.find({ status: 'Shipped' })
            .populate('orderitems.product_Id', 'name des price images')
            .populate('user', 'firstname lastname')
        // .populate('address');
        return res.status(200).json(userOrder);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
export const Fetch_Delivered_Orders = async (req, res) => {
    try {
        const userOrder = await Orders.find({ status: 'Delivered' })
            .populate('orderitems.product_Id', 'name des price images')
            .populate('user', 'firstname lastname')
        // .populate('address');
        return res.status(200).json(userOrder);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
export const Fetch_Cancelled_Orders = async (req, res) => {
    try {
        const userOrder = await Orders.find({ status: 'Cancelled' })
            .populate('orderitems.product_Id', 'name des price images')
            .populate('user', 'firstname lastname')
        // .populate('address');
        return res.status(200).json(userOrder);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}
export const ChangeStatus = async (req, res) => {
    try {
        await Orders.findOneAndUpdate(req.params.id, {
            $set: { status: req.body.status }
        }, { new: true });
        return res.status(200).json({ msg: 'Changed Order Status Successfully' });
    } catch (error) {

    }
}
export const CancelOrder = async (req, res) => {
    try {
        await Orders.findOneAndUpdate({ user: req.user._id, id: req.params.id }, {
            $inc: { 'product_Id.stock': 1 },
            $set: { status: 'Cancelled' }
        }, { new: true });
        return res.status(200).json({ msg: 'Order Canceled Successfully' });
    } catch (error) {

    }
}

