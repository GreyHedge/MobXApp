import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AboutScreen, QuotationListScreen} from '../screens';
import {EScreens, MainStackParamList} from './types';

const Stack = createStackNavigator<MainStackParamList>();

export const MainStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name={EScreens.ABOUT_SCREEN} component={AboutScreen} />
        <Stack.Screen
          name={EScreens.QUOTATION_LIST_SCREEN}
          component={QuotationListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
