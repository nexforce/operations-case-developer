import React from 'react';

import * as S from './styles';

const Loading: React.FC = () => (
  <S.LoadingWrapper data-testid="loading-wrapper">
    <S.Spinner data-testid="spinner" />
  </S.LoadingWrapper>
);

export default Loading;
