<template lang="pug">
nav.menu
  ul.menu__wrap
    li.menu__item(v-for="route in $router.options.routes")
      router-link.menu__link(:to="{name: route.name}") {{ route.meta.menuTitle }}
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Layout extends Vue {}
</script>

<style lang="scss" scoped>
.menu {
  &__wrap {
    list-style: none;
    padding: 0;
    margin: 0;
    @include display-flex(row, space-between, center);
  }
  &__item {
    margin: 0 10px;
    &:first-of-type { margin-left: 0 }
    &:last-of-type { margin-right: 0 }
  }
  &__link {
    display: inline-block;
    color: white;
    font-size: 14px;
    line-height: 24px;
    text-decoration: none;

    &.router-link-exact-active {
      color: #FF5C57;
    }
  }
}
</style>

