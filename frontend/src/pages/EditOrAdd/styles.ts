import styled from 'styled-components';

export const Container = styled.div`
  width: 100dvw;
  height: 100dvh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 500px) {
    height: fit-content;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  height: 100dvh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 500px) {
    padding: 0 14px;
  }
`;
