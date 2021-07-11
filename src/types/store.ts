import {AppStore} from '../store/appStore';
import {QuotationsStore} from '../store/quotationsStore';

export interface IRootStore {
  appStore: AppStore;
  quotationsStore: QuotationsStore;
}
