<template>
  Main page
  <router-link to="/about">To about</router-link>
</template>

<script>
export default {
  name: 'Main',
  mounted() {
    console.log(this.$route)
    console.log(this.$router)
  }
}
</script>

<style scoped>

</style>
