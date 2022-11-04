import express from 'express';
const Router = express.Router();
import { Add_New_Cart} from '../Controllers/CartController.js';


Router.post('/new', Add_New_Cart);


export default Router