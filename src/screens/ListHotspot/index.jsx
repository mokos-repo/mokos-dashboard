import React, { useState, useEffect } from 'react'
import { GET_ALL_HOTSPOTS, DELETE_HOTSPOT } from './queries';
import { withApollo } from 'react-apollo';
import { Th, Td, Container } from './styles'
import { Image } from 'cloudinary-react'
// import { auth } from '../../firebase'

const Hotspots = ({ client, history }) => {
    const [hotspots, setHotspots] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const filter = event => {
        setFiltered(hotspots.filter(item => item.title.includes(event.target.value)))
    }

    const deleteHotspot = async (id) => await client.mutate({
        mutation: DELETE_HOTSPOT,
        variables: {
            id
        },
        refetchQueries: [{ query: GET_ALL_HOTSPOTS }],
        awaitRefetchQueries: true
    })

    useEffect(() =>{ 
        client.query({
            query: GET_ALL_HOTSPOTS,
        }).then(res =>{
            setHotspots(res.data.getAllHotspots.results);
            setFiltered(res.data.getAllHotspots.results);
        }).catch(error => {
            console.log(error)
        })
    }, [client]);

    return (
        <Container>
            <input placeholder="search" onChange={filter} />
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
                        <Th>Rating</Th>
                        <Th>Profile</Th>
                    </tr>
                </thead>
                <tbody>
                    
                    {filtered.map(hotspot => 
                        <tr key={hotspot.id}>
                            <Td>{hotspot.unique_name}</Td>
                            <Td>{hotspot.title}</Td>
                            <Td>{hotspot.description}</Td>
                            <Td>{hotspot.address.description}</Td>
                            <Td>{hotspot.is_featured ? "yes" : "no"}</Td>
                            <Td>{hotspot.is_new ? "yes" : "no"}</Td>
                            <Td>{hotspot.is_open ? "yes" : "no"}</Td>
                            <Td>{hotspot.rating.value}</Td>
                            <Td><Image
                                    cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} 
                                    publicId={hotspot.logo} /></Td>
                            <Td>
                                <button onClick={()=>
                                    history.push({ pathname: '/hotspot/edit/' + hotspot.id 
                                })}>
                                    edit
                                </button>
                                
                                <button
                                    onClick={()=>deleteHotspot(hotspot.id)}>
                                    delete
                                </button>
                            </Td>
                        </tr>
                        )}
                    
                </tbody>
            </table>
        </Container>
    )
}

export default withApollo(Hotspots)
