import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Emit } from "vue-property-decorator";

@Component
export default class PressedBehaviorMixin extends Vue {
  @Prop({ default: false }) disabled: boolean;

  @Emit() 
  protected onPressed(...args): any {}
}