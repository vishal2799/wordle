import { StyleSheet, Text, View, Switch, Pressable } from 'react-native';
import React, { useState, useContext } from 'react';
import Modal from '../Modal';
import { Entypo } from '@expo/vector-icons';
import {
  SettingsContext,
  SettingsDispatchContext,
} from '../../context/settings';

const SettingsScreen = ({ navigation }) => {
  const isSound = React.useContext(SettingsContext);
  const setIsSound = useContext(SettingsDispatchContext);
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsSound((previousState) => !previousState);
  const toggleSwitch1 = () => setIsEnabled((previousState) => !previousState);

  return (
    <Modal navigation={navigation}>
      <Pressable onPress={() => navigation.goBack()} style={styles.cross}>
        <Entypo name='cross' size={28} color='gray' />
      </Pressable>
      <View>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Settings</Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text style={styles.text1}>Sound</Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isSound ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor='#3e3e3e'
              onValueChange={toggleSwitch}
              value={isSound}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}
          >
            <View>
              <Text style={styles.text1}>Vibrate</Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor='#3e3e3e'
              onValueChange={toggleSwitch1}
              value={isEnabled}
            />
          </View>
          <Pressable
            style={[styles.button, { backgroundColor: 'blue' }]}
            onPress={() => navigation.navigate('Home')}
          >
            <Entypo name='home' size={20} color='white' />
            <Text style={[styles.title2, { marginLeft: 10 }]}>Home</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  cross: {
    position: 'absolute',
    right: 5,
  },
  title: {
    fontSize: 18,
    lineHeight: 19,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  title2: {
    fontSize: 14,
    lineHeight: 15,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  titleWrapper: {
    marginBottom: 15,
  },
  text1: {
    fontSize: 16,
    lineHeight: 17,
    fontWeight: 'bold',
    letterSpacing: 0.7,
    color: 'white',
  },
  button: {
    alignItems: 'baseline',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'green',
    marginTop: 15,
    flexDirection: 'row',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
