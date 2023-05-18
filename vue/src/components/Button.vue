<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button'
}
</script>

<style scoped>
button{
  color: red;
}
</style>
