import styled, { css } from 'styled-components';

export const InputWrapper = styled.div`
  width: 100%;
  max-width: 350px;

  position: relative;
`;

export const StyledInput = styled.input<{ haserror: boolean }>`
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  display: flex;
  width: 100%;
  border-color: ${({ theme }) => theme.colors.Realblack};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.purple};
  }

  ${({ haserror, theme }) =>
    haserror &&
    css`
      border-color: ${theme.colors.red} !important;
    `}
`;
