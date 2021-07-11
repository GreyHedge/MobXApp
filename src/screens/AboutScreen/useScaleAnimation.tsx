import {useCallback} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {SCALE_ANIMATION_DURATION} from '../../constants';

interface IScaleAnimationConfig {
  startValue?: number;
  endValue?: number;
  duration?: number;
  inBetweenCallbackFn: () => void;
}

export const useScaleAnimation = ({
  startValue = 1,
  endValue = 0,
  duration = SCALE_ANIMATION_DURATION,
  inBetweenCallbackFn,
}: IScaleAnimationConfig) => {
  const scale = useSharedValue(startValue);
  const style = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const handleScaleAnimation = useCallback(() => {
    scale.value = withSequence(
      withTiming(endValue, {duration}, isFinished => {
        if (isFinished && inBetweenCallbackFn) {
          runOnJS(inBetweenCallbackFn)();
        }
      }),
      withTiming(startValue, {duration}),
    );
  }, [endValue, startValue, inBetweenCallbackFn]);

  return {style, handleScaleAnimation};
};
