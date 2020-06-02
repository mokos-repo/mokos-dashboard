import gql from 'graphql-tag'

export const CREATE_PLAYLIST = gql`
    mutation create_category($title: String!){
        createCategory(data:{
            title: $title
        }){
            id
        }
    }
`