<template lang="pug">
.currency_input
  input(
    :value="value.amount.toFixed(4)"
    @input="onModelChange()"
    @keypress="acceptOnlyNumbers"
    min="1"
    step="0.01"
    type="number"
    ref="amountHolder"
    required="false"
  )
  select(
    :value="value.currency"
    @change="onModelChange()"
    ref="currencyHolder"
  )
    option(
      v-for="(option, index) in options" 
      :key="index"
      v-if="option != exclude"
      :value="option"
      :selected="option == value.currency"
    ) {{ option }}
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Emit } from "vue-property-decorator";

export interface ICurrecnyInputModel {
  currency: string;
  amount: number;
}

@Component
export default class CurrencyInput extends Vue {

  @Prop({ default: () => <ICurrecnyInputModel>{ currency: 'RUB', amount: 1}}) value: ICurrecnyInputModel;

  @Prop({ default: () => []}) options: Array<string>;

  @Prop({ default: ""}) exclude: string;

  mounted() {
    
  }

  @Emit('input') onModelChange() {
    const selectRef = this.$refs.currencyHolder as HTMLSelectElement;
    const inputRef = this.$refs.amountHolder as HTMLInputElement;
    
    return {
      currency: (selectRef[selectRef.selectedIndex] as HTMLOptionElement).value,
      amount: inputRef.value
    }
  }

  private acceptOnlyNumbers(event) {
    let keyCode = (event.keyCode ? event.keyCode : event.which);

    if ((keyCode < 48 || keyCode > 57) && keyCode !== 44) event.preventDefault();
  }

}
</script>

<style scoped lang="scss">
.currency_input {
  width: 100%;
  @include display-flex(row, flex-start, center);

  input, select {
    height: 42px;
    border: 1px solid #d3d3d3;
    line-height: 39px;
    font-weight: 600;
  }

  input {
    width: 100%;
    padding: 0 12px;
    border-right: none;
    font-size: 14px;
    &:required, &:invalid {
        box-shadow: none
    }  
  }

  select {
    width: 80px;
    -webkit-appearance: none; 
    -moz-appearance: none;
    appearance: none;
    font-size: 12px;
    border-color: #FF5C57;
    background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iU3ZnanNTdmcxMDExIiB3aWR0aD0iMjg4IiBoZWlnaHQ9IjI4OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpzdmdqcz0iaHR0cDovL3N2Z2pzLmNvbS9zdmdqcyI+PGRlZnMgaWQ9IlN2Z2pzRGVmczEwMTIiPjwvZGVmcz48ZyBpZD0iU3ZnanNHMTAxMyIgdHJhbnNmb3JtPSJtYXRyaXgoMC45MTY3MDAwMDU1MzEzMTEsMCwwLDAuOTE2NzAwMDA1NTMxMzExLDExLjk5NTE5OTIwMzQ5MTIxMSwxMS45OTUxOTkyMDM0OTEyMTEpIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjg4IiBoZWlnaHQ9IjI4OCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxwYXRoIGQ9Ik0yNTYgNDhDMTQxLjEyNSA0OCA0OCAxNDEuMTI1IDQ4IDI1NnM5My4xMjUgMjA4IDIwOCAyMDggMjA4LTkzLjEyNSAyMDgtMjA4UzM3MC44NzUgNDggMjU2IDQ4em0wIDI3MmwtOTYtOTZoMTkybC05NiA5NnoiIGZpbGw9IiNmZmZmZmYiIGNsYXNzPSJjb2xvcjAwMCBzdmdTaGFwZSI+PC9wYXRoPjxtZXRhZGF0YT48cmRmOnJkZiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHhtbG5zOnJkZnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDEvcmRmLXNjaGVtYSMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+PHJkZjpkZXNjcmlwdGlvbiBhYm91dD0iaHR0cHM6Ly9pY29uc2NvdXQuY29tL2xlZ2FsI2xpY2Vuc2VzIiBkYzp0aXRsZT0iYW5kcm9pZCxhcnJvdyxkcm9wZG93bixjaXJjbGUiIGRjOmRlc2NyaXB0aW9uPSJhbmRyb2lkLGFycm93LGRyb3Bkb3duLGNpcmNsZSIgZGM6cHVibGlzaGVyPSJJY29uc2NvdXQiIGRjOmRhdGU9IjIwMTctMDktMjQiIGRjOmZvcm1hdD0iaW1hZ2Uvc3ZnK3htbCIgZGM6bGFuZ3VhZ2U9ImVuIj48ZGM6Y3JlYXRvcj48cmRmOmJhZz48cmRmOmxpPkJlbmphbWluIEogU3BlcnJ5PC9yZGY6bGk+PC9yZGY6YmFnPjwvZGM6Y3JlYXRvcj48L3JkZjpkZXNjcmlwdGlvbj48L3JkZjpyZGY+PC9tZXRhZGF0YT48L3N2Zz48L2c+PC9zdmc+) 90% / 24% no-repeat #FF5C57;
    color: white;
    padding: 0 5px;
    &:hover {
      cursor: pointer;
    }
    option {
      background: white;
      color: $mainTextColor;
    }
  }

  select::-ms-expand { 
    display: none;
  }

  @media screen and (min-width:0\0) {
    select {
      background-image:none\9;
      padding: 5px\9;
    } 
  }  
}
</style>