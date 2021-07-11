import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import ru from './ru';
import en from './en';
import {ELanguages} from '../types';

export class Translation {
  constructor(initialLanguage: ELanguages = ELanguages.EN) {
    i18n.use(initReactI18next).init({
      resources: {
        en,
        ru,
      },
      lng: initialLanguage,
      fallbackLng: ELanguages.EN,
      interpolation: {
        escapeValue: false,
      },
    });
  }

  changeLanguage(lan: ELanguages) {
    i18n.changeLanguage(lan);
  }
}
