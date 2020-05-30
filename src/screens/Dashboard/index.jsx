import React from 'react'
import { withApollo } from 'react-apollo';
import { NavLink } from 'react-router-dom';

const Dashboard = ({ client }) => {

    return (
        <div>
            <NavLink to="/hotspots/create">Create Hotspot</NavLink>
            <NavLink to="/menus/create"> Create Menu Item</NavLink>
        </div>
    )
}

export default withApollo(Dashboard)
