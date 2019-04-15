import Vue from 'vue';
import { Module, ActionTree, ActionContext, MutationTree, GetterTree } from 'vuex';
import { namespace } from 'vuex-class';
import { IRootState } from 'AppStore';
import Http from "@services/HttpService";

export const RatesNamespace = namespace("rates");

export const enum RatesActionTypes {
  RETRIEVE_RATES = 'RETRIEVE_RATES',
  TO_FAVORITES = 'TO_FAVORITES',
  CHANGE_BASE_CURRENCY = 'CHANGE_BASE_CURRENCY'
}

export const enum RatesMutationTypes {
  STORE_RATES = 'STORE_RATES',
  UPDATE_FAVORITES = 'UPDATE_FAVORITES',
  STORE_BASE_CURRENCY = 'STORE_BASE_CURRENCY'
}

export interface IRate {
  name: string;
  cost: number;
  favorite: boolean;
}

export interface IRatesState {
  latest: Array<IRate>;
  date: string;
  baseCurrency: string;
  favorites: Array<string>;
  currencies: Array<string>;
}

export default {
  namespaced: true,

  state: () => <IRatesState>{
    latest: [],
    date: '',
    baseCurrency: 'USD',
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    currencies: []
  },

  actions: <ActionTree<IRatesState, IRootState>>{
    [RatesActionTypes.RETRIEVE_RATES]: async (store: ActionContext<IRatesState, IRootState>): Promise<any> => {
      try {
        const { data } = await Http.get('/latest', {
          params: {
            base: store.state.baseCurrency,
          }
        });
        store.commit(RatesMutationTypes.STORE_RATES, data);
        
      } catch (error) {
        return Promise.reject(error);
      }
    },

    [RatesActionTypes.CHANGE_BASE_CURRENCY]: async (store: ActionContext<IRatesState, IRootState>, payload: string): Promise<any> => {
      try {  
        await store.commit(RatesMutationTypes.STORE_BASE_CURRENCY, payload);
        await store.dispatch(RatesActionTypes.RETRIEVE_RATES);
        
      } catch (error) {
        return Promise.reject(error);
      }
    },

    [RatesActionTypes.TO_FAVORITES]: async (store: ActionContext<IRatesState, IRootState>, payload: number): Promise<any> => {
      try {  
        store.commit(RatesMutationTypes.UPDATE_FAVORITES, payload);
        
      } catch (error) {
        return Promise.reject(error);
      }
    }            
  },

  mutations: <MutationTree<IRatesState>>{
    [RatesMutationTypes.STORE_RATES]: (state: IRatesState, payload: { rates: {[currency: string]: number}, date: string }) => {
      state.latest = Object.keys(payload.rates).map(key => {
        return <IRate>{
          name: key,
          cost: payload.rates[key],
          favorite: state.favorites.indexOf(key) != -1
        }
      });

      state.date = payload.date;

      // Store currencies like this because has no end point for this in api. And for some items api don't return
      // currency that selected as base, so we can't just use getter for currency names
      if (!state.currencies.length) state.currencies = Object.keys(payload.rates);

      Vue.prototype.$money.rates = payload.rates;
    },

    [RatesMutationTypes.STORE_BASE_CURRENCY]: (state: IRatesState, payload: string) => {
      state.baseCurrency = payload;
    },

    [RatesMutationTypes.UPDATE_FAVORITES]: (state: IRatesState, payload: number) => {

      const currencyName = state.latest[payload].name;

      const existenIdx = state.favorites.indexOf(currencyName);
      if (existenIdx == -1) {
        state.favorites.push(currencyName);
        state.latest[payload].favorite = true;
      } else {
        state.favorites.splice(existenIdx, 1);
        state.latest[payload].favorite = false;
      } 

      localStorage.setItem('favorites', JSON.stringify(state.favorites));
      
    }    
  },

  getters: <GetterTree<IRatesState, IRootState>> {
    ratesByFavorites: (state: IRatesState) => {
      return state.latest.sort((a) => {
        if (a.favorite === false) return 1;
        else return -1;
      });
    }
  }
} as Module<IRatesState, IRootState>