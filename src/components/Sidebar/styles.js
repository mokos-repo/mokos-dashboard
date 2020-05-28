import styled from "styled-components";

export const Container = styled.div`
    // height: 100vh;
    grid-column: 1/2;
    grid-row: 1/3;
    background-color: #7f5a83;
    background-image: linear-gradient(315deg, #7f5a83 0%, #0d324d 74%);
    height: 100%;
`

export const NavContainer = styled.div`
    padding: 30px;
    
`

export const NavLinks = styled.div`
    .nav-item {
        height: 5%;
        opacity: 0.6;
        color: #FFF;
        text-decoration: none; 
        font-weight: 500;
        width: 100%;
        // text-align: center;
        padding: 12px;
        padding-left: 20px;
        margin: 10px 10px 20px 10px;
        border-radius: 10px;
    }
    .active-nav-item {
        opacity: 1;
        background: #EAEAEA;
        color: #435A6F;
    }
    .white-color {
        opacity: 1;
    }
    .hover-active:hover {
        opacity: 1;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const CollapseButton = styled.button`
    height: 5vh;
`