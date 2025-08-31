// Frontend API service - communicates with backend API
// Backend handles all Supabase operations

class FrontendApiService {
  constructor() {
    this.baseURL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
    this.healthURL = process.env.EXPO_PUBLIC_HEALTH_CHECK_URL || 'http://localhost:3000/health';
  }

  // Helper method for API calls
  async apiCall(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API call failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Get product by barcode from backend API
  async getProductByBarcode(barcode) {
    try {
      const result = await this.apiCall(`/products/barcode/${barcode}`);
      return result;
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Add product to database via backend API
  async createProduct(productData) {
    try {
      const result = await this.apiCall('/products', {
        method: 'POST',
        body: JSON.stringify(productData),
      });
      return result;
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Get user's cart from backend API
  async getUserCart(userId) {
    try {
      const result = await this.apiCall(`/cart/${userId}`);
      return result;
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Add item to cart via backend API
  async addToCart(userId, productId, quantity = 1) {
    try {
      const result = await this.apiCall('/cart', {
        method: 'POST',
        body: JSON.stringify({
          user_id: userId,
          product_id: productId,
          quantity: quantity,
        }),
      });
      return result;
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Update cart item quantity via backend API
  async updateCartItemQuantity(cartItemId, quantity) {
    try {
      const result = await this.apiCall(`/cart/${cartItemId}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity }),
      });
      return result;
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Remove item from cart via backend API
  async removeFromCart(cartItemId) {
    try {
      const result = await this.apiCall(`/cart/${cartItemId}`, {
        method: 'DELETE',
      });
      return result;
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Clear user's cart via backend API
  async clearCart(userId) {
    try {
      const result = await this.apiCall(`/cart/${userId}/clear`, {
        method: 'DELETE',
      });
      return result;
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Create order via backend API
  async createOrder(userId, cartItems, totalAmount) {
    try {
      const result = await this.apiCall('/orders', {
        method: 'POST',
        body: JSON.stringify({
          user_id: userId,
          total_amount: totalAmount,
          items: cartItems,
        }),
      });
      return result;
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Health check via backend API
  async checkHealth() {
    try {
      const response = await fetch(this.healthURL);
      if (!response.ok) {
        throw new Error(`Backend health check failed: ${response.status}`);
      }
      
      return {
        success: true,
        message: 'Backend API is running and healthy',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        message: 'Backend API health check failed',
        error: error.message,
      };
    }
  }

  // Search products via backend API
  async searchProducts(query) {
    try {
      const result = await this.apiCall(`/products/search?q=${encodeURIComponent(query)}`);
      return result;
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export const apiService = new FrontendApiService();
export default apiService;
