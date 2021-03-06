import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import { Container } from './styles'
import Sidebar from '../components/Sidebar'

import Dashboard from '../screens/Dashboard'

import CreateMenuItem from '../screens/CreateMenuItem'
import ListMenuItem from '../screens/ListMenuItems'
import EditMenuItem from '../screens/EditMenuItem'

import ListHotspot from '../screens/ListHotspot'
import CreateHotspot from '../screens/CreateHotspot'
import CreatePlaylist from '../screens/CreatePlaylist'
import EditHotspot from '../screens/EditHotspot'

import TestScreen from '../screens/TestScreen'
import SmsTestScreen from '../screens/SmsTestScreen'

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
        key: "2",
        name: "Menus",
        to: "/menus"
    },
    {
        key: "3",
        name: "Users",
        to: "/users",
    },
    {
        key: "4",
        name: "Testing",
        to: "/test",
    },
    {
        key: "5",
        name: "SMS",
        to: "/sms"
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
                    <Route exact path = "/hotspot/edit/:pk" component = { EditHotspot } />

                    <Route exact path = "/menus" component = { ListMenuItem } />
                    <Route exact path = "/menus/create" component = { CreateMenuItem } />
                    <Route exact path = "/menus/edit/:pk" component = { EditMenuItem } />

                    <Route exact path = "/playlist/create" component = { CreatePlaylist } />

                    <Route exact path = "/test" component = { TestScreen } />
                    <Route exact path = "/sms" component = { SmsTestScreen } />
                </Switch>
            </div>
        </Router>
    </Container>
)

export default Routes;