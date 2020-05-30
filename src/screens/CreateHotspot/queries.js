import gql from 'graphql-tag'

// 
// # input TagCreateInput {
    // #     title: String!
    // # }
    
// 
export const CREATE_HOTSPOT = gql` 
    mutation createHotspot($unique_name: String, $title: String, $description: String, $branding_color: String, 
                            $is_new: Boolean, $is_featured: Boolean, $longitude: String!, $latitude: String!,
                            $locationDesc: String, $opening_hour: String, $closing_hour: String, 
                            $tags: [TagCreateInput]) {
        createHotspot(data: {
            unique_name: $unique_name,
            title: $title,
            description: $description,
            branding_color: $branding_color,
            is_new: $is_new,
            is_featured: $is_featured,
            location: { longitude: $longitude, latitude: $latitude, description: $locationDesc },
            tags: $tags,
            opening_hour: { off_days:"1", opening_hour: $opening_hour, closing_hour: $closing_hour}
        }){
            id
        }
    }
`