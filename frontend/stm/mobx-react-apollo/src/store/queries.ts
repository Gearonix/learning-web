import {gql} from '@apollo/client';

export const GRAPHQL_TEST = gql`
    query FindRoles($id: Int!){
        findRoles(id: $id){
            username
        }
    }
`

export const CREATE_ROLE = gql`
    mutation CreateRole($body: CreateRole!){
        createRole(body: $body){
            username
            id
        }
    }
`

export const UPLOAD_FILE = gql`
    mutation UploadFile($file: Upload!){
        uploadFile(file: $file){
            username
        }
    }
`

export const SUBSCRIBE_TO_EVENT = gql`
    subscription {
        commentAdded{
            username
        }
    }
`

export const SEND_MESSAGE = gql`
    mutation{
        sendMessage(test:"sdf")
    }
`
