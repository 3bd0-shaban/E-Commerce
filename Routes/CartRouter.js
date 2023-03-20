import express from 'express';
const Router = express.Router();
import { auth } from '../Middlewares/Auth.js'
import { Add_New_Cart, Find_Items_In_Cart, Delete_Specific_Item_In_Cart,Delete_All_Items_In_Cart, Increment, Decrement } from '../Controllers/CartController.js';


Router.post('/', auth, Add_New_Cart);
Router.post('/increment', auth, Increment);
Router.post('/decrement', auth, Decrement);
Router.get('/', auth, Find_Items_In_Cart);
Router.post('/deleteall', auth, Delete_All_Items_In_Cart);
Router.post('/', auth, Delete_Specific_Item_In_Cart);


export default Router