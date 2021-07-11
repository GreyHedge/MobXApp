import React from 'react';
import {Pressable, Platform, StyleSheet, ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';
import {Description} from './Text';
import shadow from './styles/shadow';
import {colors, ERounding, ESpacings, COLOR_BUTTON_HEIGHT} from '../constants';

const RIPPLE_CONFIG = {color: colors.yellow, borderless: false};

interface IProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
}

export class ColorButton extends React.Component<IProps, {}> {
  render() {
    const {text, onPress, style} = this.props;
    return (
      <Pressable
        style={({pressed}) => [
          styles.container,
          style,
          Platform.OS === 'android'
            ? styles.green
            : pressed
            ? styles.yellow
            : styles.green,
        ]}
        onPress={onPress}
        android_ripple={RIPPLE_CONFIG}>
        <Description text={text.toUpperCase()} />
      </Pressable>
    );
  }
}

export const AnimatedColorButton =
  Animated.createAnimatedComponent(ColorButton);

const styles = StyleSheet.create({
  container: {
    height: COLOR_BUTTON_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ERounding.r8,
    marginHorizontal: ESpacings.s8,
    marginBottom: ESpacings.s8,
    ...shadow,
  },
  green: {
    backgroundColor: colors.green,
  },
  yellow: {
    backgroundColor: colors.yellow,
  },
});
