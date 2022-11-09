import Products from "../Models/Products.js";
import Users from '../Models/Users.js';
import Cart from "../Models/Cart.js";


export const Add_New_Cart = async (req, res) => {
  const { productId, quantity, name, price, userId } = req.body;
  // const userId = req.user.id
  try {
    let cart = await Cart.findOne({ userId }).populate('userId', '_id');
    console.log(cart)
    // let product = await Products.findById({ _id: req.params.id });
    if (cart) {
      let itemIndex = cart.products.findIndex(p => p._id == _id);
      if (itemIndex > -1) {
        let productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
      } else {
        cart.products.push({ productId, quantity, name, price });
      }
      cart = await cart.save();
      return res.status(201).json({ cart });
    } else {
      const newCart = await Cart.create({
        userId,
        products: [{ productId, quantity, name, price }]
      });

      return res.status(201).json({ msg: 'Added to cart', newCart });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const addItem = async (req, res) => {
//   try {
//     const cart = new Cart(req.body);
//     await cart.save();
//     return res.status(201).json({ msg: 'Added to cart', cart });

//   } catch (error) {
//     return res.status(500).json({ msg: error.message });
//   }
// };
export const addItem = async (req, res) => {
  try {
    let UserCart = await Users.findOne({ _id: req.body._id });
    const { product_Id } = req.body
    if (UserCart.cart.length < 1) {
      const Updated_Cart = await Users.findByIdAndUpdate({ _id: req.body._id }, { cart: { product_Id: req.body.product_Id } }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      return res.status(201).json({ Updated_Cart });
    } else {
      let ExistingCart = UserCart.cart.find(p => p.product_Id == product_Id);
      if (ExistingCart) {
        const Updated_Cart = await Users.findByIdAndUpdate({ _id: req.body._id }, {
          $inc: {
            cart: { quentity: 1 }
          }

        }, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        });
        return res.status(201).json({ msg: 'updated', Updated_Cart });
      }

      const Updated_Cart = await Users.findByIdAndUpdate({ _id: req.body._id }, {
        $push: {
          cart: { product_Id: req.body.product_Id }
        },
        // $inc: {
        //   cart: { quentity: 1 }
        // }
      }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      return res.status(201).json({ msg: 'added', Updated_Cart });
    }

  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


export const Find_Items_In_Cart = async (req, res) => {
  try {
    const item = await Cart.find()
      .populate('products', 'name des price stock rating images -_id')
      .populate('userId', 'address firstname lastname')
    return res.status(201).json({ item });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};


export const Delete_Items_In_Cart = async (req, res) => {
  try {
    await Users.findByIdAndUpdate({ _id: req.body._id }, {
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

export const removeItem = async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.body.userId);
    const productId = mongoose.Types.ObjectId(req.body.productId);
    await Cart.deleteOne({ userId: userId, productId: productId });
    res.send();
  } catch (error) {
    res.status(204).json({ msg: error.message });
  }
};

