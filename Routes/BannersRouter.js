import express from "express";
import {
    Upload_Banners, Get_Banners, Add_top_Banners, Add_side_Banners, Get_Top_Banners, Get_Side_Banners, Delete_Banner
} from '../Controllers/BannersController.js'
import { auth, isAdmin } from '../Middlewares/Auth.js'
const router = express.Router();

router.post('/', auth, isAdmin, Upload_Banners);
router.post('/top', auth, isAdmin, Add_top_Banners);
router.post('/side', auth, isAdmin, Add_side_Banners);
router.get('/', Get_Banners);
router.get('/top', Get_Top_Banners);
router.get('/side', Get_Side_Banners);
router.delete('/:id', Delete_Banner);
export default router