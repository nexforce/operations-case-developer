import styled, { css } from 'styled-components';
import Button from 'components/Button';

export const Container = styled.div`
  width: 100%;
  height: 60%;

  @media screen and (max-width: 500px) {
    padding: 0 14px 0 0;
  }
`;

export const RowCard = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.gray};
    padding: 16px 44px;
    border-radius: 5px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: 100px;
    max-width: 470px;
    width: 100%;

    @media screen and (max-width: 500px) {
      justify-content: flex-start;
      max-height: 200px;
      max-width: unset;
      width: 100%;
      padding: 14px 18px;
    }
  `}
`;

export const StyledButton = styled(Button)`
  @media screen and (max-width: 500px) {
    max-width: 150px;
    width: 100%;
  }
`;

export const NameAndCategory = styled.div`
  ${() => css`
    font-size: 16px;
    margin-bottom: 8px;

    display: flex;
    flex-direction: row;
    gap: 16px;

    span {
      font-weight: 600;
    }

    @media screen and (max-width: 500px) {
      flex-direction: column;
    }

    p:nth-child(1) {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    p:nth-child(2) {
      flex: 1;
    }
  `}
`;

export const PriceAndStock = styled(NameAndCategory)``;

export const Error = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.white};

  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  right: 14px;
  top: 20px;
  gap: 6px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 500px) {
    right: unset;
    top: unset;
    bottom: 14px;
    flex-direction: row;
    justify-content: space-between;
    width: 88%;
  }
`;
