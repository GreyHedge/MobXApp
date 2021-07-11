import React from 'react';
import {View, Pressable, Platform, StyleSheet, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {ESpacings, colors} from '../constants';
import {Description} from './Text';

const RIPPLE_CONFIG = {color: colors.grey, borderless: false};

interface IProps {
  onPress: () => void;
  icon?: string;
  iconSize?: number;
  text?: string;
  style?: ViewStyle;
}

export const Button: React.FC<IProps> = ({
  onPress,
  text,
  icon,
  iconSize = ESpacings.s32,
  style,
}) => {
  return (
    <Pressable
      style={[styles.container, style]}
      onPress={onPress}
      android_ripple={RIPPLE_CONFIG}>
      {({pressed}) => {
        const color =
          Platform.OS === 'ios' && pressed ? colors.darkGrey : colors.darkBlue;

        return (
          <View style={styles.button}>
            {!!icon && <Icon name={icon} size={iconSize} color={color} />}
            {!!text && <Description text={text} style={{color}} />}
          </View>
        );
      }}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ESpacings.s16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
