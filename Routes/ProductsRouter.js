import express from 'express';
const ProductsRouter = express.Router();
import {
    UploadProduct, Fetch_Products, Fetch_ProductDetails, Update_Product,
    Delete_Product, Search, Fetch_Paginated_Products, Filter, Fetch_Product_BySubCategory
} from '../Controllers/ProductController.js';
import { auth, authorizeRoles } from '../Middlewares/Auth.js'


ProductsRouter.post('/', auth, authorizeRoles("admin"), UploadProduct);
ProductsRouter.put('/:id', auth, authorizeRoles("admin"), Update_Product);
ProductsRouter.delete('/:id', auth, authorizeRoles("admin"), Delete_Product);
ProductsRouter.get('/', Fetch_Products);
ProductsRouter.get('/getsub', Fetch_Product_BySubCategory);
ProductsRouter.get('/:id', Fetch_ProductDetails);
ProductsRouter.get('/paginated', Fetch_Paginated_Products);
ProductsRouter.get('/search', Search);
ProductsRouter.get('/filter', Filter);

export default ProductsRouter