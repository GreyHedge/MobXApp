import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Row} from './Row';
import {Title} from '../Text';
import shadow from '../styles/shadow';
import {colors, ESpacings, ERounding} from '../../constants';

interface IProps {
  name: string;
  last: string;
  highestBid: string;
  percentChange: string;
}

export const QuotationCard: React.FC<IProps> = ({
  name,
  last,
  highestBid,
  percentChange,
}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Title large text={name} style={styles.title} />
      <Row title={t('quotations:card:last')} value={last} border />
      <Row title={t('quotations:card:highestBid')} value={highestBid} border />
      <Row title={t('quotations:card:percentChange')} value={percentChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ESpacings.s16,
    backgroundColor: colors.grey,
    borderRadius: ERounding.r8,
    marginBottom: ESpacings.s16,
    marginRight: ESpacings.s4,
    ...shadow,
  },
  title: {
    color: colors.orange,
    marginBottom: ESpacings.s16,
  },
});
