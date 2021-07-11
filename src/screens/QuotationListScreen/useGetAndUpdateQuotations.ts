import {useEffect, useRef} from 'react';
import {AppState} from 'react-native';
import {useQuotationsStore} from '../../store';

const INTERVAL = 5 * 60000;

export const useGetAndUpdateQuotations = () => {
  const {getQuotations, clearQuotations} = useQuotationsStore();
  const intervaiIdRef = useRef<Timeout>(null);

  const handleAppStateChange = (nextAppState: string) => {
    if (nextAppState !== 'active') {
      clearInterval(intervaiIdRef.current);
    } else {
      intervaiIdRef.current = setInterval(() => {
        getQuotations();
      }, INTERVAL);
    }
  };

  useEffect(() => {
    getQuotations();
    AppState.addEventListener('change', handleAppStateChange);
    intervaiIdRef.current = setInterval(() => {
      getQuotations();
    }, INTERVAL);

    return () => {
      clearInterval(intervaiIdRef.current);
      clearQuotations();
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);
};
