export default [{
  path: '/rates',
  name: 'rates',
  component: () => import(/* webpackChunkName: "rates" */ './views/RatesView.vue'),
  meta: {
    title: 'Курс',
    menuTitle: 'Обменный курс'
  }
}];