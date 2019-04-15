<template lang="pug">
.page__wrap
  .page__row
    h2 {{ $route.meta.title }}
    .converter
      .converter__col
        currency-input(:options="currencies" v-model="from" :exclude="this.to.currency")
      .converter__col 
        svg.equal(
          xmlns="http://www.w3.org/2000/svg" 
          xmlns:xlink="http://www.w3.org/1999/xlink" 
          x="0px" y="0px" 
          viewBox="0 0 1000 1000" 
          enable-background="new 0 0 1000 1000" 
          xml:space="preserve"
        )
          g(transform="translate(0.000000,192.000000) scale(0.100000,-0.100000)")
            path(d="M4387.5,1081.5C3525.6,937.1,2733.8,547.7,2138.8-21C1482.5-651,1115-1289.8,887.5-2199.8l-48.1-183.7l-367.5-13.1L100-2409.8l691.2-1036.9c376.3-573.1,695.6-1036.9,708.8-1036.9s332.5,463.8,708.8,1036.9L2900-2409.8l-485.6,13.1c-476.9,13.1-481.3,13.1-450.6,109.4c210,682.5,577.5,1246.9,1063.1,1636.3c1041.3,826.9,2450,927.5,3570,253.7L6855-554.8l371.9,376.3l376.2,376.3L7450,324.6c-358.8,297.5-1089.4,608.1-1697.5,726.3C5455,1107.7,4650,1125.2,4387.5,1081.5z")
            path(d="M7791.2-2729.1L7100-3766l485.6-13.1c476.9-13.2,481.2-13.2,450.7-109.4c-288.8-931.9-818.1-1579.4-1640.6-1999.4c-485.7-245-805-319.3-1395.6-323.7c-402.5,0-568.8,17.5-831.3,100.6c-420,126.9-831.2,345.6-1137.5,595c-131.3,109.4-249.4,196.9-262.5,196.9s-188.1-166.2-385-363.1l-363.1-367.5l218.8-196.9c468.1-424.4,1063.1-739.4,1715-918.8C4265-7248.5,4426.9-7266,5000-7266c573.1,0,735,17.5,1045.6,100.6c708.7,192.5,1316.9,533.7,1815.6,1010.6C8517.5-5524.8,8885-4886,9112.5-3976l48.1,183.7l367.5,13.2L9900-3766l-691.2,1036.9C8832.5-2156,8513.1-1692.3,8500-1692.3S8167.5-2156,7791.2-2729.1z")
      .converter__col  
        currency-input(:options="currencies" v-model="to" :exclude="this.from.currency")
  .page__row
    h2 Последние тенденции
    .history__graph
      currency-history(:data="history")
</template>

<script lang="ts">
import Vue from 'vue';
import { Getter } from 'vuex-class';
import { Component, Watch } from 'vue-property-decorator';
import { ConverterNamespace, ConverterActionTypes, IHistoryRate } from '@modules/converter/store';
import { ICurrecnyInputModel } from '@modules/converter/_components/CurrencyInput.vue';

@Component({
  components: {
    'currency-input': () => import(/* webpackChunkName: "converter" */ '@modules/converter/_components/CurrencyInput.vue'),
    'currency-history': () => import(/* webpackChunkName: "converter" */ '@modules/converter/_components/CurrencyHistoryGraph.vue')
  }
})
export default class ConverterView extends Vue {

  @Getter('currencies') currencies: Array<string>;

  @ConverterNamespace.State('history') history: Array<IHistoryRate>;

  @ConverterNamespace.Action(ConverterActionTypes.RETRIEVE_HISTORY) retrieveHistory: Function;

  private from: ICurrecnyInputModel = { currency: 'RUB', amount: 1 };

  private to: ICurrecnyInputModel = { currency: 'USD', amount: 1 };

  @Watch('from', {deep: true}) onFromChange(newValue, oldValue) {
    if (newValue.currency !== oldValue.currency) {
     this.retrieveHistory({
        base: this.to.currency,
        currency: newValue.currency,
      });
    }

    this.to.amount = this.$money(this.from.amount).from(newValue.currency).to(this.to.currency);
  }

  @Watch('to', {deep: true}) onToChange(newValue, oldValue) {
    if (newValue.currency !== oldValue.currency) {
      this.retrieveHistory({
        base: newValue.currency,
        currency: this.from.currency,
      });
    }

    this.from.amount = this.$money(this.to.amount).from(newValue.currency).to(this.from.currency);
  }

  beforeMount() {
    this.retrieveHistory({
      base: this.to.currency,
      currency: this.from.currency,
    }).then(() => {
      this.to.amount = this.$money(this.from.amount).from(this.from.currency).to(this.to.currency)
    });
  }
}
</script>

<style lang="scss" scoped>
.page__wrap {
  @include display-flex(column, space-between, flex-start);
  max-width: 768px;
}

.page__row{
  width: 100%;
  margin-bottom: 40px;
  &:last-of-type {
    margin-bottom: 0;
  }
}

.converter {
  padding: 0 12px;
  @include display-flex(row, space-between, center);

  @media screen and (max-width: 767px) {
    padding: 0;
  }

  &__col {
    @include display-flex(row, space-between, center);
    .equal {
       size: 42px;
       fill: #d3d3d3;
       margin: 10px;
    }
  }

  @media screen and (max-width: 767px) {
    @include display-flex(column, space-between, center);
  }
}
</style>

