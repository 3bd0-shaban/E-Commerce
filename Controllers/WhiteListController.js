import Users from "../Models/Users.js";
import Products from "../Models/Products.js";
export const Add_To_WhiteList = async (req, res) => {
    try {
        const productId = await Products.findById(req.params.id);
        const user = await Users.findOne(req.user._id);
        const isfounded = user.whitleList.find(p => p._id == productId);
        console.log(isfounded)
        if (!productId) {
            return res.status(201).json({ msg: 'Product not founded or may be you not eligable to add a review at this product' });
        }
        if (isfounded) {
            return res.status(201).json({ msg: 'Product already exist' });
        }
        const whitelist = await Users.findByIdAndUpdate(req.user._id, {
            $push: {
                whitleList: productId
            },
        }, { new: true });
        return res.json(whitelist);
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
export const Fetch_Product_In_WhiteList = async (req, res) => {
    try {
        const whitleList = await Users.findOne(req.user._id).select('whitleList').populate('whitleList._id', 'name images des price');
        if (!whitleList) return res.status(201).json({ msg: 'you do not have any products in white list' });
        return res.json(whitleList);
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
                whitleList: 1
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
        const whitelist = await Users.findByIdAndUpdate(req.user._id, {
            $pull: {
                whitleList: productId
            },
        }, { new: true });
        return res.json(whitelist);
    } catch (error) {
        return res.status(500).json({ msg: error.message })

    }
}
