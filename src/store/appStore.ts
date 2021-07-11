import {makeAutoObservable} from 'mobx';
import {Translation} from '../translations';
import {ELanguages} from '../types';

export class AppStore {
  language: ELanguages;
  translation: Translation;

  constructor(language: ELanguages) {
    this.language = language;
    this.translation = new Translation(language);
    makeAutoObservable(this);
  }

  changeLanguage = (language: ELanguages) => {
    this.language = language;
    this.translation.changeLanguage(language);
  };
}
