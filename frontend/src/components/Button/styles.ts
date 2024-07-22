import styled, { css } from 'styled-components';
import { ButtonProps } from './index';

export const Container = styled.button<Omit<ButtonProps, 'children'>>`
  ${({ theme, color, size }) => css`
    background-color: ${theme.colors[color]};
    border: 1px solid ${theme.colors.white};
    color: ${theme.colors.black};
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      transition-duration: 0.4s;
      ${color === 'green' &&
      css`
        background-color: ${theme.colors.black};
        color: ${theme.colors.white};
      `}

      ${color === 'red' &&
      css`
        background-color: ${theme.colors.black};
        color: ${theme.colors.white};
      `}
    }

    &:disabled {
      background-color: ${theme.colors.gray};
      cursor: not-allowed;
    }

    ${size === 'small' &&
    css`
      border-radius: 10px;
      height: fit-content;
      width: fit-content;
      padding: 4px 14px;
      height: 35px;
    `}

    ${size === 'medium' &&
    css`
      border-radius: 8px;
      height: 35px;
      width: 100%;
      max-width: 150px;
      padding: 3px;
    `}

        ${size === 'big' &&
    css`
      border-radius: 3px;
      height: 40px;
      width: 100%;
      padding: 8px;
    `}
  `}
`;
