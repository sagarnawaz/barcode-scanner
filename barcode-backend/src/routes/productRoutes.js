import express from 'express';
import { ProductController } from '../controllers/ProductController.js';

const router = express.Router();

// Product routes
router.get('/products', ProductController.getAllProducts);
router.get('/products/search', ProductController.searchProducts);
router.get('/products/:id', ProductController.getProductById);
router.get('/products/barcode/:barcode', ProductController.getProductByBarcode);
router.post('/products', ProductController.createProduct);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

export default router;
