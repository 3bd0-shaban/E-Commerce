import express from "express";
import { Upload_Banners, Get_Banners } from '../Controllers/BannersController.js'
import { auth, isAdmin } from '../Middlewares/Auth.js'
const router = express.Router();

router.post('/new', auth, isAdmin, Upload_Banners);
router.get('/get', Get_Banners);
export default router