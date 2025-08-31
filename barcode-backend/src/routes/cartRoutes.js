import express from 'express';
import { CartController } from '../controllers/CartController.js';

const router = express.Router();

// Cart routes
router.get('/cart/:userId', CartController.getUserCart);
router.get('/cart/:userId/summary', CartController.getCartSummary);
router.get('/cart/:userId/total', CartController.getCartTotal);
router.post('/cart/add', CartController.addToCart);
router.put('/cart/:cartItemId/quantity', CartController.updateCartItemQuantity);
router.delete('/cart/:cartItemId', CartController.removeFromCart);
router.delete('/cart/:userId/clear', CartController.clearCart);

export default router;
