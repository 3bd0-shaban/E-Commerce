import express from "express";
import { Upload_Banners } from '../Controllers/FeaturesController.js'
import { auth, isAdmin } from '../Middlewares/Auth.js'
const router = express.Router();

router.post('/new', Upload_Banners);
export default router