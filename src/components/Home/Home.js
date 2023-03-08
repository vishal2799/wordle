import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../../../src/constants';
import { StatusBar } from 'expo-status-bar';
import { getDayOfTheYear, getDayKey } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const dayofTheYear = getDayOfTheYear();
const dayKey = getDayKey();

const Home = ({ navigation }) => {
  //AsyncStorage.removeItem('@game');

  const [secondsTillTomorrow, setSecondsTillTomorrow] = useState(0);
  const [today, setToday] = useState(false);
  const [playing, setPlaying] = useState(false);

  const messageStatus = () => {
    let message;
    if (today) {
      message = `Next Wordle ${formatSeconds()}`;
    } else if (playing) {
      message = 'Continue the game';
    } else {
      message = 'New Wordle Available';
    }
    return message;
  };

  useFocusEffect(
    React.useCallback(() => {
      readState();

      //return () => unsubscribe();
    }, [today])
  );
  // useEffect(() => {
  //   readState();
  // }, [today]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
      );
      setSecondsTillTomorrow((tomorrow - now) / 1000);
    };
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [today]);

  const formatSeconds = () => {
    const hours = Math.floor(secondsTillTomorrow / (60 * 60));
    const minutes = Math.floor((secondsTillTomorrow % (60 * 60)) / 60);
    const seconds = Math.floor(secondsTillTomorrow % 60);

    return `${hours}:${minutes}:${seconds}`;
  };

  const readState = async () => {
    const dataString = await AsyncStorage.getItem('@game');
    let data;
    try {
      data = JSON.parse(dataString);
      if (data[dayKey]) {
        if (
          data[dayKey].gameState === 'won' ||
          data[dayKey].gameState === 'lost'
        ) {
          setToday(true);
        }
        if (data[dayKey].gameState === 'playing') {
          setPlaying(true);
        }
      } else {
        setToday(false);
      }
    } catch (e) {
      console.log("Couldn't parse state");
      setToday(false);
    }
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar style='light' />

        <Text style={styles.title}>WORDLE</Text>
        <View style={{ width: '80%' }}>
          <View style={{ marginBottom: 25 }}>
            <Pressable
              style={styles.button1}
              onPress={() => navigation.navigate('Game')}
              disabled={today}
            >
              <Text style={styles.text}>Daily Word</Text>
              <Text style={styles.text3}>{messageStatus()}</Text>
            </Pressable>
            <Text style={styles.text4}>The classic daily word challenge!</Text>
          </View>
          <View>
            <Pressable
              style={styles.button2}
              onPress={() => navigation.navigate('Game2')}
            >
              <Text style={styles.text2}>Unlimited Words</Text>
            </Pressable>
            <Text style={styles.text4}>Play multiple challenges!</Text>
          </View>
        </View>
        <Text style={styles.footer}>Copyright 2023. All rights reserved.</Text>
      </SafeAreaView>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  title: {
    color: colors.lightgrey,
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 7,
  },
  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: colors.primary,
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 22,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: colors.secondary,
  },
  text: {
    fontSize: 22,
    lineHeight: 23,
    fontWeight: 'bold',
    letterSpacing: 0.95,
    color: 'white',
    textTransform: 'uppercase',
  },
  text2: {
    fontSize: 22,
    lineHeight: 23,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  text3: {
    fontSize: 14,
    lineHeight: 15,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    marginTop: 6,
  },
  footer: {
    color: colors.lightgrey,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  text4: {
    fontSize: 14,
    lineHeight: 15,
    letterSpacing: 0.25,
    color: 'lightgrey',
    marginTop: 10,
    textAlign: 'center',
  },
});
