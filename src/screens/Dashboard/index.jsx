import React from 'react'
import { withApollo } from 'react-apollo';
import { NavLink } from 'react-router-dom';

const Dashboard = ({ client }) => {

    return (
        <div>
            <NavLink to="/hotspots/create">Create Hotspot</NavLink>
            <button>Create Menu Item</button>
        </div>
    )
}

export default withApollo(Dashboard)
