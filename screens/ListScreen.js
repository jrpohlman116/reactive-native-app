import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView, FlatList } from 'react-native-gesture-handler';

export default function ListScreen() {
  return (
    <View style={styles.container}>
      <FlatList
      data={[
        {key: 'Devin'},
        {key: 'Dan'},
        {key: 'Dominic'},
        {key: 'Jackson'},
        {key: 'James'},
        {key: 'Joel'},
        {key: 'John'},
        {key: 'Jillian'},
        {key: 'Jimmy'},
        {key: 'Julie'},
      ]}
      renderItem={({item}) => <Text>{item.key}</Text>}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 15,
  }
});
