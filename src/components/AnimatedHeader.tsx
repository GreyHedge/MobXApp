import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import {Button} from './Button';
import {Title} from './Text';
import {EScreens, MainStackNavigationProp} from '../navigation';
import {colors, ESpacings} from '../constants';

interface IProps {
  title: string;
  style: Animated.AnimatedStyleProp<ViewStyle>;
  backButton?: boolean;
}

export const AnimatedHeader: React.FC<IProps> = props => {
  const {title, backButton, style} = props;
  const {goBack} =
    useNavigation<MainStackNavigationProp<EScreens.QUOTATION_LIST_SCREEN>>();

  return (
    <Animated.View style={[styles.container, style]}>
      {backButton && (
        <Button icon="arrowleft" onPress={goBack} style={styles.backButton} />
      )}
      <Title text={title} large />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 10,
    backgroundColor: colors.white,
  },
  backButton: {
    position: 'absolute',
    left: ESpacings.s0,
    justifyContent: 'center',
  },
});
