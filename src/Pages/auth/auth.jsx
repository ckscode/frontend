import styled from "styled-components";

export const AuthPage =styled.div`
width:100%;
height:80vh;
padding-top:10%;
position:relative;
`

export const AuthContainer = styled.div`
margin:auto;
padding:2%;
width:25%;
box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
border-radius:10px;
position:relative;


@media (max-width:1450px){
width:30%;
}

@media (max-width:1080px){
width:40%;
}

@media (max-width:956px){
width:40%;
}

@media (max-width:786px){
width:50%;
}

@media (max-width:576px){
width:75%;
}

`