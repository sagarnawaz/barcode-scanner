import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import CartItem from '../components/CartItem'; // ✅ your component
import { useCart } from '../CartContext';
import { useNavigation } from '@react-navigation/native';


export default function CartScreen({ navigation }) {
  const { cart, updateQuantity, clearCart } = useCart(); // ✅ pulling updateQuantity

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0); // ✅ total includes quantity

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cart.length === 0 ? (
        <Text style={styles.empty}>Cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={({ item }) => (
              <CartItem item={item} onQuantityChange={updateQuantity} /> // ✅ using it here
            )}
            keyExtractor={(item) => item.barcode}
          />

          <Text style={styles.total}>Total: Rs {total}</Text>

          <TouchableOpacity onPress={clearCart} style={styles.clearBtn}>
            <Text style={styles.clearBtnText}>Clear Cart</Text>
          </TouchableOpacity>
        </>
      )}

      
      <TouchableOpacity
        style={[
          styles.homeButton,
          cart.length === 0 && { backgroundColor: '#ccc' }
        ]}
        activeOpacity={cart.length === 0 ? 1 : 0.85}
        disabled={cart.length === 0}
        onPress={() => navigation.navigate('Payment')}
      >
        <Text style={styles.homeButtonText}>Checkout</Text>
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
  logo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
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
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
  },
  clearBtn: {
    marginTop: 10,
    backgroundColor: '#ef5350',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  clearBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
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
});
