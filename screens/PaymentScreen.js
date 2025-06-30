import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useCart } from '../CartContext';

export default function PaymentScreen({ navigation }) {
  const { cart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handlePayment = () => {
    Alert.alert('✅ Payment Successful', `You paid $${total}`, [
      {
        text: 'OK',
        onPress: () => {
          clearCart();
          navigation.navigate('Home');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Summary</Text>
      <Text style={styles.amount}>Total: ${total}</Text>

      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  amount: { fontSize: 20, marginBottom: 24 },
  button: {
    backgroundColor: '#4FC3F7',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 12,
  },
  cancelButton: {
    backgroundColor: '#aaa',
  },
  buttonText: { color: '#fff', fontSize: 16 },
});
