import React from 'react';
import {
  View,
  ActivityIndicator,
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';
import {useQuotationsStore} from '../../store';
import {
  Error,
  QuotationCard,
  FadeInList,
  AnimatedHeader,
} from '../../components';
import {useGetAndUpdateQuotations} from './useGetAndUpdateQuotations';
import {useAnimateHeader} from './useAnimateHeader';
import {colors, ESpacings, MAX_ANIMATED_HEADER_HEIGHT} from '../../constants';
import {IQuotation, ERequestState} from '../../types';

const keyExtractor = (item: [string, IQuotation]) => item[0];

const renderItem = (info: ListRenderItemInfo<[string, IQuotation]>) => {
  const [name, {last, highestBid, percentChange}] = info.item;

  return (
    <QuotationCard
      name={name}
      last={last}
      highestBid={highestBid}
      percentChange={percentChange}
    />
  );
};

export const QuotationListScreen: React.FC = observer(() => {
  const {quotations, quotationsRequestState: state} = useQuotationsStore();
  const {t} = useTranslation();
  const {scrollHandler, animatedStyle} = useAnimateHeader();

  useGetAndUpdateQuotations();

  return (
    <View style={styles.container}>
      <AnimatedHeader
        title={t('quotations:title')}
        backButton
        style={animatedStyle}
      />
      {state === ERequestState.ERROR && <Error />}
      {!quotations && state === ERequestState.PENDING && (
        <ActivityIndicator color={colors.green} />
      )}
      {quotations && (
        <FadeInList
          data={Object.entries(quotations)}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          bounces={false}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  list: {
    paddingHorizontal: ESpacings.s16,
    paddingTop: MAX_ANIMATED_HEADER_HEIGHT + ESpacings.s16,
  },
});
