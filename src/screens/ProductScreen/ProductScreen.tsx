//@ts-nocheck
import React from 'react';
import {Text, View, Image, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Feather, Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {productsSlice} from "../../store/productsSlide";
import {selectNumberOfItems} from "../../store/cartSlice";
import {useGetProductsQuery} from "../../store/apiSlice";

const ProductScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const  numberOfItems = useSelector(selectNumberOfItems);
  const { data, error, isLoading } = useGetProductsQuery();
  if(isLoading) {return (<View className="h-screen w-screen flex items-center justify-center"><ActivityIndicator /></View>)}
  if (error) { return (<View className="h-screen w-screen items-center justify-center"><Text className="text-red-500 font-[500] text-lg">{error}</Text></View>)}
  const products = data.data;
  return (
    <View className="flex flex-col">
      <View className="flex flex-row items-center  pt-16 justify-between  px-3 mb-2">
        <View className="flex flex-row items-center space-x-2">
          <TouchableOpacity onPress={() => navigation.navigate('TrackOrderScreen')} activeOpacity={0.7}>
            <Ionicons name="ios-filter-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-gray-500 font-[500]">Filter by size</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} className="flex flex-row items-center space-x-1" activeOpacity={0.7}>
          <Feather name="shopping-bag" size={21} color="black" />
          <Text className="text-[14px] font-[500]">{numberOfItems}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => {
            // update the selected product
            // dispatch(productsSlice.actions.setSelectedProduct(item.id));
            navigation.navigate('Product Details', { id: item._id });
          }} activeOpacity={0.7} style={{ width: "50%", padding: 1 }}>
            <Image source={{ uri: item.image }} style={{width: "100%", aspectRatio: 1}} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ProductScreen;
