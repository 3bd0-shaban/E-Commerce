import express from 'express';
const Router = express.Router();
import { auth } from '../Middlewares/Auth.js'
import { Send_New_Review, Fetch_Product_Review, Delete_User_Review } from './../Controllers/ReviewsController.js';
Router.post('/:id', auth, Send_New_Review);
Router.get('/:id', Fetch_Product_Review);
Router.delete('/:id', auth, Delete_User_Review);



export default Router