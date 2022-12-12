import express from 'express';
import {
    Add_NEW_Order, Fetch_Users_Orders, Fetch_All_Orders,
    Fetch_Notprocessed_Orders, Fetch_Shipped_Orders,
    Fetch_Delivered_Orders, Fetch_Cancelled_Orders,
    CancelOrder, ChangeStatus, Fetch_Order_Details
} from '../Controllers/OrdersController.js';
import { auth, isAdmin } from './../Middlewares/Auth.js';
const Router = express.Router();


Router.post('/new', auth, Add_NEW_Order);
Router.get('/get/user', auth, Fetch_Users_Orders);
Router.get('/get/all', auth, isAdmin, Fetch_All_Orders);
Router.get('/:id', auth, Fetch_Order_Details);
Router.get('/get/pending', auth, isAdmin, Fetch_Notprocessed_Orders);
Router.get('/get/shipped', auth, isAdmin, Fetch_Shipped_Orders);
Router.get('/get/delivered', auth, isAdmin, Fetch_Delivered_Orders);
Router.get('/get/cancelled', auth, isAdmin, Fetch_Cancelled_Orders);
Router.put('/cancel', auth, CancelOrder);
Router.put('/change/status', auth, ChangeStatus);

export default Router