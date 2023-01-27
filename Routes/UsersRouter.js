import express from "express";
import {
    UserInfo, AllUsers, Get_UserInfo, Update_UserInfo, Delete_UserInfo, Update_UserRole,
} from '../Controllers/UserController.js';
import {
    SignUp, SignIn, ResetPassword, RefreshToken, verification,
    LogOut, GenerateOtp, VerifyOtp, CreateResetSession,
} from "../Controllers/AuthController.js";

import { SetNewAddress, Delete_All_Address, Delete_Spacific_Address } from '../Controllers/AddressController.js';
import { auth, authorizeRoles, LocalVariable, CheckUser, CheckVerification } from '../Middlewares/Auth.js';

const router = express.Router();

router.post('/signup', SignUp);
router.post('/signin', SignIn);

router.get('/info', auth, UserInfo);
router.get('/get/:id', auth, Get_UserInfo);
router.put('/updateuser/:id', auth, Update_UserInfo);
router.get('/refresh', RefreshToken, UserInfo);
router.post("/logout", auth, LogOut);
router.delete('/deleteuser/:id', auth, authorizeRoles("admin"), Delete_UserInfo);
router.put('/updateuserrole/:id', auth, authorizeRoles("admin"), Update_UserRole);
router.put('/verifyemail', verification);

router.get('/generateOtp', CheckUser, LocalVariable, GenerateOtp);
router.get('/verifyOtp', CheckUser, VerifyOtp);
router.get('/createResetSession', CreateResetSession);
router.put('/resetpassword', ResetPassword);

router.get('/getall', auth, authorizeRoles("admin"), AllUsers);



router.post('/newaddress', auth, SetNewAddress);
router.post('/deleteall', auth, Delete_All_Address);
router.post('/delete', auth, Delete_Spacific_Address);


export default router