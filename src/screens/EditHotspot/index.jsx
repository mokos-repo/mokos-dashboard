import React from 'react'
import { withApollo } from 'react-apollo'
import { Container } from './styles'

const EditHotspot = ({ client }) => {
    return (
        <Container>
            Edit hotspot
        </Container>
    )
}

export default withApollo(EditHotspot)
