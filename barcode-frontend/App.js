import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import ScanScreen from './src/screens/ScanScreen';
import CartScreen from './src/screens/CartScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import AddProductScreen from './src/screens/AddProductScreen';
import { CartProvider } from './src/contexts/CartContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Barcode Scanner App' }} />
          <Stack.Screen name="Scan" component={ScanScreen} options={{ title: 'Scan Barcode' }} />
          <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Cart' }} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ title: 'Add New Product' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}