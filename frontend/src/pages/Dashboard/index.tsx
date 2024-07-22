import React, { useEffect } from 'react';

import { useInventoryContext } from 'hooks/useInventory';
import List from 'Container/inventoryList';
import Options from 'Container/Options';

import * as S from './styles';

const Dashboard: React.FC = () => {
  const { functions } = useInventoryContext();

  const { fetchItems } = functions;

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <S.Container>
      <S.Wrapper>
        <Options />
        <List />
      </S.Wrapper>
    </S.Container>
  );
};

export default Dashboard;
