//@ts-nocheck
import React from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import RoundedButton from "../../components/RoundedButton/RoundedButton";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {cartSlice} from "../../store/cartSlice";
import {useGetProductQuery} from "../../store/apiSlice";

const ProductDetailsScreen = ({route}) => {
  const {width} = useWindowDimensions(width);
  const id = route.params.id;
  const navigation = useNavigation();
  const { data, isLoading, error } = useGetProductQuery(id);
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(cartSlice.actions.addCartItem({product}))
    navigation.navigate('Cart');
  }

  if(isLoading) {return (<View className="h-screen w-screen flex items-center justify-center"><ActivityIndicator /></View>)}
  if (error) { return (<View className="h-screen w-screen items-center justify-center"><Text className="text-red-500 font-[500] text-lg">{error}</Text></View>)}
  const product = data.data
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
