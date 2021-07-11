import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Title, Description} from '../Text';
import {colors, ESpacings} from '../../constants';

interface IProps {
  title: string;
  value: string;
  border?: boolean;
}

export const Row: React.FC<IProps> = ({title, value, border}) => {
  return (
    <View style={[styles.row, border ? styles.border : null]}>
      <Title text={title} medium />
      <Description text={value} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: ESpacings.s4,
  },
  border: {
    borderBottomColor: colors.darkGrey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
