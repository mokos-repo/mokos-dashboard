import gql from 'graphql-tag'

export const GET_ALL_HOTSPOTS = gql`
    input TagCreateInput {
        title: String!
    }
    query get_all_hotspots(handle: $String, title: $String, description: $String, branding_color: $String, 
        longitude: $String, latitude: $String, tags: $[TagCreateInput], is_featured: 
        ) {
        createHotspot(data: {
            unique_name:"1",
            title:"",
            description:"",
            branding_color:"",
            location:{longitude:"1", latitude:"2"},
            tags: [{title:"tag1"}],
            is_new:true,
            is_featured:true,
            opening_hour: { off_days:"1", opening_hour:"2:00", closing_hour:"15:00"}
        }){

        }
    }
`