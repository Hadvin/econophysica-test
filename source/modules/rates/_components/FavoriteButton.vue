<template lang="pug">
button.favorite_button(
  v-bind='$attrs'
  @click="onPressed"
  :class='{"button-disabled": disabled}'
  :disabled='disabled'
)
  svg(
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24"
    :fill="isActive ? '#FF5C57' : '#d3d3d3'"
    v-if="!disabled"
  )
    path(
      d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" 
    )
</template>

<script lang="ts">
import { Component, Prop, Mixins, Emit } from 'vue-property-decorator';
import PressedBehaviorMixin from '@mixins/PressedBehaviorMixin';

@Component
export default class FavoriteButton extends Mixins(PressedBehaviorMixin) {
  @Prop({ default: false }) isActive: boolean;

  @Emit() onPressed(): boolean {
    return !this.isActive;
  }
}
</script>

<style lang="scss" scoped>
.favorite_button {
  border: none;
  padding: 0;
  background: none;
  size: 24px;

  svg { size: 100% }

  &:hover:not(.button-disabled) {
    svg { fill: #FF5C57}
  }
}
</style>

