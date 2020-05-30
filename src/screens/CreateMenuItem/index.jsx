import React from 'react'
import { withApollo } from 'react-apollo'

const CreateMenu = () => {
    return (
        <div>
            <input placeholder="hotspot id"/>
            <input placeholder="tags"/>
            <input placeholder="title"/>
            <input placeholder="image" type="file"/>
            <input placeholder="price"/>
        </div>
    )
}

export default withApollo(CreateMenu)
