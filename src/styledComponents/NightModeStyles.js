import {createGlobalStyle} from 'styled-components'

const NightModeStyles = createGlobalStyle`
    div, ol, ul, li,  h1, p, span,a, .icon, label, input{
        background-color:#000000 !important;
        color:#ffffff !important;
    }

    .slick-prev:before,
    .slick-next:before {
        color: white; /* Change the arrow color to a contrasting color */
    }
    `

export default NightModeStyles
