import Vue from 'vue'
import fx from 'money';

declare module 'vue/types/vue' {
  export interface Vue {
    $money: fx,
  }
}