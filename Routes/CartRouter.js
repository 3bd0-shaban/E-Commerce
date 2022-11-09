import express from 'express';
const Router = express.Router();
import { Add_New_Cart,Find_Items_In_Cart,addItem} from '../Controllers/CartController.js';


Router.post('/new', addItem);
Router.get('/get', Find_Items_In_Cart);


export default Router