import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo Placeholder */}
      <View style={styles.logoContainer}>
       <Image source={require('../assets/icon.png')} style={styles.logo} /> 
      </View>
      <Text style={styles.title}>Scan the Barcode</Text>
      <Text style={styles.subtitle}>Quickly scan products and manage your cart</Text>
      <TouchableOpacity
        style={styles.scanButton}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('Scan')}
      >
        <Text style={styles.scanButtonText}>Scan Now</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cartButton}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('Cart')}
      >
        <Text style={styles.cartButtonText}>View Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  logoContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  logoText: {
    color: '#4FC3F7',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
    fontFamily: 'Roboto',
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  title: {
    fontSize: 28,
    color: '#4FC3F7',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Roboto',
    marginBottom: 32,
    textAlign: 'center',
  },
  scanButton: {
    backgroundColor: '#4FC3F7',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 48,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    letterSpacing: 1,
    textAlign: 'center',
  },
  cartButton: {
    borderColor: '#4FC3F7',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 44,
  },
  cartButtonText: {
    color: '#4FC3F7',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
});