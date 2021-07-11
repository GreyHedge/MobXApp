import React, {PropsWithChildren, useEffect} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {Button} from '../Button';
import {useAnimateBottomSheet} from './useAnimateBottomSheet';
import {colors, ESpacings} from '../../constants';

interface IProps {
  visible: boolean;
  hide: () => void;
  maxHeight?: number;
  minHeight?: number;
  style?: ViewStyle;
}

export const BottomSheet: React.FC<PropsWithChildren<IProps>> = ({
  children,
  visible,
  hide,
  style,
  maxHeight,
  minHeight,
}) => {
  const {
    hide: rollDown,
    show: rollUp,
    animatedStyle,
    gestureHandler,
  } = useAnimateBottomSheet(maxHeight, minHeight, hide);

  useEffect(() => {
    if (visible) {
      rollUp();
    } else {
      rollDown();
    }
  }, [visible, rollUp, rollDown]);

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.container, animatedStyle, style]}>
        <Button onPress={hide} icon="close" iconSize={ESpacings.s24} />
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopRightRadius: ESpacings.s24,
    borderTopLeftRadius: ESpacings.s24,
    paddingTop: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowColor: colors.blue,
    elevation: 5,
  },
});
