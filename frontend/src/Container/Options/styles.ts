import styled, { css } from 'styled-components';
import Input from 'components/Input';
import Button from 'components/Button';

export const Container = styled.div<{ isfilteropen: boolean }>`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  @media screen and (max-width: 500px) {
    ${({ isfilteropen }) =>
      isfilteropen &&
      css`
        margin-top: 40px;
      `}
  }
`;

export const WrapperAddAndRelatory = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: center;
  justify-content: center;
`;

export const Filter = styled.span`
  ${({ theme }) => css`
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    transition: border-bottom 0.4s;
    color: ${theme.colors.white};

    &:hover {
      border-bottom: 1px solid ${theme.colors.white};
    }
  `}
`;

export const InputFilters = styled.div<{ show: boolean }>`
  ${({ show }) => css`
    display: ${show ? 'flex' : 'none'};
    margin: 0 0 18px 0;
    width: 100%;
    align-items: flex-start;
    form {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 14px;

      @media screen and (max-width: 500px) {
        flex-direction: column;
      }
    }
  `};
`;

export const StyledInput = styled(Input)`
  max-width: 150px;

  @media screen and (max-width: 500px) {
    max-width: unset;
  }
`;

export const StyledButton = styled(Button)`
  @media screen and (max-width: 500px) {
    width: 100%;
    margin-bottom: 14px;
  }
`;
