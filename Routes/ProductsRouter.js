import express from 'express';
const ProductsRouter = express.Router();
import { UploadProduct,Fetch_Products,Fetch_ProductDetails,Update_Product,Delete_Product } from '../Controllers/ProductController.js';
import { auth, authorizeRoles} from '../Middlewares/Auth.js'


ProductsRouter.post('/new',auth,authorizeRoles("admin"), UploadProduct);
ProductsRouter.put('/update/:id',auth,authorizeRoles("admin"), Update_Product);
ProductsRouter.delete('/delete/:id',auth,authorizeRoles("admin"), Delete_Product);
ProductsRouter.get('/get', Fetch_Products);
ProductsRouter.get('/get/:id', Fetch_ProductDetails);

export default ProductsRouter