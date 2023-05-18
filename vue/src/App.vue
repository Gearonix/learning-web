<template>
  <router-view></router-view>
  <div>
    Hello world {{ likes }}
  </div>
  <Button @click="addLike">Helloworld!</Button>
  <button @click="addLike">Test</button>
  <button @click="createPost">Create post</button>
  <input v-model="inputText">
  <input :value="inputText" @input="e => inputText = e.target.value">
  <p>{{ inputText }}</p>
  <PostForm :posts="posts" @createEvent="eventReceived"/>
  <h1>{{ obj.test }}</h1>
  <div class="post-map">post-map</div>
  <h2>{{ obj.test }}</h2>
  <Input v-model="obj.test"/>
  <transition-group name="list" tag="div">
    <h1 v-for="item in myPosts" :key="item">{{ item }}</h1>
  </transition-group>
  <Post v-for="post in myPosts" @remove="removePost" :post="post" :key="post.id"/>
  <div v-if="myPosts.length === 0">
    empty
  </div>
  <div v-else> non empty</div>
  <button @click="openDialog" ref="openDialog">open dialog</button>
  <Dialog @close="closeDialog" :isShow="isShow"  v-if="isShow">
    <p>
      dialog222
    </p>
  </Dialog>
  <h3>{{ sortedPosts }}</h3>

</template>

<script>
import PostForm from './components/PostForm.vue';
import Button from './components/Button.vue';
import Input from './components/Input.vue';
import Post from './components/Post.vue';
import Dialog from './components/Dialog.vue';

export default {
  components: {
    PostForm,
    Button,
    Input,
    Post,
    Dialog
  },
  data(){
    return {
      likes: 0,
      posts: [1, 2, 3, 4, 5],
      inputText: '',
      obj: {
        test: 'test1'
      },
      myPosts: [
        {id : 1}, {id : 2}, {id: 3}, {id: 4}
      ],
      isShow: false
    }
  },

  mounted() {
    console.log(this.$refs.openDialog)
  },
  methods: {
    addLike(){
      this.likes += 1
    },
    createPost(){
      this.posts.push('new_post')
    },
    eventReceived(arg){
      console.log('Event received')
      console.log(arg)
    },
    removePost(post){
      console.log(post)
      this.myPosts.splice(this.myPosts.indexOf(post.id), 1)
    },
    openDialog(isShow){
      this.isShow = true
    },
    closeDialog(){
      this.isShow = false
    }
  },
  watch: {
    posts: {
      handler(newVal, oldval){
        console.log(newVal)
      },
      deep: true
    },
    likes(newVal){
      console.log('likes', newVal)
    }
  },
  computed: {
    sortedPosts(){
      return this.myPosts.length + 4
    }
  },
  name: 'App'
}
</script>

<style>
  body{
    color: #383838;
  }
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>
