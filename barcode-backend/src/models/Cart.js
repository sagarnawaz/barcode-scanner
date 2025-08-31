import { supabase } from '../config/database.js';

export class Cart {
  constructor(data = {}) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.product_id = data.product_id;
    this.quantity = data.quantity;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  // Get cart items for a user
  static async getByUserId(userId) {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          products (
            id,
            name,
            price,
            barcode,
            description
          )
        `)
        .eq('user_id', userId);
      
      if (error) throw error;
      return data.map(item => new Cart(item));
    } catch (error) {
      throw new Error(`Failed to fetch cart items: ${error.message}`);
    }
  }

  // Add item to cart
  static async addToCart(userId, productId, quantity = 1) {
    try {
      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)
        .eq('product_id', productId)
        .single();

      if (existingItem) {
        // Update quantity if item exists
        const { data, error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('id', existingItem.id)
          .select()
          .single();
        
        if (error) throw error;
        return new Cart(data);
      } else {
        // Create new cart item
        const { data, error } = await supabase
          .from('cart_items')
          .insert([{
            user_id: userId,
            product_id: productId,
            quantity
          }])
          .select()
          .single();
        
        if (error) throw error;
        return new Cart(data);
      }
    } catch (error) {
      throw new Error(`Failed to add item to cart: ${error.message}`);
    }
  }

  // Update cart item quantity
  async updateQuantity(quantity) {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', this.id)
        .select()
        .single();
      
      if (error) throw error;
      Object.assign(this, data);
      return this;
    } catch (error) {
      throw new Error(`Failed to update cart item: ${error.message}`);
    }
  }

  // Remove item from cart
  async removeFromCart() {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', this.id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      throw new Error(`Failed to remove cart item: ${error.message}`);
    }
  }

  // Clear cart for a user
  static async clearCart(userId) {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);
      
      if (error) throw error;
      return true;
    } catch (error) {
      throw new Error(`Failed to clear cart: ${error.message}`);
    }
  }

  // Get cart total for a user
  static async getCartTotal(userId) {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          quantity,
          products (price)
        `)
        .eq('user_id', userId);
      
      if (error) throw error;
      
      const total = data.reduce((sum, item) => {
        return sum + (item.quantity * item.products.price);
      }, 0);
      
      return total;
    } catch (error) {
      throw new Error(`Failed to calculate cart total: ${error.message}`);
    }
  }
}
