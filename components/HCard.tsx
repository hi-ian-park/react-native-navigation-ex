import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';

import Poster from './Poster';

interface HCardProps {
  posterPath: string;
  originalTitle: string;
  releaseDate?: string;
  votes?: number;
  overview: string;
}

const HCard: React.FC<HCardProps> = ({
  posterPath,
  originalTitle,
  releaseDate,
  votes,
  overview,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate('Stack', {
      screen: 'Detail',
      params: { originalTitle },
    });
  };
  return (
    <Styled.Container onPress={goToDetail}>
      <Poster path={posterPath} />
      <Styled.HorizontalColumn>
        <Styled.Title>{originalTitle}</Styled.Title>
        {releaseDate && (
          <Styled.Date>
            Coming: &nbsp;
            {new Date(releaseDate).toLocaleDateString('ko', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </Styled.Date>
        )}
        <Styled.OverView>
          {overview.length > 130 ? overview.slice(0, 130) : overview}
        </Styled.OverView>
      </Styled.HorizontalColumn>
    </Styled.Container>
  );
};

export default HCard;

const Styled = {
  Container: styled.TouchableOpacity`
    flex-direction: row;
    padding-left: 20px;
  `,

  HorizontalColumn: styled.View`
    margin-left: 10px;
    width: 100%;
  `,

  Title: styled.Text`
    color: ${({ theme }) => theme.text};
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 5px;
  `,

  Date: styled.Text`
    font-size: 12px;
    color: ${({ theme }) => theme.text};
    margin-bottom: 5px;
  `,

  OverView: styled.Text`
    color: ${({ theme }) => theme.text};
    width: 60%;
  `,
};
