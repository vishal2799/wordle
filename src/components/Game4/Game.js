import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { colors, CLEAR, ENTER, colorsToEmoji } from '../../constants';
import Keyboard from '../Keyboard';
import words from '../../words';
import styles from './Game.style';
import { copyArray, getDayOfTheYear, getDayKey } from '../../utils';
import EndScreen from '../EndScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
  ZoomIn,
  FlipInEasyY,
  SlideInLeft,
} from 'react-native-reanimated';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const NUMBER_OF_TRIES = 6;

const dayofTheYear = getDayOfTheYear();
const dayKey = getDayKey();

const Game = ({ navigation }) => {
  const word = words[dayofTheYear];
  const letters = word.split('');

  const [rows, setRows] = useState(
    new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill(''))
  );

  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);
  const [gameState, setGameState] = useState('playing');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (curRow > 0) {
      checkGameState();
    }
  }, [curRow]);

  useEffect(() => {
    if (gameState !== 'playing') {
      navigation.navigate('MyModal');
    }
  }, [gameState]);

  useEffect(() => {
    if (loaded) {
      persistState();
    }
  }, [rows, curCol, curRow, gameState]);

  useEffect(() => {
    readState();
  }, []);

  const persistState = async () => {
    const dataForToday = {
      rows,
      curRow,
      curCol,
      gameState,
    };
    try {
      let existingStateString = await AsyncStorage.getItem('@game');
      let existingState = existingStateString
        ? JSON.parse(existingStateString)
        : {};
      existingState[dayKey] = dataForToday;
      const dataString = JSON.stringify(existingState);
      console.log('Saving', dataString);
      await AsyncStorage.setItem('@game', dataString);
    } catch (e) {
      console.log('failed to write data to async storage', e);
    }
  };

  const readState = async () => {
    const dataString = await AsyncStorage.getItem('@game');
    try {
      const data = JSON.parse(dataString);
      const day = data[dayKey];
      setRows(day.rows);
      setCurCol(day.curCol);
      setCurRow(day.curRow);
      setGameState(day.gameState);
    } catch (e) {
      console.log("Couldn't parse state");
    }
    setLoaded(true);
  };

  const checkGameState = () => {
    if (checkIfWon() && gameState !== 'won') {
      setGameState('won');
    } else if (checkIfLost() && gameState !== 'lost') {
      setGameState('lost');
    }
  };

  const checkIfWon = () => {
    const row = rows[curRow - 1];

    return row.every((letter, i) => letter === letters[i]);
  };

  const checkIfLost = () => {
    return !checkIfWon() && curRow === rows.length;
  };

  const onKeyPressed = (key) => {
    if (gameState !== 'playing') {
      return;
    }
    const updatedRows = copyArray(rows);

    if (key === CLEAR) {
      const prevCol = curCol - 1;
      if (prevCol >= 0) {
        updatedRows[curRow][prevCol] = '';
        setRows(updatedRows);
        setCurCol(prevCol);
      }
      return;
    }

    if (key === ENTER) {
      if (curCol === rows[0].length) {
        setCurRow(curRow + 1);
        setCurCol(0);
      }

      return;
    }

    if (curCol < rows[0].length) {
      updatedRows[curRow][curCol] = key;
      setRows(updatedRows);
      setCurCol(curCol + 1);
    }
  };

  const isCellActive = (row, col) => {
    return row === curRow && col === curCol;
  };

  const getCellBGColor = (row, col) => {
    const letter = rows[row][col];
    if (row >= curRow) {
      return colors.black;
    }
    if (letter === letters[col]) {
      return colors.primary;
    }
    if (letters.includes(letter)) {
      return colors.secondary;
    }
    return colors.darkgrey;
  };

  const getAllLettersWithColor = (color) => {
    return rows.flatMap((row, i) =>
      row.filter((cell, j) => getCellBGColor(i, j) === color)
    );
  };

  const greenCaps = getAllLettersWithColor(colors.primary);
  const yellowCaps = getAllLettersWithColor(colors.secondary);
  const greyCaps = getAllLettersWithColor(colors.darkgrey);

  const getCellStyle = (i, j) => [
    styles.cell,
    {
      borderColor: isCellActive(i, j) ? colors.lightgrey : colors.darkgrey,
      backgroundColor: getCellBGColor(i, j),
    },
  ];

  if (!loaded) {
    return <ActivityIndicator />;
  }

  // if (gameState !== 'playing') {
  //   return (
  //     <EndScreen
  //       won={gameState === 'won'}
  //       rows={rows}
  //       getCellBGColor={getCellBGColor}
  //     />
  //   );
  // }

  if (gameState !== 'playing') {
    if (gameState === 'won') {
      alert('You won');
    }
    if (gameState === 'lost') {
      alert('You lost');
    }
    navigation.navigate('MyModal');
  }

  return (
    <>
      <SafeAreaView style={styles2.container}>
        <StatusBar style='light' />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginBottom: 15,
            marginTop: 5,
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Pressable
              style={[
                styles2.button5,
                { backgroundColor: 'blue', marginRight: 10 },
              ]}
              onPress={() => navigation.navigate('HelpModal')}
            >
              <Entypo name='help' size={18} color='white' />
            </Pressable>
            <Pressable
              style={[styles2.button5, { backgroundColor: 'blue' }]}
              onPress={() => navigation.navigate('MyModal')}
            >
              <Entypo name='bar-graph' size={18} color='white' />
            </Pressable>
          </View>
          {/* <View>
          <Text style={styles2.classicText}>Classic</Text>
        </View> */}
          <Pressable
            style={[styles2.button5, { backgroundColor: 'orange' }]}
            onPress={() => navigation.navigate('SettingsModal')}
          >
            <Entypo name='cog' size={18} color='white' />
          </Pressable>
        </View>
        <ScrollView style={styles.map}>
          {rows.map((row, i) => (
            <Animated.View
              entering={SlideInLeft.delay(i * 50)}
              key={`row1-${i}`}
              style={styles.row}
            >
              {row.map((letter, j) => (
                <>
                  {i < curRow && (
                    <Animated.View
                      entering={FlipInEasyY.delay(j * 100)}
                      key={`cell-color-${i}-${j}`}
                      style={getCellStyle(i, j)}
                    >
                      <Text style={styles.cellText}>
                        {letter.toUpperCase()}
                      </Text>
                    </Animated.View>
                  )}
                  {i === curRow && !!letter && (
                    <Animated.View
                      entering={ZoomIn}
                      key={`cell-active-${i}-${j}`}
                      style={getCellStyle(i, j)}
                    >
                      <Text style={styles.cellText}>
                        {letter.toUpperCase()}
                      </Text>
                    </Animated.View>
                  )}
                  {!letter && (
                    <View key={`cell-${i}-${j}`} style={getCellStyle(i, j)}>
                      <Text style={styles.cellText}>
                        {letter.toUpperCase()}
                      </Text>
                    </View>
                  )}
                </>
              ))}
            </Animated.View>
          ))}
        </ScrollView>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginBottom: 15,
            marginTop: 5,
          }}
        >
          <Pressable
            style={[styles2.button5, { backgroundColor: 'blue' }]}
            onPress={() => navigation.navigate('Home')}
          >
            <Entypo name='home' size={18} color='white' />
          </Pressable>
          {gameState === 'playing' ? (
            <>
              <Pressable
                style={styles2.button2}
                onPress={() => onKeyPressed(ENTER)}
              >
                <Text style={styles2.text2}>Submit</Text>
              </Pressable>
              <View></View>
              {/* <Pressable
              style={[styles2.button5, { backgroundColor: 'orange' }]}
              onPress={() => navigation.navigate('MyModal')}
            >
              <Entypo name='light-bulb' size={24} color='white' />
            </Pressable> */}
            </>
          ) : (
            <>
              <View>
                <Text style={styles2.text2}>
                  You {gameState === 'won' ? 'Won' : ''}
                  {gameState === 'lost' ? 'Lost' : ''}.
                </Text>
              </View>
              <View></View>
            </>
          )}
        </View>

        <Keyboard
          onKeyPressed={onKeyPressed}
          greenCaps={greenCaps}
          yellowCaps={yellowCaps}
          greyCaps={greyCaps}
        />
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

export default Game;

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'green',
  },
  button5: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'green',
  },
  text2: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  classicText: {
    fontSize: 26,
    lineHeight: 27,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
