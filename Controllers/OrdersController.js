import Orders from "../Models/Order.js";


export const Add_NEW_Order = async (req, res) => {
    try {
        const user = req.user
        await new Orders({
            user: user._id, address: user.address._id
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
        const userOrder = await Orders.find({ user: req.user._id })
        // .populate('user', 'firstname lastname avatar');
        return res.status(200).json({ msg: userOrder });
    } catch (error) {
        return res.status(500).json({ msg: error.message });

    }
}
