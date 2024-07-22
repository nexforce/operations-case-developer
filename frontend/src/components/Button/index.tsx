import React from 'react';
import * as S from './styles';

export interface ButtonProps {
  disabled?: boolean;
  color: 'green' | 'red';
  size: 'small' | 'medium' | 'big';
  children: React.ReactNode;
  type?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  disabled,
  color,
  size,
  type,
  children,
  onClick,
  ...rest
}) => {
  return (
    <S.Container
      type={type}
      disabled={disabled}
      color={color}
      size={size}
      onClick={onClick}
      {...rest}
    >
      {children}
    </S.Container>
  );
};

export default Button;
