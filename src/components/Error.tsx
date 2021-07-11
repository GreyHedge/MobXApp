import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {colors, ESpacings, ERounding, EFontSizing} from '../constants';

export const Error: React.FC = () => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('quotations:error')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ESpacings.s16,
    backgroundColor: colors.pink,
    borderRadius: ERounding.r8,
    borderColor: colors.red,
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 3,
  },
  text: {
    fontSize: EFontSizing.S,
    color: colors.blue,
  },
});
