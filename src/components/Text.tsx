import React from 'react';
import {Text, TextStyle, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {EFontSizing, colors} from '../constants';

interface ICommonTextProps {
  text: string;
  medium?: boolean;
  large?: boolean;
  center?: boolean;
  style?: TextStyle | TextStyle[];
}

const CommonText: React.FC<ICommonTextProps> = ({
  text,
  medium,
  large,
  center,
  style,
}) => {
  return (
    <Text
      style={[
        styles.text,
        medium && styles.medium,
        large && styles.large,
        center && styles.center,
        style,
      ]}>
      {text}
    </Text>
  );
};

export class Title extends React.Component<ICommonTextProps, {}> {
  render() {
    const {style, ...props} = this.props;

    return <CommonText style={[styles.title, style]} {...props} />;
  }
}

export const AnimatedTitle = Animated.createAnimatedComponent(Title);

export class Description extends React.Component<ICommonTextProps, {}> {
  render() {
    return <CommonText center medium {...this.props} />;
  }
}

export const AnimatedDescription =
  Animated.createAnimatedComponent(Description);

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: colors.darkBlue,
  },
  text: {
    fontSize: EFontSizing.S,
    color: colors.blue,
  },
  center: {
    textAlign: 'center',
  },
  medium: {
    fontSize: EFontSizing.M,
  },
  large: {
    fontSize: EFontSizing.L,
  },
});
