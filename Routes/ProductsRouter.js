import express from 'express';
const ProductsRouter = express.Router();
import { UploadProduct,Fetch_Products,Fetch_ProductDetails,Update_Product,Delete_Product } from '../Controllers/ProductController.js';
import { auth, isAdmin } from '../Middlewares/Auth.js'


ProductsRouter.post('/upload',auth,isAdmin, UploadProduct);
ProductsRouter.put('/update/:id',auth,isAdmin, Update_Product);
ProductsRouter.delete('/delete/:id',auth,isAdmin, Delete_Product);
ProductsRouter.get('/get', Fetch_Products);
ProductsRouter.get('/get/:id', Fetch_ProductDetails);

export default ProductsRouter