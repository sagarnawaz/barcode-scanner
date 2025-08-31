import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useCart } from '../contexts/CartContext';
import { THEME } from '../utils/constants';

const CartScreen = ({ navigation }) => {
  const { cart, updateQuantity, clearCart } = useCart();

  const handleUpdateQuantity = (barcode, delta) => {
    updateQuantity(barcode, delta);
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to clear all items?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: clearCart
        }
      ]
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Scan')}
        >
          <Text style={styles.buttonText}>Start Scanning</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.cartList}>
        {cart.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemBarcode}>Barcode: {item.barcode}</Text>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </View>
            
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleUpdateQuantity(item.barcode, -1)}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              
              <Text style={styles.quantity}>{item.quantity}</Text>
              
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleUpdateQuantity(item.barcode, 1)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.itemTotal}>₹{item.price * item.quantity}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Items:</Text>
          <Text style={styles.summaryValue}>{getTotalItems()}</Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Price:</Text>
          <Text style={styles.summaryValue}>₹{getTotalPrice().toFixed(2)}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.clearButton]}
            onPress={handleClearCart}
          >
            <Text style={styles.clearButtonText}>Clear Cart</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.checkoutButton]}
            onPress={() => navigation.navigate('Payment')}
          >
            <Text style={styles.buttonText}>Proceed to Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.BACKGROUND,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: THEME.SPACING.LG,
  },
  emptyText: {
    fontSize: THEME.FONT_SIZES.LG,
    color: THEME.COLORS.TEXT_SECONDARY,
    marginBottom: THEME.SPACING.LG,
  },
  cartList: {
    flex: 1,
    padding: THEME.SPACING.MD,
  },
  cartItem: {
    backgroundColor: THEME.COLORS.SURFACE,
    padding: THEME.SPACING.MD,
    borderRadius: THEME.BORDER_RADIUS.MD,
    marginBottom: THEME.SPACING.MD,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: THEME.FONT_SIZES.MD,
    fontWeight: '600',
    color: THEME.COLORS.TEXT_PRIMARY,
    marginBottom: THEME.SPACING.XS,
  },
  itemBarcode: {
    fontSize: THEME.FONT_SIZES.SM,
    color: THEME.COLORS.TEXT_SECONDARY,
    marginBottom: THEME.SPACING.XS,
  },
  itemPrice: {
    fontSize: THEME.FONT_SIZES.MD,
    color: THEME.COLORS.PRIMARY,
    fontWeight: '600',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: THEME.SPACING.MD,
  },
  quantityButton: {
    backgroundColor: THEME.COLORS.PRIMARY,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: THEME.COLORS.BACKGROUND,
    fontSize: THEME.FONT_SIZES.LG,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: THEME.FONT_SIZES.MD,
    marginHorizontal: THEME.SPACING.MD,
    minWidth: 30,
    textAlign: 'center',
  },
  itemTotal: {
    fontSize: THEME.FONT_SIZES.MD,
    fontWeight: '600',
    color: THEME.COLORS.SUCCESS,
    minWidth: 60,
    textAlign: 'right',
  },
  summary: {
    backgroundColor: THEME.COLORS.SURFACE,
    padding: THEME.SPACING.LG,
    borderTopWidth: 1,
    borderTopColor: THEME.COLORS.BORDER,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: THEME.SPACING.MD,
  },
  summaryLabel: {
    fontSize: THEME.FONT_SIZES.MD,
    color: THEME.COLORS.TEXT_PRIMARY,
  },
  summaryValue: {
    fontSize: THEME.FONT_SIZES.MD,
    fontWeight: '600',
    color: THEME.COLORS.PRIMARY,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: THEME.SPACING.MD,
  },
  button: {
    flex: 1,
    paddingVertical: THEME.SPACING.MD,
    borderRadius: THEME.BORDER_RADIUS.MD,
    alignItems: 'center',
    marginHorizontal: THEME.SPACING.XS,
  },
  clearButton: {
    backgroundColor: THEME.COLORS.ERROR,
  },
  clearButtonText: {
    color: THEME.COLORS.BACKGROUND,
    fontSize: THEME.FONT_SIZES.MD,
    fontWeight: '600',
  },
  checkoutButton: {
    backgroundColor: THEME.COLORS.SUCCESS,
  },
  buttonText: {
    color: THEME.COLORS.BACKGROUND,
    fontSize: THEME.FONT_SIZES.MD,
    fontWeight: '600',
  },
});

export default CartScreen;
