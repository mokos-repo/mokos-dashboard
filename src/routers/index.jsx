import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Dashboard from '../screens/Dashboard'
import { Container, SideBar } from './styles'

const Routes = () => (
    <Container>
        <Router>
            <SideBar>Sidebar</SideBar>
            <div>
                <Switch>
                    <Route exact path = "/" component = { Dashboard } />
                </Switch>
            </div>
        </Router>
    </Container>
)

export default Routes;