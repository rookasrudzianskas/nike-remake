//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, Image, FlatList, useWindowDimensions} from 'react-native';
import products from "../../data/products";
import RoundedButton from "../../components/RoundedButton/RoundedButton";

const ProductDetailsScreen = () => {
  const product = products[0];
  const {width} = useWindowDimensions(width);

  return (
    <View className="pt-24 relative">
      <FlatList
        data={product.images}
        renderItem={({item}) => (
          <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
      />
      <View className="absolute top-[55px] right-7 flex flex-row items-center">
        <RoundedButton icon={'share'} />
        <RoundedButton icon={'somethingElse'} />
      </View>
      <View className="px-5">
        <Text className="text-gray-900 font-[600] text-3xl my-2">{product.name}</Text>
        <Text className="text-gray-900 font-[600] text-lg">${product.price}</Text>
        <Text className="text-gray-800 font-[400] mt-3 text-[15px]">{product.description}</Text>
      </View>
    </View>
  );
};

export default ProductDetailsScreen;
