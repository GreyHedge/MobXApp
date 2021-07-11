import {useCallback} from 'react';
import {Dimensions} from 'react-native';
import {PanGestureHandlerGestureEvent} from 'react-native-gesture-handler';
import {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const MAX_BOTTOM_SHEET_HEIGHT = 250;
const MIN_BOTTOM_SHEET_HEIGHT = 0;

const {height} = Dimensions.get('window');

const springConfig = {
  damping: 80,
  stiffness: 500,
  overshootClamping: true,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1,
};
const timeConfig = {
  duration: 100,
};

export const useAnimateBottomSheet = (
  maxHeight: number = MAX_BOTTOM_SHEET_HEIGHT,
  minHeight: number = MIN_BOTTOM_SHEET_HEIGHT,
  onSwipeComplete?: () => void,
) => {
  const top = useSharedValue(height - minHeight);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: top.value,
    };
  });

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {topStart: number}
  >(
    {
      onStart: (e, ctx) => (ctx.topStart = top.value),
      onActive: (e, ctx) => {
        if (ctx.topStart + e.translationY < height - maxHeight) return;
        top.value = ctx.topStart + e.translationY;
      },
      onEnd: () => {
        if (top.value > height - maxHeight / 2) {
          top.value = height - minHeight;
          onSwipeComplete && runOnJS(onSwipeComplete)();
        } else {
          top.value = height - maxHeight;
        }
      },
    },
    [maxHeight, minHeight, onSwipeComplete],
  );

  const hide = useCallback(() => {
    top.value = withTiming(height - minHeight, timeConfig);
  }, [minHeight]);

  const show = useCallback(() => {
    top.value = withSpring(height - maxHeight, springConfig);
  }, [maxHeight]);

  return {
    hide,
    show,
    animatedStyle,
    gestureHandler,
  };
};
