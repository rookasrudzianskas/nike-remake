import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import ShoppingCart from "../screens/ShoppingCart";
import ProductScreen from "../screens/ProductScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'white'
        }
      }}>
        <Stack.Screen name="Products" component={ProductScreen} />
        <Stack.Screen name="Product Details" options={{ presentation: 'modal' }} component={ProductDetailsScreen} />
        <Stack.Screen name="Cart" component={ShoppingCart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
