// @ts-nocheck
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator, ScrollView,
} from 'react-native';
import {useGetOrderQuery} from "../../store/apiSlice";

const TrackOrderScreen = () => {
  const [ref, setRef] = useState('');
  const { data, isLoading, error } = useGetOrderQuery(ref);

  return (
    <ScrollView contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false} className="pt-16" style={styles.root}>
      <TextInput
        style={styles.input}
        value={ref}
        onChangeText={setRef}
        placeholder="Your order reference"
      />

      {isLoading && <ActivityIndicator />}
      {data?.status !== 'OK' && <Text className="mt-4">Order not found</Text>}
      {data?.status === 'OK' && (
        <Text className="mt-3">{JSON.stringify(data.data, null, 2)}</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  input: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default TrackOrderScreen;
