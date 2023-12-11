import express from 'express';
import { needSignin } from '../middlewares/need-signin.middleware.js';
import db from '../models/index.cjs';
import { ProductsController } from '../controllers/products.controller.js';
import {prisma} from '../utils/prisma/index.js'
import { ProductsRepository } from '../repositories/products.repository.js';
import { ProductsService } from '../services/products.service.js';

const router = express.Router();

const productsController = new ProductsController();
const productsRepository = new ProductsRepository();
const productsService = new ProductsService();

// 상품 생성
router.post('/product',productsController.createProducts);

// 상품 목록 조회
router.get('/products',productsController.getProducts);

// 상품 상세 조회
router.get('/products/:productId',productsController.getProduct);

// 상품 수정
router.put('/products/:productId',productsController.putProduct);

// 상품 삭제
router.delete('/products/:productId',productsController.deleteProduct);

export { router };
