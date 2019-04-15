import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import converterRoutes from '@modules/converter/routes';
import ratesRoutes from '@modules/rates/routes';

/**
 * Fabric function that creates new router instance for easy SSR implementation in future
 *
 * @returns {Router}
 */
export default (): Router => {
  return new Router({
    routes: [...converterRoutes, ...ratesRoutes],
    mode: 'history'
  });
}