import Products from "../Models/Products.js";

app.get('/api/products', (req, res) => {
    res.send(data.products)
});
app.get('/api/products/:id', (req, res) => {
    const product = data.products.find(x => x.id === req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(400).json({ msg: 'Product Not Founded' })
    }
});