import { Cart } from '../models/Cart.js';

export class CartController {
  // Get user's cart
  static async getUserCart(req, res) {
    try {
      const { userId } = req.params;
      const cartItems = await Cart.getByUserId(userId);
      
      res.json({
        success: true,
        data: cartItems,
        message: 'Cart retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        message: 'Failed to retrieve cart'
      });
    }
  }

  // Add item to cart
  static async addToCart(req, res) {
    try {
      const { userId, productId, quantity = 1 } = req.body;
      
      // Validate required fields
      if (!userId || !productId) {
        return res.status(400).json({
          success: false,
          message: 'User ID and product ID are required'
        });
      }

      if (quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Quantity must be greater than 0'
        });
      }

      const cartItem = await Cart.addToCart(userId, productId, quantity);
      
      res.status(201).json({
        success: true,
        data: cartItem,
        message: 'Item added to cart successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        message: 'Failed to add item to cart'
      });
    }
  }

  // Update cart item quantity
  static async updateCartItemQuantity(req, res) {
    try {
      const { cartItemId } = req.params;
      const { quantity } = req.body;
      
      if (!quantity || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Quantity must be greater than 0'
        });
      }

      // Get cart item first
      const cartItem = await Cart.getById(cartItemId);
      if (!cartItem) {
        return res.status(404).json({
          success: false,
          message: 'Cart item not found'
        });
      }

      const updatedCartItem = await cartItem.updateQuantity(quantity);
      
      res.json({
        success: true,
        data: updatedCartItem,
        message: 'Cart item updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        message: 'Failed to update cart item'
      });
    }
  }

  // Remove item from cart
  static async removeFromCart(req, res) {
    try {
      const { cartItemId } = req.params;
      
      // Get cart item first
      const cartItem = await Cart.getById(cartItemId);
      if (!cartItem) {
        return res.status(404).json({
          success: false,
          message: 'Cart item not found'
        });
      }

      await cartItem.removeFromCart();
      
      res.json({
        success: true,
        message: 'Item removed from cart successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        message: 'Failed to remove item from cart'
      });
    }
  }

  // Clear user's cart
  static async clearCart(req, res) {
    try {
      const { userId } = req.params;
      await Cart.clearCart(userId);
      
      res.json({
        success: true,
        message: 'Cart cleared successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        message: 'Failed to clear cart'
      });
    }
  }

  // Get cart total
  static async getCartTotal(req, res) {
    try {
      const { userId } = req.params;
      const total = await Cart.getCartTotal(userId);
      
      res.json({
        success: true,
        data: { total },
        message: 'Cart total calculated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        message: 'Failed to calculate cart total'
      });
    }
  }

  // Get cart summary (items + total)
  static async getCartSummary(req, res) {
    try {
      const { userId } = req.params;
      
      // Get cart items and total in parallel
      const [cartItems, total] = await Promise.all([
        Cart.getByUserId(userId),
        Cart.getCartTotal(userId)
      ]);
      
      res.json({
        success: true,
        data: {
          items: cartItems,
          total,
          itemCount: cartItems.length
        },
        message: 'Cart summary retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        message: 'Failed to retrieve cart summary'
      });
    }
  }
}
