import styled from 'styled-components';
import Button from 'components/Button';

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 14px;
`;

export const Error = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.white};
`;

export const StyledButton = styled(Button)`
  margin-top: 14px;
  max-width: 350px;
`;
