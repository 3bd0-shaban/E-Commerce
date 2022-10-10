import express from 'express';
const ProductsRouter = express.Router();
import { UploadProduct,Fetch_Products,Fetch_ProductDetails } from '../Controllers/ProductController.js';
ProductsRouter.post('/uploadproduct', UploadProduct);
ProductsRouter.get('/fetchproduts', Fetch_Products);
ProductsRouter.get('/fetch_produtddetails/:id', Fetch_ProductDetails);

export default ProductsRouter