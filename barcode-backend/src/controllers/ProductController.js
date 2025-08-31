import { Product } from '../models/Product.js';

export class ProductController {
  // Get all products
  static async getAllProducts(req, res) {
    try {
      const products = await Product.getAll();
      res.json({
        success: true,
        data: products,
        message: 'Products retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        message: 'Failed to retrieve products'
      });
    }
  }

  // Get product by ID
  static async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.getById(id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      res.json({
        success: true,
        data: product,
        message: 'Product retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        message: 'Failed to retrieve product'
      });
    }
  }

  // Get product by barcode
  static async getProductByBarcode(req, res) {
    try {
      const { barcode } = req.params;
      const product = await Product.getByBarcode(barcode);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      res.json({
        success: true,
        data: product,
        message: 'Product retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        message: 'Failed to retrieve product'
      });
    }
  }

  // Create new product
  static async createProduct(req, res) {
    try {
      const productData = req.body;
      
      // Validate required fields
      if (!productData.barcode || !productData.name || !productData.price) {
        return res.status(400).json({
          success: false,
          message: 'Barcode, name, and price are required'
        });
      }

      // Check if product with barcode already exists
      try {
        const existingProduct = await Product.getByBarcode(productData.barcode);
        if (existingProduct) {
          return res.status(409).json({
            success: false,
            message: 'Product with this barcode already exists'
          });
        }
      } catch (error) {
        // Product doesn't exist, continue with creation
      }

      const product = await Product.create(productData);
      
      res.status(201).json({
        success: true,
        data: product,
        message: 'Product created successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        message: 'Failed to create product'
      });
    }
  }

  // Update product
  static async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const product = await Product.getById(id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      const updatedProduct = await product.update(updateData);
      
      res.json({
        success: true,
        data: updatedProduct,
        message: 'Product updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        message: 'Failed to update product'
      });
    }
  }

  // Delete product
  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      
      const product = await Product.getById(id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      await product.delete();
      
      res.json({
        success: true,
        message: 'Product deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        message: 'Failed to delete product'
      });
    }
  }

  // Search products
  static async searchProducts(req, res) {
    try {
      const { q } = req.query;
      
      if (!q) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }

      const products = await Product.search(q);
      
      res.json({
        success: true,
        data: products,
        message: 'Search completed successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
        message: 'Failed to search products'
      });
    }
  }
}
