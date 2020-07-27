import gql from 'graphql-tag'

export const GET_ALL_HOTSPOTS = gql`
    query get_all_hotspots {
        getAllHotspots{
            results{
                id
                unique_name
                title
                description
                address{
                    description
                }
                is_featured
                is_new
                is_open
                rating
                logo
            }
        }
    }
`

export const DELETE_HOTSPOT = gql`
    mutation delete_hotspot($id: ID!){
        deleteHotspotById(id: $id)
    }
`