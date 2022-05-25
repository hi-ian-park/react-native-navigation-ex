import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, useColorScheme } from 'react-native';
import styled from 'styled-components/native';
import useSWR from 'swr';

import { Movie, TV, fetcher, movieUrl, tvUrl } from '../api';
import { theme } from '../colors';
import Poster from '../components/Poster';
import { makeImgPath } from '../utils';

type RootStackParamList = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Detail: React.FC<DetailScreenProps> = ({ navigation, route }) => {
  const { setOptions } = navigation;
  const { params } = route;
  const colorScheme = useColorScheme() || 'light';
  const isMovie = 'original_title' in params;
  const fetchUrl = isMovie
    ? movieUrl.detail(params.id)
    : tvUrl.detail(params.id);

  const { data } = useSWR(fetchUrl, fetcher);

  console.log(data);

  useEffect(() => {
    setOptions({ title: isMovie ? 'Movie' : 'TV Show' });
  }, []);

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path || '') }}
        />
        <LinearGradient
          colors={['transparent', theme[colorScheme].background]}
          style={StyleSheet.absoluteFill}
        />
        <Styled.Column>
          <Poster path={params.poster_path || ''} />
          <Styled.Title>
            {params.original_title || params.original_name}
          </Styled.Title>
        </Styled.Column>
      </Styled.Header>
      <Styled.Overview>{params.overview}</Styled.Overview>
    </Styled.Container>
  );
};

export default Detail;

const Styled = {
  Container: styled.ScrollView`
    background-color: ${({ theme }) => theme.background};
  `,

  Header: styled.View`
    height: ${SCREEN_HEIGHT / 4};
    justify-content: flex-end;
    padding: 0px 10px;
  `,

  Background: styled.Image``,

  Column: styled.View`
    flex-direction: row;
    width: 80%;
    margin-bottom: 30px;
    padding: 0 20px;
  `,

  Title: styled.Text`
    color: ${({ theme }) => theme.text};
    font-size: 32px;
    align-self: flex-end;
    margin-left: 15px;
    font-weight: 600;
  `,

  Overview: styled.Text`
    color: ${({ theme }) => theme.text};
    padding: 0 20px;
  `,
};
