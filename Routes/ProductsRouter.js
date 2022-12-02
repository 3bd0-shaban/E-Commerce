import express from 'express';
const ProductsRouter = express.Router();
import { UploadProduct,Fetch_Products,Fetch_ProductDetails,Update_Product,Delete_Product } from '../Controllers/ProductController.js';


ProductsRouter.post('/upload', UploadProduct);
ProductsRouter.put('/update/:id', Update_Product);
ProductsRouter.delete('/delete/:id', Delete_Product);
ProductsRouter.get('/get', Fetch_Products);
ProductsRouter.get('/get/:id', Fetch_ProductDetails);

export default ProductsRouter