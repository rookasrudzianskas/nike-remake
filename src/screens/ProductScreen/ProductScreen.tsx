//@ts-nocheck
import React from 'react';
import {Text, View, Image, FlatList, TouchableOpacity} from 'react-native';
import {Feather, Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";

const ProductScreen = () => {
  const navigation = useNavigation();
  const products = useSelector(state => state.products.products);

  return (
    <View className="flex flex-col">
      <View className="flex flex-row items-center  pt-16 justify-between  px-3 mb-2">
        <View className="flex flex-row items-center space-x-2">
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="ios-filter-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-gray-500 font-[500]">Filter by size</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} className="flex flex-row items-center space-x-1" activeOpacity={0.7}>
          <Feather name="shopping-bag" size={21} color="black" />
          <Text className="text-[14px] font-[500]">1</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('Product Details')} activeOpacity={0.7} style={{ width: "50%", padding: 1 }}>
            <Image source={{ uri: item.image }} style={{width: "100%", aspectRatio: 1}} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ProductScreen;
