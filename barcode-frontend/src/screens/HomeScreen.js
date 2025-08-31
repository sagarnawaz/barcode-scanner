import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useCart } from '../contexts/CartContext';
import { THEME } from '../utils/constants';

const HomeScreen = ({ navigation }) => {
  const { cart } = useCart();

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const menuItems = [
    {
      title: 'Scan Barcode',
      description: 'Use camera to scan product barcodes',
      icon: '📱',
      onPress: () => navigation.navigate('Scan'),
    },
    {
      title: 'View Cart',
      description: `Items in cart: ${getCartItemCount()}`,
      icon: '🛒',
      onPress: () => navigation.navigate('Cart'),
    },
    {
      title: 'Add Product',
      description: 'Manually add new products to database',
      icon: '➕',
      onPress: () => navigation.navigate('AddProduct', { barcode: '' }),
    },
    {
      title: 'Payment',
      description: `Total: ₹${getCartTotal().toFixed(2)}`,
      icon: '💳',
      onPress: () => navigation.navigate('Payment'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Barcode Scanner</Text>
        <Text style={styles.subtitle}>Scan • Shop • Pay</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuDescription}>{item.description}</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Ready to scan? Point your camera at any barcode to get started!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.BACKGROUND,
  },
  header: {
    alignItems: 'center',
    paddingVertical: THEME.SPACING.XXL,
    backgroundColor: THEME.COLORS.PRIMARY,
  },
  title: {
    fontSize: THEME.FONT_SIZES.HEADER,
    fontWeight: 'bold',
    color: THEME.COLORS.BACKGROUND,
    marginBottom: THEME.SPACING.SM,
  },
  subtitle: {
    fontSize: THEME.FONT_SIZES.LG,
    color: THEME.COLORS.BACKGROUND,
    opacity: 0.9,
  },
  menuContainer: {
    padding: THEME.SPACING.LG,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.COLORS.SURFACE,
    padding: THEME.SPACING.LG,
    borderRadius: THEME.BORDER_RADIUS.LG,
    marginBottom: THEME.SPACING.MD,
    shadowColor: THEME.COLORS.TEXT_PRIMARY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuIcon: {
    fontSize: 32,
    marginRight: THEME.SPACING.MD,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: THEME.FONT_SIZES.LG,
    fontWeight: '600',
    color: THEME.COLORS.TEXT_PRIMARY,
    marginBottom: THEME.SPACING.XS,
  },
  menuDescription: {
    fontSize: THEME.FONT_SIZES.SM,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  arrow: {
    fontSize: THEME.FONT_SIZES.LG,
    color: THEME.COLORS.PRIMARY,
    fontWeight: 'bold',
  },
  footer: {
    padding: THEME.SPACING.LG,
    alignItems: 'center',
  },
  footerText: {
    fontSize: THEME.FONT_SIZES.MD,
    color: THEME.COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default HomeScreen;
