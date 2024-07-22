import React from 'react';
import Button from 'components/Button';
import * as S from './styles';

interface ConfirmationModalProps {
  show: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal: React.FC<ConfirmationModalProps> = ({
  show,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <S.ModalOverlay show={show}>
      <S.ModalContent>
        <p>{message}</p>
        <S.ButtonWrapper>
          <Button size="medium" color="red" onClick={onConfirm}>
            Confirm
          </Button>
          <Button size="medium" color="green" onClick={onCancel}>
            Cancel
          </Button>
        </S.ButtonWrapper>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default Modal;
