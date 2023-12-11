import { ProductsService } from "../services/products.service";

export class ProductsController {
    productService = new ProductsService();

    // 상품 생성
    createProducts = async (req, res, next) => {
        try {
            const { id, userId, title, description, status } = req.body;

            const createProduct = await this.productService.createProduct(
                id, userId, title, description, status
            );

            return res.status(201).json({ data: createProduct });

        } catch (err) {
            next(err);
        }
    }


    // 상품 목록 조회
    getProducts = async (req, res, next) => {
        try {
            const products = await this.productService.findAllProducts();

            return res.status(200).json({ data: products });

        } catch (err) {
            next(err);
        }
    }


    // 상품 상세 조회
    getProduct = async (req, res, next) => {
        try {
            const { productId } = req.params;

            // service로
            const product = await this.productService.findProductById(productId);

            if (!product) {
                return res.status(404).json({ message: '상품이 존재하지 않습니다.' });
            }

            return res.status(200).json({ data: product });

        } catch (err) {
            next(err);
        }
    }

    // 상품 수정
    putProduct = async (req, res, next) => {
        try {
            const { productId } = req.params;
            const { title, description, status } = req.body;

            // service로
            const updateProduct = await this.productService.updateProduct(
                productId, title, description, status
            );

            return res.status(200).json({ data: updateProduct });

        } catch (err) {
            next(err);
        }
    }

    // 상품 삭제
    deleteProduct = async (req, res, next) => {
        try {
            const { productId } = req.params;

            // service로
            const deleteProduct = await this.productService.deleteProduct(productId);

            return res.status(200).json({ data: deleteProduct });

        } catch (err) {
            next(err);
        }
    }
}