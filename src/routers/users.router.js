import express from 'express';
import { needSignin } from '../../middlewares/need-signin.middleware.js';
import { UsersController } from '../controllers/users.controller.js';

const router = express.Router();

const usersController = new UsersController();



router.get('/me', usersController.getMyUserInfo());


export { router };
