//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native';
import CartListItem from "../../components/CartListItem";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {cartSlice, selectDeliveryPrice, selectSubtotal, selectTotal} from "../../store/cartSlice";
import {useCreateOrderMutation} from "../../store/apiSlice";

const ShoppingCart = () => {
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch(cartSlice);
  const [createOrder, {data, error, isLoading}] = useCreateOrderMutation();
  const subTotal = useSelector(selectSubtotal);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  const onCreateOrder = async () => {
    const result = await createOrder({
      items: cartItems,
      subTotal,
      deliveryFee,
      customer: {
        name: "Rokas",
        address: 'My Home',
        phone: '123456789',
        email: 'myemail'
      }
    });

    if(result.data?.status === 'OK') {
      console.log(result.data);
      Alert.alert(
        'Order has been submitted',
        `Your order reference is: ${result.data.data.ref}`
      );
      dispatch(cartSlice.actions.clear());
    }
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
              const deliveryFee = useSelector(selectDeliveryPrice);
              const total = useSelector(selectTotal);
              return (
                <View style={styles.totalsContainer}>
                  <View style={styles.row}>
                    <Text style={styles.text}>Subtotal</Text>
                    <Text style={styles.text}>{subtotal} US$</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.text}>Delivery</Text>
                    <Text style={styles.text}>{deliveryFee} US$</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.textBold}>Total</Text>
                    <Text style={styles.textBold}>{total} US$</Text>
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

      <TouchableOpacity onPress={onCreateOrder} activeOpacity={0.8} className="absolute bg-black bottom-10 py-4 rounded-2xl w-[90%]" style={{alignSelf: 'center', alignItems: 'center'}}>
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
