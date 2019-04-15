<template lang="pug">
#application
  header
    navigation
  main
    router-view
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
import Navigation from '@modules/layout/_components/Navigation.vue';
import { RatesNamespace, RatesActionTypes } from '@modules/rates/store';

@Component({
  components: {
    'navigation': Navigation
  }
})
export default class Layout extends Vue {

  @RatesNamespace.Action(RatesActionTypes.RETRIEVE_RATES) retrieveRates: Function;

  beforeMount() {
    this.retrieveRates();
  }

}
</script>

<style lang="scss" scoped>
#application {
  @include display-flex(column, flex-start, flex-start);
  height: 100%;
  position: relative;
}

main, header {
  padding: 20px;
  @media screen and (max-width: 767px) {
    padding: 10px
  }
}

header {
  @include display-flex(row, space-between, center);
  size: 100% auto;
  background-color: #262730;
}

main {
  width: 100%;
  flex: 1;
}
</style>

