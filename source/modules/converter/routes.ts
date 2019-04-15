export default [{
  path: '/',
  name: 'converter',
  component: () => import(/* webpackChunkName: "converter" */ './views/ConverterView.vue'),
  meta: {
    title: 'Конвертер валют',
    menuTitle: 'Конвертер'
  }
}];