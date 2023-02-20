import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import React from "react";
import ProductScreen from "./src/screens/ProductScreen";
import ProductDetailsScreen from "./src/screens/ProductDetailsScreen";

export default function App() {
  return (
    <View className="flex-1">
      {/*<ProductScreen />*/}
      <ProductDetailsScreen/>
      <StatusBar style="auto" />
    </View>
  );
}
