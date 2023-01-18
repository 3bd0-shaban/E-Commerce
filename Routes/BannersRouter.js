import express from "express";
import {
    Upload_Banners, Get_Banners, Add_top_Banners, Add_side_Banners, Get_Top_Banners, Get_Side_Banners, Delete_Banner
} from '../Controllers/BannersController.js'
import { auth, authorizeRoles } from '../Middlewares/Auth.js'
const router = express.Router();

router.post('/new', auth, authorizeRoles("admin"), Upload_Banners);
router.post('/new/top', auth, authorizeRoles("admin"), Add_top_Banners);
router.post('/new/side', auth, authorizeRoles("admin"), Add_side_Banners);
router.get('/get', Get_Banners);
router.get('/get/top', Get_Top_Banners);
router.get('/get/side', Get_Side_Banners);
router.delete('/delete/:id', Delete_Banner);
export default router