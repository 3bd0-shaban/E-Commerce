
import Products from "../Models/Products.js";
export const UploadProduct = async (req, res) => {
    try {
        const { name, price, quentity, des, brand, category,image } = req.body
        if (!name || !price || !quentity || !des || !brand || !category || !image) {
            return res.status(400).json({ msg: 'Please fill all fields' });
        }
        new Products({ name, price, quentity, des, brand, category,image })
            .save()
            .then(result => {
                return res.status(200).json({ msg: 'Product uploaded successfully', result });
            }).catch(error => {
                return res.status(500).json({ msg: error.message })
            })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
export const Fetch_Products = async (req, res) => {
    try {
        const Product = await Products.find();
        return res.status(200).json(Product);
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
export const Fetch_ProductDetails = async (req, res) => {
    try {
        const Product = await Products.findById(req.params.id);
        return res.status(200).json(Product);
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
// app.get('/api/products', (req, res) => {
//     res.send(data.products)
// });
// app.get('/api/products/:id', (req, res) => {
//     const product = data.products.find(x => x.id === req.params.id);
//     if (product) {
//         res.send(product);
//     } else {
//         res.status(400).json({ msg: 'Product Not Founded' })
//     }
// });