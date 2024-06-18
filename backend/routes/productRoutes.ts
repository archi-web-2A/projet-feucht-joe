import express from 'express';
import { getProducts, searchProducts } from '../controllers/productController';

const router = express.Router();

router.get('/products', getProducts);
router.get('/searchProducts', searchProducts);

export default router;
