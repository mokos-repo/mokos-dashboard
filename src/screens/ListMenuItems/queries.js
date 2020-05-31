import gql from 'graphql-tag'

export const GET_ALL_MENU_ITEMS = gql`
    query get_all_menu_items {
        getAllMenuItems{
            id
            hotspot {
                id
                title
            }
            title
            description
            price
            image
        }
    }
`