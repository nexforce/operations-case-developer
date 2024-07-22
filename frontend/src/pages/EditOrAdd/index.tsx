import React from 'react';

import Form from 'Container/InventoryForm';

import * as S from './styles';

const EditOrAdd: React.FC = () => {
  return (
    <S.Container>
      <S.Wrapper>
        <Form />
      </S.Wrapper>
    </S.Container>
  );
};

export default EditOrAdd;
