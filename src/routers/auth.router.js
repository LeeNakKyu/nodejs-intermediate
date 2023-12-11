import express from 'express';
import { prisma } from '../utils/prisma/index.js'
//import bcrypt from 'bcrypt';
//import jwt from 'jsonwebtoken';
//import db from '../models/index.cjs';
import {
  PASSWORD_HASH_SALT_ROUNDS,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
} from '../constants/security.costant.js';
import { AuthController } from '../controllers/auth.controller.js';

const router = express.Router();
const authController = new AuthController();


// 회원가입
router.post('/signup', authController.signup);

// 로그인
router.post('/signin', authController.signin);



export { router };
