<template>
  <div>
    <h1>Dialog</h1>
    <slot></slot>
    <button @click="showDialog">close dialog</button>
  </div>
</template>

<script>
import toggleMixin from '../mixins/toggleMixin.ts'

export default {
  name: 'Dialog',
  mixins: [
      toggleMixin
  ]
}
</script>

<style scoped>

</style>
