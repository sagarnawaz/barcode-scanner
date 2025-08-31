// Essential utility helper functions

// Format price to currency string
export const formatPrice = (price, currency = '₹') => {
  if (typeof price !== 'number' || isNaN(price)) {
    return `${currency}0.00`;
  }
  return `${currency}${price.toFixed(2)}`;
};

// Validate barcode format
export const validateBarcode = (barcode) => {
  if (!barcode || typeof barcode !== 'string') {
    return { isValid: false, message: 'Barcode is required' };
  }

  const trimmedBarcode = barcode.trim();
  
  if (trimmedBarcode.length < 8) {
    return { 
      isValid: false, 
      message: 'Barcode must be at least 8 characters' 
    };
  }

  if (trimmedBarcode.length > 20) {
    return { 
      isValid: false, 
      message: 'Barcode must be no more than 20 characters' 
    };
  }

  // Check if barcode contains only numbers
  if (!/^\d+$/.test(trimmedBarcode)) {
    return { isValid: false, message: 'Barcode must contain only numbers' };
  }

  return { isValid: true, message: 'Barcode is valid' };
};

// Calculate cart total
export const calculateCartTotal = (cartItems) => {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return 0;
  }

  return cartItems.reduce((total, item) => {
    const itemTotal = (item.price || 0) * (item.quantity || 1);
    return total + itemTotal;
  }, 0);
};

// Check if object is empty
export const isEmpty = (obj) => {
  if (obj === null || obj === undefined) return true;
  if (typeof obj === 'string') return obj.trim().length === 0;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return false;
};
