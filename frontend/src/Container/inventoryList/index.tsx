import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryContext } from 'hooks/useInventory';
import { List, AutoSizer } from 'react-virtualized';
import { GoPencil, GoTrash } from 'react-icons/go';
import Loading from 'components/Loading';
import Modal from 'components/Modal';

import * as S from './styles';

const InventoryComponent: React.FC = () => {
  const navigate = useNavigate();
  const { inventoryItems, loading, error, functions } = useInventoryContext();

  const [inventoryId, setInventoryId] = useState<number | null>(null);

  const rowRenderer = ({
    key,
    index,
    style,
  }: {
    key: string;
    index: number;
    style: React.CSSProperties;
  }) => {
    const item = inventoryItems[index];

    return (
      <S.RowCard key={key} style={style} className="list-item">
        <S.NameAndCategory>
          <p>
            <span>Name:</span> {item.name}
          </p>
          <p>
            <span>Category:</span> {item.category}
          </p>
        </S.NameAndCategory>
        <S.PriceAndStock>
          <p>
            <span>Price:</span> {item.price}
          </p>

          <p>
            <span>Stock:</span> {item.stock}
          </p>
        </S.PriceAndStock>

        <S.ButtonWrapper>
          <S.StyledButton
            size="small"
            color="green"
            onClick={() => {
              functions.setInventoryItem(null);
              navigate(`/inventory/${item.id}`);
            }}
          >
            <GoPencil size={16} />
          </S.StyledButton>
          <S.StyledButton
            size="small"
            color="red"
            onClick={() => setInventoryId(item.id)}
          >
            <GoTrash size={16} />
          </S.StyledButton>
        </S.ButtonWrapper>
      </S.RowCard>
    );
  };

  if (loading) return <Loading />;

  if (error) return <S.Error>{error}</S.Error>;

  return (
    <S.Container>
      <AutoSizer>
        {({ height, width }: { height: number; width: number }) => (
          <List
            width={width < 500 ? width + 14 : width}
            height={height}
            rowCount={inventoryItems.length}
            rowHeight={width < 500 ? 214 : 105}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>

      <Modal
        show={!!inventoryId}
        message="Are you sure you want to delete it ?"
        onCancel={() => setInventoryId(null)}
        onConfirm={() => {
          if (inventoryId) functions.handleDeleteItem(inventoryId);
          setInventoryId(null);
        }}
      />
    </S.Container>
  );
};

export default InventoryComponent;
