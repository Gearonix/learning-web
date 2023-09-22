<template>
  Main page
  Vuex likes count: {{ likes }} <br/>
  tests count {{ tests }}
  <button @click="setTests">setTests</button>
  Vuex double likes count: {{ doubleLikes }} <br/>
  <button @click="incrementLikes">Like</button>
  <p>inject {{ message }}</p>
  <router-link to="/about">To about</router-link>
</template>

<script setup>

import {mapState, mapActions, mapGetters, mapMutations, useStore} from 'vuex'
import {computed, onMounted, ref} from 'vue'
import {useTests} from '../hooks/useTests.js'
import {useInject} from '../hooks/useInject.js'

onMounted(() => {
  console.log('main is mounted by onMounted')
})

const store = useStore()
const {tests, setTests} = useTests()

const likes = computed(() => store.state.post.likes)
const doubleLikes = computed(() => store.getters['post/doubleLikes'])
const incrementLikes = () => store.commit('post/incrementLikes')
const message = useInject()


</script>

<style scoped>

</style>
