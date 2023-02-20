import { StatusBar } from 'expo-status-bar';
import {Text, View, Image, FlatList} from 'react-native';
import React from "react";
import products from "./src/data/products";

export default function App() {
  return (
    <View className="flex-1">
      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={{ width: "50%", padding: 1 }}>
            <Image source={{ uri: item.image }} style={{width: "100%", aspectRatio: 1}} />
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}
