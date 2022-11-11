import Orders from "../Models/Order.js";
import Users from '../Models/Users.js';


export const Add_NEW_Order = async (req, res) => {
    try {
        // console.log(req.user.cart._id)
        let userId = await Users.findOne({ _id: req.user._id }).select('address');
        let defaultAddress = userId.address.find(p => p.isDefault);
        await new Orders({
            user: req.user._id, address: defaultAddress._id, PhoneNumber: defaultAddress.PhoneNumber,orderitems:req.user.cart._id
        }).save()
            .then((Saved_Order) => {
                return res.status(200).json({ msg: 'Order Created Successfully ', Saved_Order });
            }).catch((error) => {
                return res.status(500).json({ msg: error.message });
            })
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

export const Fetch_Users_Orders = async (req, res) => {
    try {
        const userOrder = await Orders.find({ user: req.user._id }).populate('orderitems')
        // .populate('user', 'firstname lastname avatar');
        return res.status(200).json({ msg: userOrder });
    } catch (error) {
        return res.status(500).json({ msg: error.message });

    }
}
