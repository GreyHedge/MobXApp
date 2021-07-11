import React, {createContext, useContext, PropsWithChildren} from 'react';
import {ApiClient} from '../apiClient';
import {QuotationsStore} from './quotationsStore';
import {AppStore} from './appStore';
import {BASE_URL, TIMEOUT} from '../constants';
import {IRootStore, ELanguages} from '../types';

const apiClient = new ApiClient({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

const rootStore: IRootStore = {
  appStore: new AppStore(ELanguages.RU),
  quotationsStore: new QuotationsStore(apiClient),
};

const RootContext = createContext<IRootStore>(rootStore);

export const StoreProvider: React.FC<PropsWithChildren<{}>> = ({children}) => {
  return (
    <RootContext.Provider value={rootStore}>{children}</RootContext.Provider>
  );
};

export const useAppStore = () => useContext(RootContext).appStore;

export const useQuotationsStore = () => useContext(RootContext).quotationsStore;
