import express from "express";
import {
    SignUp, SignIn, ForgotPassword, ResetPassword, UserInfo, AllUsers, RefreshToken,
    logout, LogOut, Get_UserInfo, Update_UserInfo, Delete_UserInfo, Update_UserRole
} from '../Controllers/UserController.js'
import { SetNewAddress, Delete_All_Address, Delete_Spacific_Address } from '../Controllers/AddressController.js'
import { auth, authorizeRoles } from '../Middlewares/Auth.js'
const router = express.Router();

router.post('/signup', SignUp);
router.post('/signin', SignIn);
// router.get('/verifytoken', VerifyToken,UserInfo);
router.get('/userinfo', RefreshToken, UserInfo);
router.get('/info', auth, UserInfo);
router.get('/get/:id', auth, Get_UserInfo);
router.delete('/deleteuser/:id', auth, authorizeRoles("admin"), Delete_UserInfo);
router.put('/updateuserrole/:id', auth, authorizeRoles("admin"), Update_UserRole);
router.put('/updateuser/:id', auth, Update_UserInfo);
router.get('/refresh', RefreshToken, UserInfo);
router.post("/logout", auth, LogOut);
router.post('/forgot', ForgotPassword);
router.post('/resetpassword:', ResetPassword);
router.get('/getall', auth, authorizeRoles("admin"), AllUsers);

router.post('/newaddress', auth, SetNewAddress);
router.post('/deleteall', auth, Delete_All_Address);
router.post('/delete', auth, Delete_Spacific_Address);




export default router