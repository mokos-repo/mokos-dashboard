import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Dashboard from '../screens/Dashboard'
import { Container } from './styles'
import Sidebar from '../components/Sidebar'
import ListHotspot from '../screens/ListHotspot'
import CreateHotspot from '../screens/CreateHotspot'

const routes = [
    {
        key: "5",
        name: "Dashboard",
        to: "/dashboard",
    },

    {
        key: "1",
        name: "Hotspots",
        to: "/hotspots",
    },
    {
        key: "3",
        name: "Users",
        to: "/users",
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
                    <Route exact path = "/dashboard" component = { Dashboard } />

                    <Route exact path = "/hotspots" component = { ListHotspot } />
                    <Route exact path = "/hotspots/create" component = { CreateHotspot } />
                </Switch>
            </div>
        </Router>
    </Container>
)

export default Routes;