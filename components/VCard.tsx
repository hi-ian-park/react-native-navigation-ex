import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';

import { Movie, TV } from '../api';
import Poster from './Poster';
import Votes from './Votes';

interface VCardProps {
  posterPath: string;
  originalTitle: string;
  votes?: number;
  releaseDate?: string;
  overview?: string;
  rawData: Movie | TV;
}

const VCard: React.FC<VCardProps> = (props) => {
  const { posterPath, originalTitle, votes, rawData } = props;
  // TODO: useNavigation type annotating 확인
  // https://reactnavigation.org/docs/typescript/#annotating-usenavigation
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate('Stack', {
      screen: 'Detail',
      params: { ...rawData },
    });
  };

  return (
    <Styled.Container onPress={goToDetail}>
      <Poster path={posterPath} />
      <Styled.Title>
        {originalTitle.slice(0, 13)}
        {originalTitle.length > 13 && '...'}
      </Styled.Title>
      {votes !== undefined && <Votes votes={votes} />}
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.TouchableOpacity`
    align-items: center;
  `,

  Title: styled.Text`
    color: ${({ theme }) => theme.text};
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 5px;
  `,
};

export default VCard;
