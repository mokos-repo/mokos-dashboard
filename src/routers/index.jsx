import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Dashboard from '../screens/Dashboard'
import { Container } from './styles'
import Sidebar from '../components/Sidebar'

const routes = [
    {
        key: "5",
        name: "Dashboard",
        to: "/dashboard",
    },

    {
        key: "1",
        name: "Items",
        to: "/items",
    },
    {
        key: "3",
        name: "Employees",
        to: "/employees",
    },
    {
        key: "4",
        name: "Help",
        to: "/help",
    }
]

const Routes = () => (
    <Container>
        <Router>
            <Sidebar routes={routes} />
            <div style={{height: "100vh"}}>
                <Switch>
                    <Route exact path = "/" component = { Dashboard } />
                </Switch>
            </div>
        </Router>
    </Container>
)

export default Routes;