import React, {ReactElement, useEffect, useCallback} from 'react';
import {
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  ListRenderItem,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {FadeInComponent} from './FadeInComponent';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

interface IListProps<T> extends FlatListProps<T> {
  itemsToFadeIn?: number;
  durationPerItem?: number;
  renderItem: ListRenderItem<T>;
}

export const FadeInList = <T,>({
  itemsToFadeIn = 5,
  durationPerItem = 100,
  renderItem: originalRenderItem,
  ...props
}: IListProps<T>): ReactElement => {
  const currentFadeInIndex = useSharedValue(0);

  const renderItem = useCallback(
    (info: ListRenderItemInfo<T>) => {
      const {index} = info;

      if (index < itemsToFadeIn) {
        return (
          <FadeInComponent
            index={index}
            currentFadeInIndex={currentFadeInIndex}>
            {originalRenderItem(info)}
          </FadeInComponent>
        );
      }

      return originalRenderItem(info);
    },
    [originalRenderItem],
  );

  useEffect(() => {
    currentFadeInIndex.value = withTiming(itemsToFadeIn + 1, {
      duration: itemsToFadeIn * durationPerItem,
      easing: Easing.linear,
    });
  }, [itemsToFadeIn, durationPerItem]);

  return <AnimatedFlatList {...props} renderItem={renderItem} />;
};
