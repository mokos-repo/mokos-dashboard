import gql from 'graphql-tag'

export const CREATE_MENU_ITEM = gql`
    mutation create_menu_item(
        $hotspot: ID, $title: String, $description: String, 
        $image: String, $price: String, $tags: [MenuItemTagCreateInput]){
        createMenuItem(data:{
            hotspot: $hotspot,
            title: $title,
            description: $description,
            image: $image,
            price: $price,
            tags: $tags
        }){
            id
        }
    }
`