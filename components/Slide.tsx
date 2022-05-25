import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import styled from 'styled-components/native';

import { Movie } from '../api';
import { makeImgPath } from '../utils';
import Poster from './Poster';
import Votes from './Votes';

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
  rawData: Movie;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
  rawData,
}) => {
  const userTheme = useColorScheme();
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate('Stack', {
      screen: 'Detail',
      params: { ...rawData },
    });
  };
  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={goToDetail}>
      <Styled.BackgroundImage
        source={{ uri: makeImgPath(backdropPath) }}
        style={StyleSheet.absoluteFill}
      />
      <BlurView
        tint={userTheme || 'light'}
        intensity={80}
        style={StyleSheet.absoluteFill}
      >
        <Styled.Wrapper>
          <Poster path={posterPath} />
          <Styled.Column>
            <Styled.Title>{originalTitle}</Styled.Title>
            <Votes votes={voteAverage} />
            <Styled.Overview>{overview.slice(0, 90)}...</Styled.Overview>
          </Styled.Column>
        </Styled.Wrapper>
      </BlurView>
    </TouchableOpacity>
  );
};

export default Slide;

const Styled = {
  BackgroundImage: styled.Image``,

  Title: styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
  `,

  Overview: styled.Text`
    margin-top: 10px;
    color: ${({ theme }) => theme.text}; ;
  `,

  Wrapper: styled.View`
    flex-direction: row;
    height: 100%;
    justify-content: center;
    padding: 0 20px;
    align-items: center;
  `,

  Column: styled.View`
    width: 65%;
    margin-left: 15px;
  `,
};
