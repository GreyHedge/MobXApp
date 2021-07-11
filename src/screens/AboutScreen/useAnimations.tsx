import {Dimensions} from 'react-native';
import {
  useTransitionAnimation,
  EAnimationDirection,
} from './useTransitionAnimation';
import {useScaleAnimation} from './useScaleAnimation';
import {
  TRANSITION_ANIMATION_DURATION,
  ESpacings,
  COLOR_BUTTON_HEIGHT,
} from '../../constants';

const {width} = Dimensions.get('window');

export const useAnimations = (inBetweenCallbackFn: () => void) => {
  const titleStyle = useTransitionAnimation({startPosition: width});
  const descriptionStyle = useTransitionAnimation({
    startPosition: width,
    delay: TRANSITION_ANIMATION_DURATION,
  });
  const buttonStyle = useTransitionAnimation({
    startPosition: COLOR_BUTTON_HEIGHT + ESpacings.s8,
    delay: TRANSITION_ANIMATION_DURATION * 2,
    direction: EAnimationDirection.VERTICAL,
  });
  const {style: scaleStyle, handleScaleAnimation} = useScaleAnimation({
    inBetweenCallbackFn,
  });

  return {
    titleStyle,
    descriptionStyle,
    buttonStyle,
    scaleStyle,
    handleScaleAnimation,
  };
};
