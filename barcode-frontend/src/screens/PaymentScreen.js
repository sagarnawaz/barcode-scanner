import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useCart } from '../contexts/CartContext';
import { THEME } from '../utils/constants';

const PaymentScreen = ({ navigation }) => {
  const { cart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handlePayment = () => {
    Alert.alert(
      'Payment Confirmation',
      `Process payment of ₹${getTotalPrice().toFixed(2)}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Confirm Payment',
          onPress: () => {
            // Simulate payment processing
            Alert.alert(
              'Payment Successful!',
              'Your order has been processed successfully.',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    clearCart();
                    navigation.navigate('Home');
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'upi', name: 'UPI Payment', icon: '📱' },
    { id: 'cash', name: 'Cash on Delivery', icon: '💰' },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦' }
  ];

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No items in cart</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Scan')}
        >
          <Text style={styles.buttonText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cart.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
            </View>
          ))}
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total ({getTotalItems()} items):</Text>
            <Text style={styles.totalAmount}>₹{getTotalPrice().toFixed(2)}</Text>
          </View>
        </View>

        {/* Payment Method Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Payment Method</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethod,
                paymentMethod === method.id && styles.selectedPaymentMethod
              ]}
              onPress={() => setPaymentMethod(method.id)}
            >
              <Text style={styles.paymentIcon}>{method.icon}</Text>
              <Text style={styles.paymentName}>{method.name}</Text>
              {paymentMethod === method.id && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Subtotal:</Text>
            <Text style={styles.detailValue}>₹{getTotalPrice().toFixed(2)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tax (5%):</Text>
            <Text style={styles.detailValue}>₹{(getTotalPrice() * 0.05).toFixed(2)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Amount:</Text>
            <Text style={styles.detailValue}>₹{(getTotalPrice() * 1.05).toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Payment Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={handlePayment}
        >
          <Text style={styles.payButtonText}>
            Pay ₹{(getTotalPrice() * 1.05).toFixed(2)}
          </Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: THEME.COLORS.SURFACE,
    margin: THEME.SPACING.MD,
    padding: THEME.SPACING.LG,
    borderRadius: THEME.BORDER_RADIUS.LG,
  },
  sectionTitle: {
    fontSize: THEME.FONT_SIZES.LG,
    fontWeight: '600',
    color: THEME.COLORS.TEXT_PRIMARY,
    marginBottom: THEME.SPACING.MD,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: THEME.SPACING.SM,
    borderBottomWidth: 1,
    borderBottomColor: THEME.COLORS.BORDER,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: THEME.FONT_SIZES.MD,
    color: THEME.COLORS.TEXT_PRIMARY,
    fontWeight: '500',
  },
  itemQuantity: {
    fontSize: THEME.FONT_SIZES.SM,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  itemPrice: {
    fontSize: THEME.FONT_SIZES.MD,
    color: THEME.COLORS.PRIMARY,
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: THEME.SPACING.MD,
    borderTopWidth: 1,
    borderTopColor: THEME.COLORS.BORDER,
  },
  totalLabel: {
    fontSize: THEME.FONT_SIZES.LG,
    color: THEME.COLORS.TEXT_PRIMARY,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: THEME.FONT_SIZES.LG,
    color: THEME.COLORS.PRIMARY,
    fontWeight: 'bold',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: THEME.SPACING.MD,
    borderRadius: THEME.BORDER_RADIUS.MD,
    marginBottom: THEME.SPACING.SM,
    borderWidth: 1,
    borderColor: THEME.COLORS.BORDER,
  },
  selectedPaymentMethod: {
    borderColor: THEME.COLORS.PRIMARY,
    backgroundColor: THEME.COLORS.PRIMARY + '10',
  },
  paymentIcon: {
    fontSize: 24,
    marginRight: THEME.SPACING.MD,
  },
  paymentName: {
    flex: 1,
    fontSize: THEME.FONT_SIZES.MD,
    color: THEME.COLORS.TEXT_PRIMARY,
  },
  checkmark: {
    fontSize: THEME.FONT_SIZES.LG,
    color: THEME.COLORS.PRIMARY,
    fontWeight: 'bold',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: THEME.SPACING.SM,
  },
  detailLabel: {
    fontSize: THEME.FONT_SIZES.MD,
    color: THEME.COLORS.TEXT_PRIMARY,
  },
  detailValue: {
    fontSize: THEME.FONT_SIZES.MD,
    color: THEME.COLORS.TEXT_PRIMARY,
    fontWeight: '500',
  },
  footer: {
    backgroundColor: THEME.COLORS.SURFACE,
    padding: THEME.SPACING.LG,
    borderTopWidth: 1,
    borderTopColor: THEME.COLORS.BORDER,
  },
  payButton: {
    backgroundColor: THEME.COLORS.SUCCESS,
    paddingVertical: THEME.SPACING.LG,
    borderRadius: THEME.BORDER_RADIUS.LG,
    alignItems: 'center',
  },
  payButtonText: {
    color: THEME.COLORS.BACKGROUND,
    fontSize: THEME.FONT_SIZES.LG,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: THEME.COLORS.PRIMARY,
    paddingHorizontal: THEME.SPACING.LG,
    paddingVertical: THEME.SPACING.MD,
    borderRadius: THEME.BORDER_RADIUS.MD,
  },
  buttonText: {
    color: THEME.COLORS.BACKGROUND,
    fontSize: THEME.FONT_SIZES.MD,
    fontWeight: '600',
  },
});

export default PaymentScreen;
