import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import React from "react";
import Navigation from "./src/navigation/navigation";
import {Provider} from "react-redux";
import {store} from "./src/store";

export default function App() {
  return (
    <Provider store={store}>
      <View className="flex-1">
        <Navigation />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}
