import Orders from "../Models/Order.js";
import Users from '../Models/Users.js';
import Cart from "../Models/Cart.js";

export const Add_NEW_Order = async (req, res) => {
    try {
        // console.log(req.user.cart._id)
        let userId = await Users.findOne({ _id: req.user._id }).select('address');
        let Products = await Cart.findOne({ user: req.user._id }).select('purchaseprice items');
        if (!Products) return res.status(400).json({ msg: 'No products founded in cart for this user' })
        // const totalPrice = items.purchaseprice
        let defaultAddress = userId.address.find(p => p.isDefault);
        if (!userId) {
            return res.status(400).json({ msg: 'Please add address first' });
        }
        console.log(Products.items)
        await new Orders({
            user: req.user._id, address: defaultAddress._id, PhoneNumber: defaultAddress.PhoneNumber, orderitems: {
                Products: [{
                    product_Id: items.product_Id._id,
                    // quentity: items.quentity,
                    // productprice: items.totalprice
                }]
            }, totalPrice: Products.purchaseprice
        }).save()
            .then((Saved_Order) => {
                return res.status(200).json({ msg: 'Order Created Successfully ', Saved_Order });
            }).catch((error) => {
                return res.status(500).json({ msg: error.message });
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message });
    }
}

export const Fetch_Users_Orders = async (req, res) => {
    try {
        const userOrder = await Orders.find({ user: req.user._id }).populate('user', 'firstname lastname');
        // .populate('user', 'firstname lastname avatar');
        return res.status(200).json({ msg: userOrder });
    } catch (error) {
        return res.status(500).json({ msg: error.message });

    }
}
