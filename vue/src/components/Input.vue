<template>
  <input :value="modelValue" @input="updateValue">
</template>

<script>

export default {
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
}
</script>

<style scoped>

</style>
