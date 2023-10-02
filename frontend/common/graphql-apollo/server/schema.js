const {buildSchema} = require('graphql')

const schema = buildSchema(`
    input PostInput {
        id: ID
        title: String!
        content: String!
    }
    input UserInput {
            id: ID
            username: String!
            age: Int!
            posts: [PostInput]
    }
    type Post{
        id: ID
        title: String
        content: String
    }
    type User{
        id : ID
        username: String
        age: Int
        posts: [Post]
    }
    type Query {
        getUsers: [User]
        getUser(id: ID): User
        getPost(id : ID) : Post
        getPosts: [Post]
    }
    type Mutation{
        createUser(input: UserInput) : User
        createPost(input : PostInput) : Post
    }
`)


module.exports = schema
