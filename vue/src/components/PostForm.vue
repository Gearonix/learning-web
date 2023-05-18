<template>
  <div class="post-map" v-for="post in posts">
    <div>
      {{ post }}
    </div>
  </div>
  <button @click="createEvent">child event (form)</button>
  <Button>app.componennt</Button>
</template>

<script>
console.log('post-form')
export default {
  emits: [
      'createEvent'
  ],
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  methods: {
    createEvent(){
      this.$emit('createEvent', 2)
    }
  },
  name: 'PostForm'
}
</script>

<style scoped>
.post-map{
  color: red;
}
</style>
