import { StyleSheet } from 'react-native';
import Game4 from './src/components/Game4';
import Game5 from './src/components/Game5';
import { colors } from './src/constants';
import Home from './src/components/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HelpScreen from './src/components/HelpScreen/HelpScreen';
import SettingsScreen from './src/components/SettingsScreen/SettingsScreen';
import { GameProvider } from './src/components/Game4/context';
import EndScreen from './src/components/EndScreen2/EndScreen';
import { SettingsProvider } from './src/context/settings';

import 'expo-dev-client';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <SafeAreaView style={styles.container}>
    //   <StatusBar style='light' />

    //   <Text style={styles.title}>WORDLE</Text>

    //   {/* <Game2 type='practice' /> */}
    //   <Game />
    // </SafeAreaView>
    <SettingsProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Game' component={Game4} />
          <Stack.Screen name='Game2' component={Game5} />
          <Stack.Screen
            name='MyModal'
            component={EndScreen}
            options={{
              presentation: 'transparentModal',
            }}
          />
          <Stack.Screen
            name='HelpModal'
            component={HelpScreen}
            options={{
              presentation: 'transparentModal',
            }}
          />
          <Stack.Screen
            name='SettingsModal'
            component={SettingsScreen}
            options={{
              presentation: 'transparentModal',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SettingsProvider>
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
