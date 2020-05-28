import React from "react"
import { NavLink } from "react-router-dom"
import { Container, NavContainer, NavLinks } from "./styles";

const Sidebar = ({ routes }) => {
    return (
        <Container>
            <NavContainer>
                <h2 style={{color: "white", fontWeight: "600", textAlign: "center", fontSize: "45px" }}>Moko's</h2>
                <hr color="white" style={{width: "100%", marginBottom: "50px"}}/>
                <NavLinks>
                {routes.map(item => (
                    <NavLink
                        key={item.to}
                        className={`nav-item`}
                        activeClassName = "active-nav-item"
                        to={item.to}>
                    <span style={{marginLeft: "30px"}}>{item.name}</span>
                    </NavLink>
                ))}
                </NavLinks>
            </NavContainer>
        </Container>
    )
}

export default Sidebar
