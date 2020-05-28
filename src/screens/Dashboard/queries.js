import gql from 'graphql-tag'

export const GET_ALL_HOTSPOTS = gql`
    query get_all_hotspots {
        getAllHotspots{
            unique_name
            title
            reviews{
                user
                comment
            }
        }
    }
`