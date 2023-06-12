<template>
  <input :value="modelValue" @input="updateValue">
</template>

<script lang="ts">

import {defineComponent} from 'vue'

export default defineComponent({
  name: 'Input',
  emits: [
      'update:modelValue'
  ],
  props: ['modelValue'],
  methods: {
    updateValue(e){
      this.$emit('update:modelValue', e.target.value)
    }
  }
})
</script>

<style scoped>

</style>
