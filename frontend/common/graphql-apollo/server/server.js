const express = require('express')
const cors = require('cors')
const schema = require('./schema')

const app = express()
const {graphqlHTTP} = require('express-graphql')
const PORT = 6868

app.use(cors())

const users = [{
    id : '1',
    username : 'Test',
    age: 28
}]
const posts = [{
    id : 'post1',
    title: 'post_title',
    content: 'post_content_1'
}]

const root = {
    getUsers(){
        return users
    },
    getUser({id}){
        return users.find(i => i.id === id)
    },
    createUser({input}){
        const id = Date.now().toString()
        const user =  {
            id, ...input
        }
        users.push(user)
        console.log(user)
        console.log(users)
        return user
    },
    getPost({id}){
        return posts.find(i => i.id === id)
    },
    createPost({input}){
        const id = 'post' + Date.now().toString()
        const post = {
            id,
            ...input
        }
        posts.push(post)
        return post
    },
    getPosts(){
        return posts
    }
}



app.use('/graphql', graphqlHTTP({graphiql: true, schema, rootValue: root}))


app.listen(PORT,() => console.log(`server started at ${PORT}`))

