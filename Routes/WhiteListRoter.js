import express from 'express';
const Router = express.Router();
import { auth, isAdmin } from '../Middlewares/Auth.js'
import { Add_To_WhiteList, Fetch_Product_In_WhiteList, Delete_All_User_Whitelist, Delete_User_Product_Whitelist } from './../Controllers/WhiteListController.js';

Router.post('/:id', auth, Add_To_WhiteList);
Router.get('/', auth, Fetch_Product_In_WhiteList);
Router.post('/deleteall', auth, Delete_All_User_Whitelist);
Router.post('/:id', auth, Delete_User_Product_Whitelist);



export default Router