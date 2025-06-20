import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import CartItem from '../components/CartItem';
import { useCart } from '../CartContext';

export default function CartScreen({ navigation }) {
  const { cart } = useCart();

  return (
    <View style={styles.container}>
      {/* Logo Placeholder */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/icon.png')} style={styles.logo} />
        
      </View>
      <Text style={styles.title}>Your Cart</Text>
      <Text style={styles.subtitle}>All scanned products appear here</Text>
      {cart.length === 0 ? (
        <Text style={styles.empty}>Cart is empty</Text>
      ) : (
        <FlatList
          data={cart}
          renderItem={({ item }) => <CartItem item={item} />}
          keyExtractor={(item) => item.barcode}
          contentContainerStyle={styles.listContent}
        />
      )}
      <TouchableOpacity
        style={styles.homeButton}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.homeButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  logoContainer: {
    marginTop: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
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
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
    fontFamily: 'Roboto',
  },
  title: {
    fontSize: 26,
    color: '#4FC3F7',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#333',
    fontFamily: 'Roboto',
    marginBottom: 18,
    textAlign: 'center',
  },
  empty: {
    fontSize: 18,
    fontFamily: 'Roboto',
    color: '#4FC3F7',
    textAlign: 'center',
    marginTop: 20,
  },
  listContent: {
    paddingBottom: 24,
    width: '100%',
  },
  homeButton: {
    marginTop: 24,
    backgroundColor: '#4FC3F7',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 44,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
  },
});