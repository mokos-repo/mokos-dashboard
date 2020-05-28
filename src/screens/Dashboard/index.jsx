import React from 'react'
import { withApollo } from 'react-apollo';

const Dashboard = ({ client }) => {

    return (
        <div>
            <button>Create Hotspot</button>
            <button>Create Menu Item</button>
        </div>
    )
}

export default withApollo(Dashboard)
