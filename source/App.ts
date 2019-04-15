import "./stylesheets/global.scss";
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import { Store } from 'vuex';
import VueRouter from 'vue-router';
import moment from 'moment';

import MoneyJSPlugin from '@plugins/MoneyJSPlugin';
import storeFabric from 'AppStore';
import routerFabric from 'AppRouter';
import Layout from '@modules/layout/Layout.vue';

moment.locale("ru");

Vue.use(MoneyJSPlugin);

/**
 * Application entry point
 *
 * @class App
 * @extends {Vue}
 */
class App extends Vue {
  
  constructor(store: Store<{}>, router: VueRouter) {
    sync(store, router);

    super({
      el: '#root',
      store: store,
      router: router,
      render: createElement => createElement(Layout)
    });    
  }
}

new App(storeFabric(), routerFabric());