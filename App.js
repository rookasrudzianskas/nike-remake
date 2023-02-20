import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import React from "react";

export default function App() {
  return (
    <View className="flex-1">
      <Image
        source={{
          uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/nike/nike1.png",
        }}
        style={{width: "100%", aspectRatio: 1}}
      />
      <StatusBar style="auto" />
    </View>
  );
}
