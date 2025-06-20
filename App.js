import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ScanScreen from './screens/ScanScreen';
import CartScreen from './screens/CartScreen';
import { CartProvider } from './CartContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Barcode Scanner App' }} />
          <Stack.Screen name="Scan" component={ScanScreen} options={{ title: 'Scan Barcode' }} />
          <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Cart' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}