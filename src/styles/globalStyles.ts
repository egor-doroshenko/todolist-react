import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6, a, p, button, div, input, textarea {
    font-family: 'Antic', sans-serif;
    font-size: 60px;
  }

  #root {
    margin: 0 auto;
  }

  .click {
    cursor: pointer;
  }
`;

export default GlobalStyle;
