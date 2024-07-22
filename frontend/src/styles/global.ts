import { createGlobalStyle } from 'styled-components';

const globalTheme = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        outline: 0;
    }
   
    *::before,
    *::after {
        box-sizing: inherit;
    }

    body {
       font-family: 'Roboto', sans-serif;
       background-color: ${({ theme }) => theme.colors.black};
    
        button:disabled {
            background-color: ${({ theme }) => theme.colors.gray};
            cursor: not-allowed;
            box-shadow: none;
            border-color: ${({ theme }) => theme.colors.gray};
        }
    }
`;

export default globalTheme;
