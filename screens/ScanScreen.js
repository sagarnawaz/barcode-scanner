import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import BarcodeScanner from '../components/BarcodeScanner';
import { useCart } from '../CartContext';

export default function ScanScreen({ navigation }) {
  const { addToCart } = useCart();

  // Mock backend API call
  const fetchProduct = async (barcode) => {
    // Simulated product database
    const productDB = {
      '8901030372424': { name: 'Pepsi 500ml', price: 50, barcode: '8901030372424' },
    };
    return productDB[barcode] || null;
  };

  const handleBarcodeScanned = async (data, type) => {
    const product = await fetchProduct(data);
    if (product) {
      addToCart(product);
      Alert.alert('Success', `${product.name} added to cart!`, [
        { text: 'OK', onPress: () => navigation.navigate('Cart') },
      ]);
    } else {
      Alert.alert('Error', 'Product not found!');
    }
  };

  return (
    <View style={styles.container}>
      <BarcodeScanner onBarcodeScanned={handleBarcodeScanned} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});