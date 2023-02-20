import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import React from "react";
import ProductScreen from "./src/screens/ProductScreen";

export default function App() {
  return (
    <View className="flex-1">
      <ProductScreen />
      <StatusBar style="auto" />
    </View>
  );
}
