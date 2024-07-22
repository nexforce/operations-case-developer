import React, { useEffect, useState } from 'react';
import { MdOutlineExposurePlus1 } from 'react-icons/md';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { dataFilter } from 'services/api';

import { useInventoryContext } from 'hooks/useInventory';

import Button from 'components/Button';

import * as S from './styles';

const Options: React.FC = () => {
  const navigate = useNavigate();
  const { functions } = useInventoryContext();
  const [showFilters, setShowFilter] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      category: '',
      minPrice: '',
      maxPrice: '',
    },
  });

  useEffect(() => {
    reset();
  }, [showFilters]);

  const onSubmit = async (data: dataFilter) => {
    await functions.fetchItems(data);
    reset();
  };

  const getRelatoryCSV = async () => {
    await functions.handleDownloadReport();
  };

  return (
    <>
      <S.Container isfilteropen={showFilters}>
        <Button onClick={() => getRelatoryCSV()} size="small" color="green">
          Relatory
        </Button>

        <S.WrapperAddAndRelatory>
          <Button
            onClick={() => {
              functions.setInventoryItem(null);
              navigate('/inventory');
            }}
            size="small"
            color="green"
          >
            <MdOutlineExposurePlus1 size={16} />
          </Button>

          <S.Filter onClick={() => setShowFilter(!showFilters)}>
            Filters
            {showFilters ? (
              <IoChevronUp size={16} />
            ) : (
              <IoChevronDown size={16} />
            )}
          </S.Filter>
        </S.WrapperAddAndRelatory>
      </S.Container>

      <S.InputFilters show={showFilters}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.StyledInput
            control={control}
            name="category"
            placeholder="Category"
            defaultValue=""
            disabled={false}
            haserror={false}
          />
          <S.StyledInput
            control={control}
            name="minPrice"
            placeholder="Min Price"
            defaultValue=""
            disabled={false}
            haserror={false}
          />
          <S.StyledInput
            control={control}
            name="maxPrice"
            placeholder="Max Price"
            defaultValue=""
            disabled={false}
            haserror={false}
          />
          <S.StyledButton type="submit" size="small" color="green">
            Apply
          </S.StyledButton>
        </form>
      </S.InputFilters>
    </>
  );
};

export default Options;
