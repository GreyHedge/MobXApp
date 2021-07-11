import React, {useCallback} from 'react';
import {Image, StyleSheet} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';
import Animated from 'react-native-reanimated';
import {
  AnimatedColorButton,
  AnimatedTitle,
  AnimatedDescription,
} from '../../components';
import {LanguageWrapper} from './LanguageWrapper';
import {useAnimations} from './useAnimations';
import {EScreens, MainStackScreenProps} from '../../navigation';
import {useAppStore} from '../../store';
import {colors, ESpacings} from '../../constants';
import {ELanguages} from '../../types';

export const AboutScreen: React.FC<
  MainStackScreenProps<EScreens.ABOUT_SCREEN>
> = observer(({navigation}) => {
  const {t} = useTranslation();
  const {language: currentLanguage, changeLanguage} = useAppStore();

  const handleContinuePress = useCallback(() => {
    navigation.navigate(EScreens.QUOTATION_LIST_SCREEN);
  }, [navigation]);

  const handleChangeLanguage = useCallback(() => {
    currentLanguage === ELanguages.RU
      ? changeLanguage(ELanguages.EN)
      : changeLanguage(ELanguages.RU);
  }, [currentLanguage]);

  const {
    titleStyle,
    descriptionStyle,
    buttonStyle,
    scaleStyle,
    handleScaleAnimation: handleChangeLanguageWithAnimation,
  } = useAnimations(handleChangeLanguage);

  return (
    <LanguageWrapper changeLanguage={handleChangeLanguageWithAnimation}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../../../assets/images/chart.png')}
      />
      <Animated.View style={[styles.textContainer, scaleStyle]}>
        <AnimatedTitle
          text={t('about:text:title')}
          large
          style={[styles.marginBottom, titleStyle]}
        />
        <Animated.View style={[descriptionStyle]}>
          <AnimatedDescription text={t('about:text:sentence1')} />
          <AnimatedDescription text={t('about:text:sentence2')} />
        </Animated.View>
      </Animated.View>
      <AnimatedColorButton
        text={t('about:button').toUpperCase()}
        onPress={handleContinuePress}
        style={buttonStyle}
      />
    </LanguageWrapper>
  );
});

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
  image: {
    width: '100%',
  },
  marginBottom: {
    marginBottom: ESpacings.s16,
  },
});
