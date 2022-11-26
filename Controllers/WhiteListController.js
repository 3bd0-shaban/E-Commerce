import Users from "../Models/Users.js";
import Products from "../Models/Products.js";
export const Add_To_WhiteList = async (req, res) => {
    try {
        const productId = await Products.findById(req.params.id);
        const user = await Users.findOne(req.user._id);
        const isfounded = user.whiteList.find(p => p._id == productId);
        console.log(user)
        if (!productId) {
            return res.status(201).json({ msg: 'Product not founded or may be you not eligable to add a review at this product' });
        };
        if (isfounded) {
            return res.status(201).json({ msg: 'Product already exist' });
        }
        const whitelist = await Users.findByIdAndUpdate(req.user._id, {
            $push: {
                whiteList: productId
            },
        }, { new: true });
        return res.json(whitelist);
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
export const Fetch_Product_In_WhiteList = async (req, res) => {
    try {
        const whiteList = await Users.findOne(req.user._id).select('whiteList').populate('whiteList._id', 'name images des price');
        if (!whiteList) return res.status(201).json({ msg: 'you do not have any products in white list' });
        return res.json(whiteList);
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
export const Delete_All_User_Whitelist = async (req, res) => {
    try {
        const user = await Users.findOne(req.user._id);
        if (!user) {
            return res.status(201).json({ msg: 'Log in' });
        }
        const whitelist = await Users.findByIdAndUpdate(req.user._id, {
            $unset: {
                whiteList: 1
            },
        }, { new: true });
        return res.json(whitelist);
    } catch (error) {
        return res.status(500).json({ msg: error.message })

    }
}

export const Delete_User_Product_Whitelist = async (req, res) => {
    try {
        const productId = await Products.findById(req.params.id);
        if (!productId) {
            return res.status(201).json({ msg: 'Product not founded or may be you not eligable to add a review at this product' });
        }
        await Users.findByIdAndUpdate(req.user._id, {
            $pull: {
                whiteList: productId
            },
        }, { new: true });
        return res.json('deleted successuflly');
    } catch (error) {
        return res.status(500).json({ msg: error.message })

    }
}
