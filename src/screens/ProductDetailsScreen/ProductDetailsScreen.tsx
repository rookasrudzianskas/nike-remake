//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import products from "../../data/products";

const ProductDetailsScreen = () => {
  const product = products[0];

  return (
    <View>
      <Text>
        byrookas 🚀
      </Text>
    </View>
  );
};

export default ProductDetailsScreen;
