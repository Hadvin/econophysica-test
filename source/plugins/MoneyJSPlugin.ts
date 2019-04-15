import _Vue from "vue";
import fx from 'money';

export default function EventBusPlugin(Vue: typeof _Vue, options?: any): void {
  Vue.prototype.$money = fx;
}