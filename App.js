import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import React from "react";
import Navigation from "./src/navigation/navigation";
import {Provider} from "react-redux";
import {store} from "./src/store";
import {StripeProvider} from "@stripe/stripe-react-native";

export default function App() {
  return (
    <Provider store={store}>
      <View className="flex-1">
        <StripeProvider publishableKey="pk_test_51Mhe9RE3buS2eF5kcGHk0xjSxiIKh4V0BHcxFG8dlfunkOXqHZUhICZ1YrUPgYQnMApd8jI8n9eHRoH4hmCHm1i700Db9OW7SA">
          <Navigation />
        </StripeProvider>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}
