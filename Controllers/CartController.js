import Products from "../Models/Products.js";
import Users from '../Models/Users.js';
import Cart from "../Models/Cart.js";
export const Add_New_Cart = async (req, res) => {
    try {
        let UserCart = await Cart.findOne({ user: req.user._id });
        let price = await Products.findOne({ _id: req.body.product_Id }).select('price');
        const purchaseprice = price.price;
        // console.log(purchaseprice)
        const { product_Id } = req.body
        if (!UserCart) {
            new Cart({
                user: req.user._id, items: { product_Id: req.body.product_Id, totalprice: purchaseprice }, numofitems: 1, purchaseprice: purchaseprice
            }).save()
                .then(Added_Cart => {
                    return res.status(201).json({ msg: 'Added Successfully', Added_Cart });
                }).catch(error => {
                    return res.status(500).json({ msg: error.message });
                });
        } else {
            let isExist = UserCart.items.find(p => p.product_Id == product_Id);
            let Product = await Cart.findOne({ user: req.user._id }).populate('items.product_Id', 'stock');
            let stockQuentity = Product.items.find(p => p.product_Id._id == product_Id);
            if (isExist) {
                // can't increase more than the quentity in stock
                if (isExist.quentity == stockQuentity.product_Id.stock) {
                    return res.status(201).json({ msg: 'can not increase more' });
                } else {
                    const Updated_Cart = await Cart.findOneAndUpdate({ user: req.user._id, 'items.product_Id': req.body.product_Id }, {
                        $inc: { 'items.$.quentity': 1 },
                        $push: {
                            'items.totalprice': purchaseprice + purchaseprice
                        },
                    }, { new: true });
                    return res.status(201).json({ msg: 'updated', Updated_Cart });
                }
            } else {
                console.log(purchaseprice);

                const Updated_Cart = await Cart.findOneAndUpdate({ user: req.user._id }, {
                    $inc: { numofitems: 1 },
                    $push: {
                        items: { product_Id: req.body.product_Id, quentity: 1, totalprice: purchaseprice }
                    },
                }, { new: true });
                return res.status(201).json({ msg: 'added', Updated_Cart });
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message });
    }
};

export const Increment = async (req, res) => {
    try {
        const { product_Id } = req.body
        let UserCart = await Cart.findOne({ user: req.user._id });
        let isExist = UserCart.items.find(p => p.product_Id == product_Id);
        let Product = await Cart.findOne({ user: req.user._id }).populate('items.product_Id', 'stock');
        let stockQuentity = Product.items.find(p => p.product_Id._id == product_Id);
        if (isExist) {
            // can't increase more than the quentity in stock
            if (isExist.quentity == stockQuentity.product_Id.stock) {
                return res.status(201).json({ msg: 'can not increase more' });
            }
            const Updated_Cart = await Cart.findOneAndUpdate({ user: req.user._id, 'items.product_Id': req.body.product_Id }, {
                $inc: { 'items.$.quentity': 1 }
            }, { new: true });
            return res.status(201).json({ msg: 'updated', Updated_Cart });
        }
        return res.status(201).json({ msg: 'Product not exist in cart' });
    } catch (error) {
        console.log(error)
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
                return res.status(201).json({ msg: 'can not decrease more' });
            }
            const Updated_Cart = await Cart.findOneAndUpdate({ user: req.user._id, 'items.product_Id': req.body.product_Id }, {
                $inc: { 'items.$.quentity': -1 }
            }, { new: true });
            return res.status(201).json({ msg: 'updated', Updated_Cart });
        }
        return res.status(201).json({ msg: 'Product not exist in cart' });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

export const Find_Items_In_Cart = async (req, res) => {
    try {
        const User_Cart = await Cart.find({ user: req.user.id }).populate('items.product_Id', 'name des price images');
        return res.status(201).json({ msg: User_Cart });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};


export const Delete_Items_In_Cart = async (req, res) => {
    try {
        await Cart.findOneAndUpdate({ user: req.user._id }, {
            $set: { numofitems: 0, purchaseprice: 0 },
            $unset: {
                items: { product_Id: req.body.product_Id }
            }
        }, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        return res.status(201).json({ msg: 'Items in cart deleted successfully' });
    } catch (error) {
        res.status(204).send();
    }
};

export const Delete_Specific_Item_In_Cart = async (req, res) => {
    try {
        await Users.findOneAndUpdate({ user: req.user._id }, {
            $inc: { numofitems: 1 },
            $unset: {
                'items': { product_Id: req.body.product_Id }
            }
        }, { new: true });
        return res.status(201).json({ msg: 'Items in cart deleted successfully' });
    } catch (error) {
        res.status(204).send();
    }
};


