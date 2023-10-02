<template>
  <h1>Post. ID: {{ post.id }}</h1>
  <Button @click="removePost">remove post</Button>
</template>

<script>
export default {
  name: 'Post',
  emits: ['remove'],
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    removePost(){
      this.$emit('remove', this.post)
    }
  }
}
</script>

<style scoped>

</style>
