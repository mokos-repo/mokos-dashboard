import React, { useState, useEffect } from 'react'
import { GET_ALL_HOTSPOTS } from './queries';
import { withApollo } from 'react-apollo';
import { Th, Td } from './styles'

const Hotspots = ({ client }) => {
    const [hotspots, setHotspots] = useState([]);

    useEffect(() =>{ 
        client.query({
            query: GET_ALL_HOTSPOTS,
        }).then(res =>{
            setHotspots(res.data.getAllHotspots);
            console.log(res.data.getAllHotspots)
        }).catch(error => {
            console.log(error)
        })
    }, [client]);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <Th>Handle</Th>
                        <Th>Title</Th>
                        <Th>Description</Th>
                        <Th>Address</Th>
                        <Th>Featured</Th>
                        <Th>New</Th>
                        <Th>Open</Th>
                    </tr>
                </thead>
                <tbody>
                    
                    {hotspots.map(hotspot => 
                        <tr key={hotspot.id}>
                            <Td>{hotspot.unique_name}</Td>
                            <Td>{hotspot.title}</Td>
                            <Td>{hotspot.description}</Td>
                            <Td>{hotspot.address.description}</Td>
                            <Td>{hotspot.is_featured ? "yes" : "no"}</Td>
                            <Td>{hotspot.is_new ? "yes" : "no"}</Td>
                            <Td>{hotspot.is_open ? "yes" : "no"}</Td>
                        </tr>
                        )}
                    
                </tbody>
            </table>
        </div>
    )
}

export default withApollo(Hotspots)
