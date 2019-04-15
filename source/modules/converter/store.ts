import { Module, ActionTree, ActionContext, MutationTree } from 'vuex';
import { namespace } from 'vuex-class';
import { IRootState } from 'AppStore';
import Http from "@services/HttpService";
import moment from 'moment';

export const ConverterNamespace = namespace("converter");

export const enum ConverterActionTypes {
  RETRIEVE_HISTORY = 'RETRIEVE_HISTORY'
}

export const enum ConverterMutationTypes {
  STORE_HISTORY = 'STORE_HISTORY'
}

export interface IHistoryRate {
  t: string,
  y: number
}

export interface IConverterState {
  history: Array<IHistoryRate>
}

export default {
  namespaced: true,
  state: () => <IConverterState>{
    history: []
  },

  actions: <ActionTree<IConverterState, IRootState>>{
    [ConverterActionTypes.RETRIEVE_HISTORY]: async (store: ActionContext<IConverterState, IRootState>, payload: { base: string, currency: string}): Promise<any> => {
      try {
        const { data } = await Http.get('/history', {
          params: {
            start_at: moment().subtract(1, 'month').format('YYYY-MM-DD'),
            end_at: moment().format('YYYY-MM-DD'),
            symbols: payload.currency,
            base: payload.base
          }
        });
  
        store.commit(ConverterMutationTypes.STORE_HISTORY, { rates: data.rates, symbol: payload.currency});
        
      } catch (error) {
        return Promise.reject(error);
      }
    }    
  },

  mutations: <MutationTree<IConverterState>>{
    [ConverterMutationTypes.STORE_HISTORY]: (state: IConverterState, payload: { rates: any, symbol: string }) => {
      // Map data to fit ChartJS requirements
      const mappedForGraph = Object.keys(payload.rates).map(key => <IHistoryRate>{ t: key, y: payload.rates[key][payload.symbol] });

      // And sort it because `https://api.exchangeratesapi.io/history` response data sorted incorrectly
      state.history = mappedForGraph.sort((a, b) => {
        if (a.t < b.t) return -1;
        if (a.t > b.t) return 1;
        return 0;
      });
    }
  },
  
} as Module<IConverterState, IRootState>