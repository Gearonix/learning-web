<template>
  Main page
  Vuex likes count: {{ likes }} <br/>
  tests count {{ tests }}
  <button @click="setTests">setTests</button>
  Vuex double likes count: {{ doubleLikes }} <br/>
  <button @click="incrementLikes">Like</button>
  <router-link to="/about">To about</router-link>
</template>

<script>

import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
import {ref} from 'vue'
import {useTests} from '../hooks/useTests.js'


export default {
  name: 'Main',
  mounted() {
    // console.log(this.$store.state.post)
  },
  methods: {
    ...mapMutations({
      incrementLikes: 'post/incrementLikes'
    })
  },
  computed: {
    ...mapState({
      likes: state => state.post.likes
    }),
    ...mapGetters({
      doubleLikes: 'post/doubleLikes'
    })
  },
  setup(){
    const {tests, setTests} = useTests()

    return {tests, setTests}

  }
}
</script>

<style scoped>

</style>
