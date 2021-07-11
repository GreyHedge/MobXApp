import {useEffect} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import {
  TRANSITION_ANIMATION_DURATION,
  TRANSITION_ANIMATION_CONFIG,
} from '../../constants';

export enum EAnimationDirection {
  HORIZONTAL = 'X',
  VERTICAL = 'Y',
}

interface ITransitionAnimationConfig {
  startPosition?: number;
  endPosition?: number;
  direction?: EAnimationDirection;
  duration?: number;
  delay?: number;
}

export const useTransitionAnimation = ({
  startPosition = 0,
  endPosition = 0,
  direction = EAnimationDirection.HORIZONTAL,
  duration = TRANSITION_ANIMATION_DURATION,
  delay = 0,
}: ITransitionAnimationConfig) => {
  const position = useSharedValue(startPosition);
  const style = useAnimatedStyle(() => {
    if (direction === EAnimationDirection.HORIZONTAL) {
      return {
        transform: [{translateX: position.value}],
      };
    }
    return {
      transform: [{translateY: position.value}],
    };
  });

  useEffect(() => {
    if (delay) {
      position.value = withDelay(
        delay,
        withSpring(endPosition, TRANSITION_ANIMATION_CONFIG),
      );
    } else {
      position.value = withSpring(endPosition, TRANSITION_ANIMATION_CONFIG);
    }
  }, [delay, duration, endPosition]);

  return style;
};
