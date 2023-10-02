<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
import {inject} from 'vue'

export default {
  name: 'Button',
  setup(){
    const message = inject('message')
    console.log(message)
  }
}
</script>

<style scoped>
button{
  color: red;
}
</style>
