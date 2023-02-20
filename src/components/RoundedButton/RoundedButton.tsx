//@ts-nocheck
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from "@expo/vector-icons";


type Props = {
  icon: string;
  action: () => void;
}

const RoundedButton = ({icon, action}: Props) => {
  return (
    <TouchableOpacity onPress={action} activeOpacity={0.7} className="w-9 h-9 flex items-center justify-center bg-gray-900/90 mx-1 rounded-full">
      {icon === 'share' ? (
        <Ionicons name="share-outline" size={21} color="white" />
      ) : (
        <Ionicons name="ios-close-outline" size={23} color="white" />
      )}
    </TouchableOpacity>
  );
};

export default RoundedButton;
