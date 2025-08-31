import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useCart } from '../contexts/CartContext';
import { THEME } from '../utils/constants';
import { apiService } from '../services/api';

export default function ScanScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [flash, setFlash] = useState('off'); // "off" | "on" | "torch" (Expo 53 supports these)
  const cameraRef = useRef(null);
  const { addToCart } = useCart();

  if (!permission) {
    return <ActivityIndicator size="large" color={THEME.COLORS.PRIMARY} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text>No access to camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionBtn}>
          <Text style={{ color: 'white' }}>Grant Camera Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = async ({ data }) => {
    if (scanned) return;
    setScanned(true);

    try {
      const result = await apiService.getProductByBarcode(data);

      if (result.success) {
        const product = result.data;
        Alert.alert(
          'Product Found 🎉',
          `Name: ${product.name}\nPrice: ₹${product.price}`,
          [
            {
              text: 'Add to Cart 🛒',
              onPress: async () => {
                await apiService.addToCart('demo_user', product.id, 1);
                addToCart({ ...product, quantity: 1 });
                navigation.navigate('Cart');
              },
            },
            { text: 'Scan Again 🔄', onPress: () => setScanned(false) },
            { text: 'Cancel', style: 'cancel' },
          ]
        );
      } else {
        Alert.alert('Not Found ❌', `Barcode: ${data}`, [
          {
            text: 'Add Product ➕',
            onPress: () => navigation.navigate('AddProduct', { barcode: data }),
          },
          { text: 'Scan Again 🔄', onPress: () => setScanned(false) },
          { text: 'Cancel', style: 'cancel' },
        ]);
      }
    } catch (error) {
      Alert.alert('Error ❌', error.message, [
        { text: 'OK', onPress: () => setScanned(false) },
      ]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        facing="back" // replaces Camera.Constants.Type.back
        enableTorch={flash === 'torch'}
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'ean13', 'code128'], // add as needed
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      {scanned && (
        <TouchableOpacity
          style={styles.scanAgainBtn}
          onPress={() => setScanned(false)}
        >
          <Text>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionBtn: {
    marginTop: 16,
    backgroundColor: THEME.COLORS.PRIMARY,
    padding: 10,
    borderRadius: 8,
  },
  scanAgainBtn: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
  },
});
