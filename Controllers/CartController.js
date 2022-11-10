import Products from "../Models/Products.js";
import Users from '../Models/Users.js';

export const Add_New_Cart = async (req, res) => {
  try {
    let UserCart = await Users.findOne({ _id: req.user._id });
    const { product_Id } = req.body
    if (UserCart.cart.items.length < 1) {
      const Updated_Cart = await Users.findByIdAndUpdate({ _id: req.user._id }, {
        $push: {
          // _id: Object,
          purchaseprice: 0, numofitems: 0,
          'cart.items': {
            product_Id: req.body.product_Id, quentity: 1,
          }
        }
      }, { new: true, });
      return res.status(201).json({ Updated_Cart });
    } else {
      let ExistingCart = UserCart.cart.items.find(p => p.product_Id == product_Id);
      let Product = await Users.findOne({ _id: req.user._id }).populate('cart.items.product_Id', 'stock');
      let stockQuentity = Product.cart.items.find(p => p.product_Id._id == product_Id);
      if (ExistingCart) {
        // can't increase more than the quentity in stock
        if (ExistingCart.quentity == stockQuentity.product_Id.stock) {
          return res.status(201).json({ msg: 'can not increase more' });
        }
      }
      if (ExistingCart) {
        const Updated_Cart = await Users.findOneAndUpdate({ _id: req.user._id, 'cart.items.product_Id': req.body.product_Id }, {
          $inc: { 'cart.items.$.quentity': 1 }
        }, { new: true });
        return res.status(201).json({ msg: 'updated', Updated_Cart });
      }
      const Updated_Cart = await Users.findByIdAndUpdate({ _id: req.user._id }, {
        $push: {
          'cart.items': { product_Id: req.body.product_Id, quentity: 1, }
        },
      }, { new: true, });
      return res.status(201).json({ msg: 'added', Updated_Cart });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: error.message });
  }
};

export const Increment = async (req, res) => {
  try {
    const { product_Id } = req.body
    let UserCart = await Users.findOne({ _id: req.user._id });
    let ExistingCart = UserCart.cart.items.find(p => p.product_Id == product_Id);
    let Product = await Users.findOne({ _id: req.user._id }).populate('cart.items.product_Id', 'stock');
    let stockQuentity = Product.cart.items.find(p => p.product_Id._id == product_Id);
    if (ExistingCart) {
      // can't increase more than the quentity in stock
      if (ExistingCart.quentity == stockQuentity.product_Id.stock) {
        return res.status(201).json({ msg: 'can not increase more' });
      }
      const Updated_Cart = await Users.findOneAndUpdate({ _id: req.user._id, 'cart.items.product_Id': req.body.product_Id }, {
        $inc: { 'cart.items.$.quentity': 1 }
      }, { new: true });
      return res.status(201).json({ msg: 'updated', Updated_Cart });
    }
    return res.status(201).json({ msg: 'Product not exist in cart' });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const Decrement = async (req, res) => {
  try {
    const { product_Id } = req.body
    let UserCart = await Users.findOne({ _id: req.user._id });
    let ExistingCart = UserCart.cart.items.find(p => p.product_Id == product_Id);
    if (ExistingCart) {
      if (ExistingCart.quentity < 2) {
        return res.status(201).json({ msg: 'can not decrease more' });
      }
      const Updated_Cart = await Users.findOneAndUpdate({ _id: req.user._id, 'cart.items.product_Id': req.body.product_Id }, {
        $inc: { 'cart.items.$.quentity': -1 }
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
    const User_Cart = await Users.find({ _id: req.user.id }).select('cart').populate('cart.items.product_Id', 'name des price images');
    return res.status(201).json({ msg: User_Cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};


export const Delete_Items_In_Cart = async (req, res) => {
  try {
    await Users.findByIdAndUpdate({ _id: req.user._id }, {
      $unset: {
        cart: { product_Id: req.body.product_Id }
      }
    }, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    return res.status(201).json({ msg: 'Items in cart deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(204).send();
  }
};

export const Delete_Specific_Item_In_Cart = async (req, res) => {
  try {
    await Users.findByIdAndUpdate({ _id: req.user._id }, {
      $unset: {
        cart: { product_Id: req.body.product_Id }
      }
    }, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    return res.status(201).json({ msg: 'Items in cart deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(204).send();
  }
};

// export const removeItem = async (req, res) => {
//   try {
//     const userId = mongoose.Types.ObjectId(req.use.userId);
//     const productId = mongoose.Types.ObjectId(req.body.productId);
//     await Cart.deleteOne({ userId: userId, productId: productId });
//     res.send();
//   } catch (error) {
//     res.status(204).json({ msg: error.message });
//   }
// };

