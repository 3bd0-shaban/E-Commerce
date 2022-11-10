import express from 'express';
import { Add_NEW_Order,Fetch_Users_Orders } from '../Controllers/OrdersController.js';
import { auth } from './../Middlewares/Auth.js';
const Router = express.Router();


Router.post('/new', auth, Add_NEW_Order);
Router.get('/getuser', auth, Fetch_Users_Orders);

export default Router