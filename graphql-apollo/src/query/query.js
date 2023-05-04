import {gql} from '@apollo/client'


export const GET_ALL_USERS = gql`
    query{
        getUsers{
            id
            username
            age
        }
    }
`

export const CREATE_USER = gql`
    mutation createUser($input: UserInput){
        createUser(input: $input){
            id,username,age
        }
    }


`
