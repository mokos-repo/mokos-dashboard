import gql from 'graphql-tag'

export const EDIT_MENU_ITEM = gql`
    mutation edit_menu_item(
        $hotspot: ID, $title: String, $description: String, 
        $image: String, $price: String, $tags: [MenuItemTagUpdateInput],
        $ingredients: [IngredientUpdateInput], $id: ID){
        editMenuItem(data:{
            id: $id,
            hotspot: $hotspot,
            title: $title,
            description: $description,
            image: $image,
            price: $price,
            tags: $tags,
            ingredients: $ingredients
        }){
            id
        }
    }
`

export const GET_MENU_ITEM = gql`
    query get_menu_item($id: ID!){
        getMenuItem(id: $id){
            id
            hotspot {
                id,
                title
            }
            title
            description
            image
            price
            ingredients {
                id
                title
            }
            tags {
                id
                title
            }
        }
    }
`