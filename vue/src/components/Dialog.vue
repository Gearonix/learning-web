<template>
  <div>
    <h1>Dialog</h1>
    <slot></slot>
    <button @click="showDialog">close dialog</button>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showDialog(){
      this.$emit('close')
    }
  },
  mounted() {
    console.log('dialog mounted')
  },
  unmounted() {
    console.log('dialog unmounted')
  }
}
</script>

<style scoped>

</style>
