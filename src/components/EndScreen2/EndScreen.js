import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { colors, colorsToEmoji } from '../../constants';
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import Modal from '../Modal';
import { Entypo } from '@expo/vector-icons';

const Number = ({ number, label }) => (
  <View style={{ alignItems: 'center', marginVertical: 10 }}>
    <Text style={{ color: colors.lightgrey, fontSize: 16, fontWeight: 'bold' }}>
      {number}
    </Text>
    <Text style={{ color: colors.lightgrey, fontSize: 10 }}>{label}</Text>
  </View>
);

const GuessDistributionLine = ({ position, amount, percentage }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Text style={{ color: colors.lightgrey }}>{position}</Text>
      <View
        style={{
          backgroundColor: colors.grey,
          margin: 5,
          padding: 5,
          alignSelf: 'stretch',
          width: `${percentage}%`,
          minWidth: 20,
        }}
      >
        <Text style={{ color: colors.lightgrey }}>{amount}</Text>
      </View>
    </View>
  );
};

const GuessDistribution = ({ distribution }) => {
  if (!distribution) {
    return null;
  }
  const sum = distribution.reduce((total, dist) => dist + total, 0);
  return (
    <>
      <Text style={styles.subtitle}>Guess Distribution</Text>
      <View style={{ width: '100%', paddingVertical: 5 }}>
        {distribution.map((dist, index) => (
          <GuessDistributionLine
            key={index}
            position={index + 1}
            amount={dist}
            percentage={(100 * dist) / sum}
          />
        ))}
      </View>
    </>
  );
};

const EndScreen = ({ won = false, rows, getCellBGColor, navigation }) => {
  const [secondsTillTomorrow, setSecondsTillTomorrow] = useState(0);
  const [played, setPlayed] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [curStreak, setCurStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [distribution, setDistribution] = useState(null);

  useEffect(() => {
    readState();
  }, []);

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
  }, []);

  const formatSeconds = () => {
    const hours = Math.floor(secondsTillTomorrow / (60 * 60));
    const minutes = Math.floor((secondsTillTomorrow % (60 * 60)) / 60);
    const seconds = Math.floor(secondsTillTomorrow % 60);

    return `${hours}:${minutes}:${seconds}`;
  };

  const share = () => {
    const textMap = rows
      .map((row, i) =>
        row.map((cell, j) => colorsToEmoji[getCellBGColor(i, j)]).join('')
      )
      .filter((row) => row)
      .join('\n');

    const textShare = `Wordle \n${textMap}`;

    Clipboard.setString(textShare);
    Alert.alert('copied successfully');
  };

  const readState = async () => {
    const dataString = await AsyncStorage.getItem('@game');
    let data;
    try {
      data = JSON.parse(dataString);
    } catch (e) {
      console.log("Couldn't parse state");
    }
    const keys = Object.keys(data);
    const values = Object.values(data);
    setPlayed(keys.length);
    const numberOfWins = values.filter(
      (game) => game.gameState === 'won'
    ).length;
    setWinRate(Math.floor((100 * numberOfWins) / keys.length));

    let cur_Streak = 0;
    let max_Streak = 0;
    let prevDay = 0;
    keys.forEach((key) => {
      const day = parseInt(key.split('-')[1]);
      if (data[key].gameState === 'won' && cur_Streak === 0) {
        cur_Streak += 1;
      } else if (data[key].gameState === 'won' && prevDay + 1 === day) {
        cur_Streak += 1;
      } else {
        if (cur_Streak > max_Streak) {
          max_Streak = cur_Streak;
        }
        cur_Streak = data[key].gameState === 'won' ? 1 : 0;
      }
      prevDay = day;
    });
    setCurStreak(cur_Streak);
    setMaxStreak(max_Streak);

    const dist = [0, 0, 0, 0, 0, 0];

    values.map((game) => {
      if (game.gameState === 'won') {
        const tries = game.rows.filter((row) => row[0]).length;
        dist[tries] = dist[tries] + 1;
      }
    });
    setDistribution(dist);
  };

  return (
    <Modal navigation={navigation} pH={25}>
      <Pressable onPress={() => navigation.goBack()} style={styles.cross}>
        <Entypo name='cross' size={28} color='gray' />
      </Pressable>
      <View>
        {/* <Animated.Text
          entering={SlideInLeft.springify().mass(0.5)}
          style={styles.title}
        >
          {won ? 'Congrats' : 'Try, again'}
        </Animated.Text> */}

        <Animated.View entering={SlideInLeft.delay(100).springify().mass(0.5)}>
          <Text style={styles.subtitle}>Statistics</Text>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10,
              justifyContent: 'space-between',
            }}
          >
            <Number number={played} label={'Played'} />
            <Number number={winRate} label={'Win %'} />
            <Number number={curStreak} label={'Cur Streak'} />
            <Number number={maxStreak} label={'Max Streak'} />
          </View>
        </Animated.View>

        <Animated.View
          entering={SlideInLeft.delay(200).springify().mass(0.5)}
          style={{ width: '100%' }}
        >
          <GuessDistribution distribution={distribution} />
        </Animated.View>

        <Animated.View
          entering={SlideInLeft.delay(200).springify().mass(0.5)}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Text style={{ color: colors.lightgrey }}>Next Wordle</Text>
            <Text
              style={{
                color: colors.lightgrey,
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              {formatSeconds()}
            </Text>
          </View>

          <Pressable
            onPress={share}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: colors.primary,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: colors.lightgrey,
                fontWeight: 'bold',
                fontSize: 16,
              }}
            >
              Share
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    color: colors.lightgrey,
    textAlign: 'center',
    marginBottom: 8,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  cross: {
    position: 'absolute',
    right: 5,
  },
});

export default EndScreen;
