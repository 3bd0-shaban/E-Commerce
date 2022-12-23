import express from 'express';
const Router = express.Router();
import { auth, authorizeRoles} from '../Middlewares/Auth.js'
import { Send_Issess_Report, Fetch_Issess_Report, Delete_Issess_Report } from './../Controllers/IssessController.js';

Router.post('/new', auth, Send_Issess_Report);
Router.get('/get', auth, authorizeRoles("admin"), Fetch_Issess_Report);
Router.delete('/delete/:id', auth, authorizeRoles("admin"), Delete_Issess_Report);



export default Router