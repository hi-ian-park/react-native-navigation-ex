import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Movie } from '../api';
import VCard from './VCard';

interface HListProps {
  title: string;
  data: any[];
}

const HCardList: React.FC<HListProps> = ({ title, data }) => {
  return (
    <Styled.ListContainer>
      <Styled.ListTitle>{title}</Styled.ListTitle>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        ItemSeparatorComponent={Styled.separatorV}
        data={data}
        renderItem={({ item }) => (
          <VCard
            posterPath={item.poster_path}
            title={item.original_title || item.original_name}
            votes={item.votes_average}
          />
        )}
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
