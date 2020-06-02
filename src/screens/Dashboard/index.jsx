import React from 'react'
import { withApollo } from 'react-apollo';
import { NavLink } from 'react-router-dom';
import { Container } from './styles';

const Dashboard = ({ client }) => {

    return (
        <Container>
            <NavLink to="/hotspots/create">Create Hotspot</NavLink>
            <NavLink to="/menus/create"> Create Menu Item</NavLink>
            <NavLink to="/playlist/create">Create Playlist</NavLink>
        </Container>
    )
}

export default withApollo(Dashboard)
