//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native';
import CartListItem from "../../components/CartListItem";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {cartSlice, selectDeliveryPrice, selectSubtotal, selectTotal} from "../../store/cartSlice";
import {useCreateOrderMutation, useCreatePaymentIntentMutation} from "../../store/apiSlice";
import {initPaymentSheet, presentPaymentSheet} from "@stripe/stripe-react-native";

const ShoppingCart = () => {
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [createOrder, {data, error, isLoading}] = useCreateOrderMutation();
  const subTotal = useSelector(selectSubtotal);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);
  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const onCheckout = async () => {
    // creating a payment intent
    const response = await createPaymentIntent({
      amount: Math.floor(total * 100),
    });
    console.log(response);
    if(response.error) {
      Alert.alert('Error', response.error);
      return;
    }

    // initializing the Payment sheet
    const { error: paymentSheetError } = await initPaymentSheet({
      merchantDisplayName: 'Nikee App, Inc.',
      paymentIntentClientSecret: response.data.paymentIntent,
      defaultBillingDetails: {
        name: 'Rokas Technologies'
      },
    });
    if(paymentSheetError) {
      Alert.alert('Error', paymentSheetError);
      return;
    }
    // presenting the Payment Sheet from Stripe
    const { error: paymentError } = await presentPaymentSheet();
    if(paymentError) {
      Alert.alert('Error', paymentError);
      return;
    }
    // if payment ok -> create the order
    onCreateOrder();
  };


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

      <TouchableOpacity onPress={onCheckout} activeOpacity={0.8} className="absolute bg-black bottom-10 py-4 rounded-2xl w-[90%]" style={{alignSelf: 'center', alignItems: 'center'}}>
        <Text className="text-white font-[600]">Checkout</Text>
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
