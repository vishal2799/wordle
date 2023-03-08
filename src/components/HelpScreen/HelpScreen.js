import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import React from 'react';
import EndScreen from '../EndScreen/EndScreen';
import Modal from '../Modal';
import { Entypo } from '@expo/vector-icons';
import { color } from 'react-native-reanimated';

const HelpScreen = ({ navigation }) => {
  return (
    <Modal navigation={navigation}>
      <Pressable onPress={() => navigation.goBack()} style={styles.cross}>
        <Entypo name='cross' size={28} color='gray' />
      </Pressable>
      <View>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>How to play</Text>
        </View>
        <View style={{ marginVertical: 10 }}>
          <View style={styles.cubesWrapper}>
            <View
              style={[
                styles.cube,
                { backgroundColor: 'green', borderColor: 'green' },
              ]}
            >
              <Text style={styles.cubeText}>C</Text>
            </View>
            <View style={styles.cube}>
              <Text style={styles.cubeText}>H</Text>
            </View>
            <View style={styles.cube}>
              <Text style={styles.cubeText}>A</Text>
            </View>
            <View style={styles.cube}>
              <Text style={styles.cubeText}>I</Text>
            </View>
            <View style={styles.cube}>
              <Text style={styles.cubeText}>R</Text>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.desc}>
              C is <Text style={{ color: 'green' }}>green</Text>, because it's
              in the word and in the correct spot.
            </Text>
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <View style={styles.cubesWrapper}>
            <View style={styles.cube}>
              <Text style={styles.cubeText}>S</Text>
            </View>
            <View style={styles.cube}>
              <Text style={styles.cubeText}>N</Text>
            </View>
            <View
              style={[
                styles.cube,
                { backgroundColor: 'green', borderColor: 'green' },
              ]}
            >
              <Text style={styles.cubeText}>O</Text>
            </View>
            <View style={styles.cube}>
              <Text style={styles.cubeText}>W</Text>
            </View>
            <View style={styles.cube}>
              <Text style={styles.cubeText}>Y</Text>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.desc}>
              O is <Text style={{ color: 'green' }}>yellow</Text>, because it's
              in the word and in the wrong spot.
            </Text>
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <View style={styles.cubesWrapper}>
            <View style={styles.cube}>
              <Text style={styles.cubeText}>I</Text>
            </View>
            <View style={styles.cube}>
              <Text style={styles.cubeText}>M</Text>
            </View>
            <View style={styles.cube}>
              <Text style={styles.cubeText}>A</Text>
            </View>
            <View style={styles.cube}>
              <Text style={styles.cubeText}>G</Text>
            </View>
            <View
              style={[
                styles.cube,
                { backgroundColor: 'green', borderColor: 'green' },
              ]}
            >
              <Text style={styles.cubeText}>E</Text>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.desc}>
              E is <Text style={{ color: 'green' }}>black</Text>, because it's
              not in the word.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  cross: {
    position: 'absolute',
    right: 5,
  },
  title: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  titleWrapper: {
    marginBottom: 10,
  },
  cube: {
    borderColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  cubeText: {
    fontSize: 13,
    lineHeight: 14,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  cubesWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  desc: {
    fontSize: 10,
    lineHeight: 11,
    color: 'white',
    textAlign: 'center',
  },
});
