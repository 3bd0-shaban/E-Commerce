import express from 'express';
const ProductsRouter = express.Router();
import { UploadProduct,Fetch_Products,Fetch_ProductDetails,Update_Product,Delete_Product } from '../Controllers/ProductController.js';


ProductsRouter.post('/uploadproduct', UploadProduct);
ProductsRouter.put('/product/:id', Update_Product);
ProductsRouter.delete('/product/:id', Delete_Product);
ProductsRouter.get('/fetch_products', Fetch_Products);
ProductsRouter.get('/fetch_productddetails/:id', Fetch_ProductDetails);

export default ProductsRouter