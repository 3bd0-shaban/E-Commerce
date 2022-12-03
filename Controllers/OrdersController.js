import Orders from "../Models/Order.js";
import Users from '../Models/Users.js';
import Cart from "../Models/Cart.js";

export const Add_NEW_Order = async (req, res) => {
    try {
        let userId = await Users.findOne({ _id: req.user._id }).select('address');
        if (userId.length < 1 || !userId) return res.status(400).json({ msg: 'Please add address first' });
        let Products = await Cart.findOne({ user: req.user._id }).select('purchaseprice items');
        if (!Products) return res.status(400).json({ msg: 'No products founded in cart for this user' })
        let defaultAddress = userId.address.find(p => p.isDefault);
        await new Orders({
            user: req.user._id, address: defaultAddress._id, PhoneNumber: defaultAddress.PhoneNumber, orderitems: Products.items,
            totalPrice: Products.purchaseprice
        }).save()
            .then((Saved_Order) => {
                return res.json(Saved_Order);
            }).catch((error) => {
                return res.status(500).json({ msg: error.message });
            })
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

export const Fetch_Users_Orders = async (req, res) => {
    try {
        const userOrder = await Orders.find({ user: req.user._id }).populate('orderitems.product_Id', 'name des price images')
        .populate('user', 'firstname lastname');
        return res.status(200).json(userOrder);
    } catch (error) {
        return res.status(500).json({ msg: error.message });

    }
}
