import gql from 'graphql-tag'

export const GET_HOTSPOT = gql`
    query getHotspot($id: ID!){
        getHotspot(id: $id){
            id
            unique_name
            title
            description
            is_new
            is_featured
            address {
                id
                longitude
                latitude
                description
            }
            opening_hour {
                id
                off_days
                opening_hour
                closing_hour
            }
            tags {
                id
                title
            }
        }
    }
`

export const UPDATE_HOTSPOT = gql`
    mutation updateHotspot($unique_name: String, $title: String, $description: String, $branding_color: String, 
                            $is_new: Boolean, $is_featured: Boolean, $longitude: String!, $latitude: String!,
                            $locationDesc: String, $locationID: ID!, $opening_hour: String, $closing_hour: String, 
                            $opening_hourID:ID!, $tags: [TagUpdateInput], $logo: String, $id: ID!) {
        editHotspot(data: {
            id: $id
            unique_name: $unique_name,
            title: $title,
            description: $description,
            branding_color: $branding_color,
            is_new: $is_new,
            is_featured: $is_featured,
            location: { id: $locationID, longitude: $longitude, latitude: $latitude, description: $locationDesc },
            tags: $tags,
            opening_hour: { id: $opening_hourID, off_days:"1", opening_hour: $opening_hour, closing_hour: $closing_hour},
            logo: $logo
        }){
            id
        }
    }
`