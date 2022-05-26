import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import { Movie, TV } from '../api';
import VCard from './VCard';

interface HListProps {
  title: string;
  data: Movie[] | TV[];
}

const HCardList: React.FC<HListProps> = ({ title, data }) => {
  const renderItem = ({ item }: { item: Movie | TV }) => {
    return (
      <VCard
        posterPath={item.poster_path || ''}
        originalTitle={item.original_title || item.original_name}
        votes={item.vote_average}
        rawData={item}
      />
    );
  };

  return (
    <Styled.ListContainer>
      <Styled.ListTitle>{title}</Styled.ListTitle>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal
        ItemSeparatorComponent={Styled.separatorV}
        renderItem={renderItem}
      />
    </Styled.ListContainer>
  );
};

export default HCardList;

const Styled = {
  ListContainer: styled.View`
    margin-bottom: 40px;
    padding: 0 20px;
  `,

  ListTitle: styled.Text`
    color: ${({ theme }) => theme.text};
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
  `,

  separatorV: styled.View`
    width: 20px;
  `,

  separatorH: styled.View`
    height: 15px;
  `,
};
