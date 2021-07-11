import React, {PropsWithChildren} from 'react';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

interface IComponentProps {
  index: number;
  currentFadeInIndex: Animated.SharedValue<number>;
}

export const FadeInComponent: React.FC<PropsWithChildren<IComponentProps>> = ({
  children,
  index,
  currentFadeInIndex,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      currentFadeInIndex.value,
      [index - 1, index, index + 1, index + 2],
      [0, 0, 1, 1],
      Extrapolate.CLAMP,
    );

    return {opacity};
  });

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};
