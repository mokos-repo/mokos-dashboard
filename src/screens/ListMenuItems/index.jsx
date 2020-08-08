import React, { useEffect, useState } from 'react'
import { withApollo } from 'react-apollo'
import { Image } from 'cloudinary-react'

import { GET_ALL_MENU_ITEMS } from './queries'
import { Th, Td } from '../ListHotspot/styles'


const ListMenu = ({client}) => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        client.query({
            query: GET_ALL_MENU_ITEMS,
        }).then(res => {
            setMenuItems(res.data.getAllMenuItems)
        })
    })

    return (
        <div>
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
                    
                    {menuItems.map(menu_item => 
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
        </div>
    )
}

export default withApollo(ListMenu)
