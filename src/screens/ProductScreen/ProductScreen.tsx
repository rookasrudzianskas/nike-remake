//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, Image, FlatList, TouchableOpacity} from 'react-native';
import products from "../../data/products";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
// import products from "../../data/products";

const ProductScreen = () => {
  const navigation = useNavigation();
  return (
    <View className="flex flex-col">
      <View className="flex flex-row pt-16 items-center px-3 space-x-2 mb-2">
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons name="ios-filter-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-gray-500 font-[500]">Filter by size</Text>
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
