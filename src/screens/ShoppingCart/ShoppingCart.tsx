//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import CartListItem from "../../components/CartListItem";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {selectSubtotal} from "../../store/cartSlice";

const ShoppingCart = () => {
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart.items);
  const addToCart = () => {

  }
  return (
    <View className="pt-16 flex flex-col flex-1">
      <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} className="my-1 px-5">
        <Ionicons name="arrow-back-circle" size={27} color="black" />
      </TouchableOpacity>
      {cartItems.length > 0 ? (
          <FlatList
            className=""
            data={cartItems}
            renderItem={({ item }) => <CartListItem cartItem={item} />}
            ListFooterComponent={() => {
              const subtotal = useSelector(selectSubtotal);
              return (
                <View style={styles.totalsContainer}>
                  <View style={styles.row}>
                    <Text style={styles.text}>Subtotal</Text>
                    <Text style={styles.text}>{subtotal} US$</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.text}>Delivery</Text>
                    <Text style={styles.text}>16,50 US$</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.textBold}>Total</Text>
                    <Text style={styles.textBold}>426,50 US$</Text>
                  </View>
                </View>
              )
            }}
          />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500 text-lg font-[500]">Your cart is empty</Text>
        </View>
      )}

      <TouchableOpacity onPress={addToCart} activeOpacity={0.8} className="absolute bg-black bottom-10 py-4 rounded-2xl w-[90%]" style={{alignSelf: 'center', alignItems: 'center'}}>
        <Text className="text-white font-[600]">Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: "gainsboro",
    borderTopWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
  textBold: {
    fontSize: 16,
    fontWeight: "500",
  },
});
