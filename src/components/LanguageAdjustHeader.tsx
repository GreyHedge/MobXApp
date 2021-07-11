import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from './Button';

interface IProps {
  onPress: () => void;
}

export const LanguageAdjustHeader: React.FC<IProps> = ({onPress}) => {
  return (
    <View style={styles.container}>
      <Button icon="earth" onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
