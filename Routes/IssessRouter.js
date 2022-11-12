import express from 'express';
const Router = express.Router();
import { auth, isAdmin } from '../Middlewares/Auth.js'
import { Send_Issess_Report, Fetch_Issess_Report, Delete_Issess_Report } from './../Controllers/IssessController.js';

Router.post('/new', auth, Send_Issess_Report);
Router.get('/get', auth, isAdmin, Fetch_Issess_Report);
Router.delete('/delete/:id', auth, isAdmin, Delete_Issess_Report);



export default Router