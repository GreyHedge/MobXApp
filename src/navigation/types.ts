import {NavigationProp} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';

export enum EScreens {
  ABOUT_SCREEN = 'AboutScreen',
  QUOTATION_LIST_SCREEN = 'QuotationListScreen',
}

export type MainStackParamList = {
  [EScreens.ABOUT_SCREEN]: undefined;
  [EScreens.QUOTATION_LIST_SCREEN]: undefined;
};

export type MainStackScreenProps<T extends keyof MainStackParamList> =
  StackScreenProps<MainStackParamList, T>;

export type MainStackNavigationProp<T extends keyof MainStackParamList> =
  NavigationProp<MainStackParamList, T>;
