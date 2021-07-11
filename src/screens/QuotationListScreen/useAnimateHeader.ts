import {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  MAX_ANIMATED_HEADER_HEIGHT,
  MIN_ANIMATED_HEADER_HEIGHT,
} from '../../constants';

const clamp = (value: number, lowerBound: number, upperBound: number) => {
  'worklet';
  return Math.min(Math.max(lowerBound, value), upperBound);
};

export const useAnimateHeader = (
  maxHeight: number = MAX_ANIMATED_HEADER_HEIGHT,
  minHeight: number = MIN_ANIMATED_HEADER_HEIGHT,
) => {
  const inputRange = [minHeight, maxHeight];
  const translateY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler<{yPrev: number | undefined}>(
    {
      onScroll: (e, ctx) => {
        const prev = ctx.yPrev ?? 0;
        const diff = e.contentOffset.y - prev;
        translateY.value = clamp(translateY.value + diff, minHeight, maxHeight);
        ctx.yPrev = e.contentOffset.y;
      },
    },
    [maxHeight, minHeight],
  );
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      inputRange,
      [1, 0],
      Extrapolate.CLAMP,
    );

    const translate = interpolate(
      translateY.value,
      inputRange,
      [minHeight, -maxHeight],
      Extrapolate.CLAMP,
    );

    return {
      height: maxHeight,
      opacity,
      transform: [{translateY: translate}],
    };
  }, [maxHeight, minHeight]);

  return {
    scrollHandler,
    animatedStyle,
  };
};
