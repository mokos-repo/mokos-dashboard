import React, { useState, useEffect } from 'react'
import { GET_ALL_HOTSPOTS } from './queries';
import { withApollo } from 'react-apollo';

const Dashboard = ({ client }) => {
    const [hotspots, setHotspots] = useState([]);

    useEffect(() =>{ 
        client.query({
            query: GET_ALL_HOTSPOTS,
        }).then(res =>{
            setHotspots(res.data.getAllHotspots)
        }).catch(error => {
            console.log(error)
        })
    }, [client]);

    return (
        <div>
            {hotspots.map(hotspot => <p key={hotspot.unique_name}>{hotspot.unique_name}</p>)}
        </div>
    )
}

export default withApollo(Dashboard)
