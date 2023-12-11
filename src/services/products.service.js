import { ProductsRepository } from "../repositories/products.repository";

export class ProductsService {
    ProductsRepository = new ProductsRepository();

    // 상품 생성
    createProduct = async (id, userId, title, description, status) => {
        const createdproduct = await this.ProductsRepository.createPost(
            id, userId, title, description, status
        );

        return {
            id: createdproduct.id,
            userId: createdproduct.userId,
            title: createdproduct.title,
            description: createdproduct.description,
            status: createdproduct.status,
            createdAt: createdproduct.createdAt,
            updatedAt: createdproduct.updatedAt,

        }
    }


    // 상품 목록 조회
    findAllProducts = async () => {
        const products = await this.ProductsRepository.findAllProducts();

        products.sort((a, b) => {
            return b.createdAt - a.createdAt
        });

        return products.map((product) => {
            return {
                id: product.id,
                userId: product.userId,
                title: product.title,
                status: product.status,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
            };
        });
    }

    // 상품 상세 조회
    findProductById = async(productId) => {
        const product = await this.ProductsRepository.findProductById(productId);

        if(!product){
            return null;
        }

        return {
            id: product.id,
            userId: product.userId,
            title: product.title,
            description: product.description,
            status: product.status,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        };
    };


    // 상품 수정
    updateProduct = async(productId, title, description, status) => {
        const product = await this.ProductsRepository.findProductById(productId);

        if(!product) throw new Error('상품이 존재하지 않습니다.');

        // repository에 데이터 수정 요쳥
        await this.ProductsRepository.updateProduct(productId, title, description, status);

        // 변경된 데이터 조회
        const updateProduct = await this.ProductsRepository.findProductById(productId)

        return {
            productId: updateProduct.productId,
            title: updateProduct.title,
            description: updateProduct.description,
            status: updateProduct.status,
            createdAt: updateProduct.createdAt,
            updatedAt: updateProduct.updatedAt,
        };
    };


    // 상품 삭제
    deleteProduct = async(productId) => {
        // repository에게 특정 상품 하나를 요청
        const product = await this.ProductsRepository.findProductById(productId);
        if(!product) throw new Error ('상품이 존재하지 않습니다.');

        // repository에게 삭제를 요청
        await this.ProductsRepository.deleteProduct(productId);

        return {
            productId: product.productId,
            title: product.title,
            description: product.description,
            status: product.status,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        }        
    }
}