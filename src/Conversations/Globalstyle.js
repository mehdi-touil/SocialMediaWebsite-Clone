import styled, { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,300&display=swap');
*{
  margin:0;
  padding: 0;
}
html,body,#root{
    height: 100%;
    width: 100%;
}
  body {
    background-image: linear-gradient(to right, #8fdce4,#8087d8);
    font-family: 'Roboto', sans-serif;
     }
`;
export const Chatcontainer = styled.div`
 display: flex;
 height: 100%;
`;
