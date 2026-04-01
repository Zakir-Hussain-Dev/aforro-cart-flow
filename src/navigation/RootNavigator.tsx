import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { HomeScreen } from '../screens/HomeScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { CartScreen } from '../screens/CartScreen';
import { ReviewCartScreen } from '../screens/ReviewCartScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { AddressSelectionScreen } from '../screens/AddressSelectionScreen';

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { productId: string };
  Cart: undefined;
  ReviewCart: undefined;
  Login: undefined;
  AddressSelection: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="ReviewCart" component={ReviewCartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AddressSelection" component={AddressSelectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
