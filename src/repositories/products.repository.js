import { prisma } from '../utils/prisma/index.js'

export class ProductsRepository {

    // 상품 생성
    createPost = async () => {
        const product = await prisma.products.create({
            data: {
                id: product.id,
                userId: product.userId,
                title: product.title,
                description: product.description,
                status: product.status,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
            }
        })
    }


    // 상품 목록 조회
    findAllProducts = async () => {
        const products = await prisma.products.findMany();

        return products;
    }

    // 상품 상세 조회
    findProductById = async (productId) => {
        const product = await prisma.products.findUnique({
            where: { productId: +productId },
        });

        return product;
    };


    // 상품 수정
    updateProduct = async (productId, title, description, status) => {
        // prisma에서 products 모델의 update 메서드를 이용해서 데이터 수정
        const product = await prisma.products.update({
            where: { productId: +productId },
            data: {
                title,
                description,
                status,
            }
        });

        return product;
    };


    // 상품 삭제 
    deleteProduct = async (productId) => {
        // prisma 에서 products 모델의 delete 메서드를 이용해서 데이터 삭제
        const product = await this.prisma.delete({
            where: {productId: +productId},
        });

        return product;
    }
}