import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useInventoryContext, InventoryItem } from 'hooks/useInventory';
import { inventorySchema } from 'schemas/inventorySchema';

import Input from 'components/Input';

import * as S from './styles';

const InventoryForm: React.FC = () => {
  const navigate = useNavigate();
  const { inventoryId } = useParams<{ inventoryId: string }>();

  const { inventoryItem, functions, error, loading } = useInventoryContext();

  const defaultValues = inventoryItem;

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Omit<InventoryItem, 'id'>>({
    defaultValues: defaultValues || {},
    resolver: yupResolver(inventorySchema),
  });

  useEffect(() => {
    if (inventoryId && !inventoryItem?.id && !error && !loading) {
      functions.fetchItem(Number(inventoryId));
    }
  }, [inventoryId, functions]);

  useEffect(() => {
    if (defaultValues) {
      Object.keys(defaultValues).forEach((key) => {
        setValue(
          key as keyof Omit<InventoryItem, 'id'>,
          defaultValues[key as keyof Omit<InventoryItem, 'id'>],
        );
      });
    }
  }, [defaultValues, setValue]);

  const onSubmitHandler = async (data: Omit<InventoryItem, 'id'>) => {
    if (defaultValues && defaultValues?.id) {
      await functions.handleUpdateItem({ ...data, id: defaultValues?.id });
      navigate('/')
    } else {
      await functions.handleAddItem(data);
      reset();
    }
  };

  if (error) return <S.Error>{error}</S.Error>;

  return (
    <S.FormContainer onSubmit={handleSubmit(onSubmitHandler)}>
      <Input
        name="name"
        control={control}
        placeholder="Name"
        defaultValue=""
        disabled={false}
        haserror={!!errors.name}
      />
      <Input
        name="category"
        control={control}
        placeholder="Category"
        defaultValue=""
        disabled={false}
        haserror={!!errors.category}
      />
      <Input
        name="price"
        control={control}
        placeholder="Price"
        defaultValue=""
        disabled={false}
        haserror={!!errors.price}
      />
      <Input
        name="stock"
        control={control}
        placeholder="Stock"
        defaultValue=""
        disabled={false}
        haserror={!!errors.stock}
      />
      <S.StyledButton type="submit" size="medium" color="green">
        {defaultValues ? 'Update' : 'Create'} Inventory
      </S.StyledButton>
    </S.FormContainer>
  );
};

export default InventoryForm;
