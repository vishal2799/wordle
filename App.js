import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import Game2 from './src/components/Game2';
import { colors } from './src/constants';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />

      <Text style={styles.title}>WORDLE</Text>

      <Game2 type='practice' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.lightgrey,
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 7,
  },
});
