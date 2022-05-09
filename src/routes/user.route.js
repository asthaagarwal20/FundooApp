import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import {userAuth, userAuthpassword} from '../middlewares/auth.middleware';
const router = express.Router();
router.post('/login', userController.login);
router.post('/register', newUserValidator, userController.newUserRegistration);
router.post('/forgotpassword', userController.forgotpassword);
router.post('/resetpassword', userAuthpassword, userController.resetpassword);
export default router;
