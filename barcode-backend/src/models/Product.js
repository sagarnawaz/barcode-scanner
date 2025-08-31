import { supabase } from '../config/database.js';

export class Product {
  constructor(data = {}) {
    this.id = data.id;
    this.barcode = data.barcode;
    this.name = data.name;
    this.price = data.price;
    this.description = data.description;
    this.category = data.category;
    this.stock = data.stock;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  // Get all products
  static async getAll() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data.map(product => new Product(product));
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  }

  // Get product by ID
  static async getById(id) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return new Product(data);
    } catch (error) {
      throw new Error(`Failed to fetch product: ${error.message}`);
    }
  }

  // Get product by barcode
  static async getByBarcode(barcode) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('barcode', barcode)
        .single();
      
      if (error) throw error;
      return new Product(data);
    } catch (error) {
      throw new Error(`Failed to fetch product by barcode: ${error.message}`);
    }
  }

  // Create new product
  static async create(productData) {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single();
      
      if (error) throw error;
      return new Product(data);
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  }

  // Update product
  async update(updateData) {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', this.id)
        .select()
        .single();
      
      if (error) throw error;
      Object.assign(this, data);
      return this;
    } catch (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }
  }

  // Delete product
  async delete() {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', this.id);
      
      if (error) throw error;
      return true;
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  }

  // Search products
  static async search(query) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .order('name');
      
      if (error) throw error;
      return data.map(product => new Product(product));
    } catch (error) {
      throw new Error(`Failed to search products: ${error.message}`);
    }
  }
}
