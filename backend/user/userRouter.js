import * as userController from './userController.js';
import * as authController from './authController.js';
import express from 'express';

export const router = express.Router();


router.post('/signUp',authController.signUp);
router.post('/login',authController.login);


router.get('/me',authController.protect,userController.getMe);

router.route('/')
.get(authController.protect,authController.restrictTo('admin'),userController.getUsers)

router.route('/:id')
	.patch(authController.protect,authController.restrictTo('admin'),userController.updateUser)
	.delete(authController.protect,authController.restrictTo('admin'),userController.deleteUser)
