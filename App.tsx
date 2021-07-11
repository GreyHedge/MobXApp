import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, LogBox} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import './src/translations';
import {StoreProvider} from './src/store';
import {MainStack} from './src/navigation';
import {colors} from './src/constants';

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <StoreProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <MainStack />
        </SafeAreaView>
      </SafeAreaProvider>
    </StoreProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default App;
