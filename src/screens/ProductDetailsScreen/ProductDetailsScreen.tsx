//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, Image, FlatList, useWindowDimensions, ScrollView, TouchableOpacity} from 'react-native';
import products from "../../data/products";
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import {useNavigation} from "@react-navigation/native";

const ProductDetailsScreen = () => {
  const product = products[0];
  const {width} = useWindowDimensions(width);
  const navigation = useNavigation();
  const addToCart = () => {
    console.warn('Added to cart');
  }

  return (
    <View>
      <ScrollView className="pb-10" contentContainerStyle={{paddingBottom: 200}} showsVerticalScrollIndicator={false}>
        <FlatList
          data={product.images}
          renderItem={({item}) => (
            <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
        />
        <View className="px-5">
          <Text className="text-gray-900 font-[600] text-3xl my-2">{product.name}</Text>
          <Text className="text-gray-900 font-[600] text-lg">${product.price}</Text>
          <Text className="text-gray-800 font-[400] mt-3 text-[15px]">{product.description}</Text>
        </View>
      </ScrollView>
      <View className="absolute top-[25px] right-3 flex flex-row items-center">
        <RoundedButton icon={'share'} />
        <RoundedButton icon={'somethingElse'} action={() => navigation.goBack()} />
      </View>
      <TouchableOpacity onPress={addToCart} activeOpacity={0.8} className="absolute bg-black bottom-10 py-4 rounded-2xl w-[90%]" style={{alignSelf: 'center', alignItems: 'center'}}>
        <Text className="text-white font-[600]">Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetailsScreen;
