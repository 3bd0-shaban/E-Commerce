import express from 'express';
import { Upload_Category, Update_Category, Delete_Category, Get_All_Category, Get_Spicific_Category } from "../Controllers/CategoryController.js";
const Router = express.Router();


Router.post('/new', Upload_Category);
Router.get('/get', Get_All_Category);
Router.put('/update/:id', Update_Category);
Router.get('/get/:id', Get_Spicific_Category);
Router.delete('/update/:id', Delete_Category);
export default Router