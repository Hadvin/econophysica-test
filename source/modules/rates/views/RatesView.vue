<template lang="pug">
.page__wrap
  .currency__selector
    span Курс
    select(:value="baseCurrency" @change="changeBaseCurrency($event.target[$event.target.selectedIndex].value)")
      option(v-for="(currency, index) in currencies" :key="index" :value="currency") {{ currency }}
    span на {{ displayDate }}

  table.rates__table
    thead.rates__table_head
      tr
        th &nbsp;
        th Валюта
        th Стоимость
    tbody.rates__table_body
      tr(v-for="(currency, index) in ratesByFavorites" :key="index")
        td #[favorite-button(@on-pressed="toFavorites(index)" :is-active="currency.favorite")]
        td {{ currency.name }}
        td {{ currency.cost }}
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import moment from 'moment';
import { State, Getter } from 'vuex-class';
import { RatesNamespace, RatesActionTypes, IRate } from '@modules/rates/store';

@Component({
  components: {
    'favorite-button': () => import(/* webpackChunkName: "rates" */ '@modules/rates/_components/FavoriteButton.vue') 
  }
})
export default class RatesView extends Vue {

  @Getter('currencies') currencies: Array<string>;

  @RatesNamespace.State('baseCurrency') baseCurrency: string;

  @RatesNamespace.State('date') date: string;

  @RatesNamespace.Getter('ratesByFavorites') ratesByFavorites: Array<IRate>;

  @RatesNamespace.Action(RatesActionTypes.CHANGE_BASE_CURRENCY) changeBaseCurrency: Function;

  @RatesNamespace.Action(RatesActionTypes.TO_FAVORITES) toFavorites: Function;

  get displayDate() {
    return this.date ? moment(this.date, 'YYYY-MM-DD').format('D MMMM YYYY') : '';
  }
}
</script>

<style lang="scss" scoped>
.page__wrap {
  max-width: 768px;
}

.rates__table {
  width: 100%;
  
  &_head {
    text-align: left;
    tr { background-color: #262730 ; color: white;}
  }
  &_body {
    tr:nth-child(odd) { background-color: #f0f0f0 }
    td :first-of-type { width: 48px }
  }

  th, td {
    padding: 10px 10px;
    font-size: 14px;
  }
}

.currency__selector {
  font-size: 18px;
  font-weight: 500;
  max-width: 320px;
  margin-bottom: 20px;
  @include display-flex(row, flex-start, center);

  select {
    border: none;
    margin: 0 10px;
    background: #F5F5F5;
    border-bottom: 1px dotted #FF5C57;
    color: #FF5C57;
    -webkit-appearance: none; 
    -moz-appearance: none;
    appearance: none;
    size: 52px 22px;
    cursor: pointer;

    option {
      color: $mainTextColor;
    }
  }
}
</style>

