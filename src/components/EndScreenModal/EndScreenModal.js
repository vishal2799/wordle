import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import EndScreen from '../EndScreen/EndScreen';

const EndScreenModal = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.modalWrapper}>
        <EndScreen />
        {/* <Text style={{ fontSize: 30 }}>This is a modal!</Text>*/}
        <Button onPress={() => navigation.goBack()} title='Dismiss' />
      </View>
    </View>
  );
};

export default EndScreenModal;

const styles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: 'gray',
    padding: 10,
  },
});
