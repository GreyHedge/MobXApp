import React, {PropsWithChildren, useCallback, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';
import {LanguageAdjustHeader, Button, BottomSheet} from '../../components';
import {useAppStore} from '../../store';
import {colors, ESpacings, languages} from '../../constants';
import {ELanguages} from '../../types';

interface IProps {
  changeLanguage: () => void;
}

export const LanguageWrapper: React.FC<PropsWithChildren<IProps>> = observer(
  ({children, changeLanguage}) => {
    const {t} = useTranslation();
    const {language: currentLanguage} = useAppStore();
    const [isBottomSheetVisible, setIsBottomSheetVisible] =
      useState<boolean>(false);

    const showBottomSheet = useCallback(() => {
      setIsBottomSheetVisible(true);
    }, []);

    const hideBottomSheet = useCallback(() => {
      setIsBottomSheetVisible(false);
    }, []);

    return (
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <LanguageAdjustHeader onPress={showBottomSheet} />
          {children}
        </ScrollView>
        <BottomSheet
          visible={isBottomSheetVisible}
          style={styles.bottomSheet}
          hide={hideBottomSheet}>
          {languages.map((language: ELanguages) => {
            const handlePress = () => {
              hideBottomSheet();
              if (language !== currentLanguage) {
                changeLanguage();
              }
            };
            return (
              <Button
                key={language}
                text={t(`about:languages:${language}`)}
                onPress={handlePress}
                icon={language === currentLanguage ? 'check' : ''}
                style={styles.button}
              />
            );
          })}
        </BottomSheet>
      </>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  textContainer: {
    flex: 1,
    padding: ESpacings.s16,
    paddingTop: ESpacings.s32,
    alignItems: 'center',
  },
  bottomSheet: {
    alignItems: 'flex-end',
  },
  button: {
    paddingTop: 0,
    width: '100%',
    alignItems: 'center',
  },
});
