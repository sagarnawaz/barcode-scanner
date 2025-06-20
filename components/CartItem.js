import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function CartItem({ item, onQuantityChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>Price: ${item.price}</Text>
      <View style={styles.quantityContainer}>
        <Button title="-" onPress={() => onQuantityChange(item.barcode, -1)} />
        <Text style={styles.quantity}>{item.quantity}</Text>
        <Button title="+" onPress={() => onQuantityChange(item.barcode, 1)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
});