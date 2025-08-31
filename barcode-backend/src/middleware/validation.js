// Validation middleware for common validations

// Validate product data
export const validateProduct = (req, res, next) => {
  const { barcode, name, price } = req.body;
  
  if (!barcode || !name || !price) {
    return res.status(400).json({
      success: false,
      message: 'Barcode, name, and price are required'
    });
  }

  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Price must be a positive number'
    });
  }

  if (typeof barcode !== 'string' || barcode.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Barcode must be a non-empty string'
    });
  }

  if (typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Name must be a non-empty string'
    });
  }

  next();
};

// Validate cart data
export const validateCartItem = (req, res, next) => {
  const { userId, productId, quantity } = req.body;
  
  if (!userId || !productId) {
    return res.status(400).json({
      success: false,
      message: 'User ID and product ID are required'
    });
  }

  if (quantity && (typeof quantity !== 'number' || quantity <= 0)) {
    return res.status(400).json({
      success: false,
      message: 'Quantity must be a positive number'
    });
  }

  next();
};

// Validate ID parameter
export const validateId = (req, res, next) => {
  const { id } = req.params;
  
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({
      success: false,
      message: 'Valid ID is required'
    });
  }

  next();
};

// Validate search query
export const validateSearchQuery = (req, res, next) => {
  const { q } = req.query;
  
  if (!q || typeof q !== 'string' || q.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Search query is required'
    });
  }

  next();
};
