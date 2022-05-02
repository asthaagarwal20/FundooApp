import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
const router = express.Router();
router.post('/login', userController.login);
router.post('/register', newUserValidator, userController.newUserRegistration);
export default router;
