import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import BarcodeScanner from '../components/BarcodeScanner';
import { useCart } from '../CartContext';
import axios from 'axios';

const BASE_URL = 'http://192.168.100.7:3000'; // ✅ Use your local IP

export default function ScanScreen({ navigation }) {
  const { addToCart } = useCart();
  const [scanned, setScanned] = useState(false);

  const fetchProduct = async (barcode) => {
    try {
      const response = await axios.get(`${BASE_URL}/product/${barcode}`);
      return response.data;
    } catch (error) {
      console.error('❌ Product fetch failed:', error.message);
      return null;
    }
  };

  const handleBarcodeScanned = async (data, type) => {
    if (scanned) return;
    setScanned(true);

    const product = await fetchProduct(data);

    if (product) {
      Alert.alert(
        'Add Product',
        `Add ${product.name} (Rs ${product.price}) to cart?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => setScanned(false),
          },
          {
            text: 'Add',
            onPress: () => {
              addToCart(product);
              navigation.navigate('Cart');
              setScanned(false);
            },
          },
        ]
      );
    } else {
      Alert.alert('Error', 'Product not found!', [
        {
          text: 'OK',
          onPress: () => setScanned(false),
        },
      ]);
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
