import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import EndScreen from '../EndScreen/EndScreen';

const Modal = ({ navigation, children, pH, wd }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={[
          styles.modalWrapper,
          { paddingHorizontal: pH ? pH : 50, width: wd ? wd : '80%' },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: 'black',
    width: '80%',
    paddingVertical: 25,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
});
