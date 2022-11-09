import Products from "../Models/Products.js";
import Users from '../Models/Users.js';
import Cart from "../Models/Cart.js";


export const Add_New_Cart = async (req, res) => {
  const { productId, quantity, name, price, userId } = req.body;
  // const userId = req.user.id
  try {
    let cart = await Cart.findOne({ userId: req.params.id }).populate('userId', 'firstname lastname -_id');
    // let product = await Products.findById({ _id: req.params.id });
    if (cart) {
      let itemIndex = cart.products.findIndex(p => p.productId == productId);
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
}


export const addItem = async (req, res) => {
  try {
    const cart = new Cart(req.body);
    await cart.save();
    return res.status(201).json({ msg: 'Added to cart', cart });

  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// export const addItem = async (req, res) => {
//   try {
//     const cart = new Users(req.body);
//     await cart.save();
//     return res.status(201).json({ msg: 'Added to cart', cart });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ msg: error.message });
//   }
// };

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