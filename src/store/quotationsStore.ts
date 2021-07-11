import {makeAutoObservable, runInAction} from 'mobx';
import {IApiClient, IQuotationMap, ERequestState} from '../types';
import {QUOTATIONS_URL} from '../constants';

export class QuotationsStore {
  quotations: IQuotationMap | null = null;
  quotationsRequestState: ERequestState | null = null;
  private apiClient: IApiClient;

  constructor(apiClient: IApiClient) {
    makeAutoObservable(this);
    this.apiClient = apiClient;
  }

  getQuotations = async () => {
    this.quotationsRequestState = ERequestState.PENDING;
    try {
      const res = await this.apiClient.get<IQuotationMap>(QUOTATIONS_URL);
      runInAction(() => {
        this.quotations = res.data;
        this.quotationsRequestState = ERequestState.SUCCESS;
      });
    } catch (err) {
      runInAction(() => {
        this.quotationsRequestState = ERequestState.ERROR;
      });
    }
  };

  clearQuotations = () => (this.quotations = null);
}
