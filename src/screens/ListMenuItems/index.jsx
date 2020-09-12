import React, { useEffect, useState } from 'react'
import { withApollo } from 'react-apollo'
import { Image } from 'cloudinary-react'

import { GET_ALL_MENU_ITEMS } from './queries'
import { Th, Td, Container } from '../ListHotspot/styles'

const ListMenu = ({client}) => {
    const [menuItems, setMenuItems] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const filter = event => {
        setFiltered(menuItems.filter(item => item.title.includes(event.target.value) || item.hotspot.title.includes(event.target.value)))
    }

    useEffect(() => {
        client.query({
            query: GET_ALL_MENU_ITEMS,
        }).then(res => {
            setMenuItems(res.data.getAllMenuItems)
            setFiltered(res.data.getAllMenuItems)
        })
    }, [client])

    return (
        <Container>
            <input placeholder="search" onChange={filter} />
            <table>
                <thead>
                    <tr>
                        <Th>Hotspot Name</Th>
                        <Th>Menu Item</Th>
                        <Th>Description</Th>
                        <Th>Price</Th>
                        <Th>Image</Th>
                    </tr>
                </thead>
                <tbody>
                    
                    {filtered.map(menu_item => 
                        <tr key={menu_item.id}>
                            <Td>{menu_item.hotspot.title}</Td>
                            <Td>{menu_item.title}</Td>
                            <Td>{menu_item.description}</Td>
                            <Td>{menu_item.price}</Td>
                            <Td>
                                <Image
                                    cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} 
                                    publicId={menu_item.image} />
                            </Td>
                        </tr>
                        )}
                    
                </tbody>
            </table>
        </Container>
    )
}

export default withApollo(ListMenu)
