import express from 'express';
const Router = express.Router();
import { auth, isAdmin } from '../Middlewares/Auth.js'
import { Add_New_Brand, Fetch_All_Brands, Get_Spicific_Brand, Delete_Brand, Update_Brand } from './../Controllers/BrandController.js';
Router.post('/new', Add_New_Brand);
Router.get('/get', Fetch_All_Brands);
Router.get('/get/:id', Get_Spicific_Brand);
Router.delete('/delete/:id', auth, isAdmin, Delete_Brand);
Router.put('/update/:id', auth, isAdmin, Update_Brand);



export default Router