<template lang="pug">
canvas(ref="viewport")
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator';
import moment from 'moment';
import Chart from 'chart.js';

@Component
export default class CurrencyHistoryGraph extends Vue {

  @Prop({ default: () => []}) data: Array<{t: string, x: number}>;

  private canvas: HTMLCanvasElement;

  private context: CanvasRenderingContext2D | null;

  private chartInstance: Chart;

  mounted() {
    this.init();
  }

  @Watch('data') onDataChange(newValue) {
    this.chartInstance.data.datasets.length = 0;
    this.chartInstance.data.datasets.push({
      borderColor: '#6fb55a',
      backgroundColor: 'rgba(111,181,90, 0.3)',
      data: newValue,
      fill: true
    });
    this.chartInstance.update();
  }

  private init() {
    this.canvas = (this.$refs.viewport as HTMLCanvasElement);
    this.context = this.canvas.getContext('2d');

    this.chartInstance = new Chart(this.canvas, {
      type: 'line',
      data: {
				datasets: []
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{ 
            type: 'time', 
            time: { 
              unit: 'day', 
              displayFormats: {
                day: 'D MMM',
              },
              min: moment().subtract(1, 'month'), 
              max: moment(),
              tooltipFormat: 'D MMM'
            } 
          }],
          yAxes: [{}]
        }
      },   
    });
  }
}
</script>
