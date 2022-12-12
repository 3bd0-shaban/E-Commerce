import Products from "../Models/Products.js";
import Cart from "../Models/Cart.js";
export const Add_New_Cart = async (req, res) => {
    try {
        const { product_Id } = req.body
        if (!req.body.product_Id) return res.status(201).json({ msg: 'No product founded to add to cart ', });
        let UserCart = await Cart.findOne({ user: req.user._id });
        if (!UserCart) {
            new Cart({
                user: req.user._id, items: { product_Id: req.body.product_Id, quentity: 1 }, numofitems: 1,
            }).save()
                .then(Added_Cart => {
                    return res.status(201).json({ msg: 'Product Added To Cart Successfully', Added_Cart });
                }).catch(error => {
                    return res.status(500).json({ msg: error.message });
                });
        } else {
            let isExist = UserCart.items.find(p => p.product_Id == product_Id);
            if (isExist) {
                return res.status(400).json({ msg: 'Product Aleady Exist In Your Cart' })
            } else {
                await Cart.findOneAndUpdate({ user: req.user._id }, {
                    $inc: { numofitems: 1 },
                    $push: {
                        items: { product_Id: req.body.product_Id, quentity: 1 }
                    },
                }, { new: true });
                return res.status(201).json({ msg: 'Product Added To Cart Successfully' });
            }
        }
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

export const Increment = async (req, res) => {
    try {
        const { product_Id } = req.body
        let UserCart = await Cart.findOne({ user: req.user._id });
        let ProductInCart = UserCart.items.find(p => p.product_Id == product_Id);
        let Product = await Cart.findOne({ user: req.user._id }).populate('items.product_Id', 'stock');
        let stockQuentity = Product.items.find(p => p.product_Id._id == product_Id);
        if (ProductInCart) {
            if (ProductInCart.quentity == stockQuentity.product_Id.stock) {
                return res.status(400).json({ msg: 'Can not increase more' });
            }
            const Updated_Cart = await Cart.findOneAndUpdate({ user: req.user._id, 'items.product_Id': req.body.product_Id }, {
                $inc: { 'items.$.quentity': 1 }
            }, { new: true });
            return res.status(201).json(Updated_Cart);
        }
        return res.status(400).json({ msg: 'Product not exist in cart' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

export const Decrement = async (req, res) => {
    try {
        const { product_Id } = req.body
        let UserCart = await Cart.findOne({ user: req.user._id });
        let isExist = UserCart.items.find(p => p.product_Id == product_Id);
        if (isExist) {
            if (isExist.quentity < 2) {
                return res.status(400).json({ msg: 'Can not decrease more' });
            }
            const Updated_Cart = await Cart.findOneAndUpdate({ user: req.user._id, 'items.product_Id': req.body.product_Id }, {
                $inc: { 'items.$.quentity': -1, }
            }, { new: true });
            return res.status(201).json(Updated_Cart);
        }
        return res.status(400).json({ msg: 'Product not exist in cart' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

export const Find_Items_In_Cart = async (req, res) => {
    try {
        const User_Cart = await Cart.findOne({ user: req.user.id }).populate('items.product_Id', 'name des price images');
        if (!User_Cart) return res.status(201).json({ msg: 'Cart is empty' });
        return res.json(User_Cart);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

export const Delete_All_Items_In_Cart = async (req, res) => {
    try {
        const userCart = await Cart.findOne({ user: req.user._id });
        if (!userCart) return res.status(201).json({ msg: 'No cart founded for that user' });
        await Cart.findOneAndUpdate({ user: req.user._id }, {
            $set: { numofitems: 0, items: [] },
        }, { new: true });
        return res.status(201).json({ msg: 'All Items in cart deleted successfully' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};
export const Delete_Specific_Item_In_Cart = async (req, res) => {
    try {
        const { product_Id } = req.body
        const userCart = await Cart.findOne({ user: req.user._id });
        if (!userCart) return res.status(400).json({ msg: 'No cart founded for that user' });
        const cart = userCart.items.find(p => p.product_Id == product_Id);
        if (!cart) {
            return res.status(400).json({ msg: 'No cart founded for with that id' });
        } await Cart.findOneAndUpdate({ user: req.user._id, 'items.product_Id._id': req.body.product_Id }, {
            $inc: { numofitems: -1 },
            $pull: { 'items': { 'product_Id._id': req.body.product_Id }}
        }, { new: true });
        return res.status(201).json({ msg: 'Product Deleted from cart' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};
