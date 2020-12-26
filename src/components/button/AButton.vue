<template>
  <button 
    class="a-btn"
    :class="[
      type ? `a-btn--${type}` : 'a-btn--normal',
      outlined && `a-btn--outlined`,
      size && `a-btn--${size}`,
      round && 'round',
      (ripple && !disabled) && 'ripple',
      block && 'a-btn--block',
      text && 'a-btn-text'
    ]"
    :style="[!$slots.default && {padding: '9px 9px'}]"
    :disabled="disabled"
  >
    <slot/>
  </button>
</template>

<script lang="ts">
import { Sizes, Colors} from '/@/constants'

export default {
  name: "a-btn",
  props: {
    type: {
      type: String,
      validator: (value: Colors) =>
        [
          Colors.PRIMARY,
          Colors.SUCCESS,
          Colors.DANGER,
          Colors.WARNING,
          Colors.BLACK,
          Colors.NEUTRAL
        ].includes(value)      
    },
    size: {
      type: String,
      default: Sizes.NORMAL,
      validator: (value: Sizes) =>
        [Sizes.SMALL, Sizes.NORMAL, Sizes.BIG].includes(value)
    },
    disabled: { type: Boolean },
    outlined: { type: Boolean },
    round: { type: Boolean },
    ripple: { type: Boolean },
    block: { type: Boolean },
    text: { type: Boolean },        
  }
}
</script>
<style>


</style>