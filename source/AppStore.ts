import Vue from 'vue';
import Vuex, { StoreOptions, GetterTree } from 'vuex';

import converter, { IConverterState } from '@modules/converter/store';
import rates, { IRatesState } from '@modules/rates/store';

Vue.use(Vuex);

export interface IRootState {
  version: string;
  rates: IRatesState
  converter: IConverterState
}

/**
 * Fabric function that creates new store instance for easy SSR implementation in future
 *
 * @returns {Vuex.Store}
 */
export default () => {
  return new Vuex.Store<IRootState>({
    state: () => <IRootState>{
      version: '1.0.0',
    },
    modules: {
      converter,
      rates
    },
    // Getter to share currencies list between modules, so we don't need to map rates store in converter module
    getters: <GetterTree<IRootState, IRootState>>{
      currencies: (state: IRootState) => state.rates.currencies
    }
  } as StoreOptions<IRootState>);
};