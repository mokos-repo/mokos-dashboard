import { createGlobalStyle } from 'styled-components'

export const theme = {

}

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Organo';
        font-style: normal;
        font-weight: 400;
        src: url('./Organo.ttf');
    }

    h2 {
        font-family: Organo;
    }
`