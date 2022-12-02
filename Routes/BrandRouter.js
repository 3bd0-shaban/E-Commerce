import express from 'express';
const Router = express.Router();
import { auth } from '../Middlewares/Auth.js'
import { Add_New_Brand, Fetch_All_Brands, Get_Spicific_Brand, Delete_Brand } from './../Controllers/BrandController.js';
Router.post('/new', auth, Add_New_Brand);
Router.get('/get', Fetch_All_Brands);
Router.get('/get/:id', Get_Spicific_Brand);
Router.delete('/delete/:id', auth, Delete_Brand);



export default Router