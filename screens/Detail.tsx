import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import {
  Dimensions,
  Platform,
  Share,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import styled from 'styled-components/native';
import useSWR from 'swr';

import {
  Movie,
  MovieDetails,
  TV,
  TVDetails,
  fetcher,
  movieUrl,
  tvUrl,
} from '../api';
import { theme } from '../colors';
import Loader from '../components/Loader';
import Poster from '../components/Poster';
import { makeImgPath } from '../utils';

export type RootStackParamList = {
  Movies: undefined;
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Detail: React.FC<DetailScreenProps> = ({ navigation, route }) => {
  const ShareButton = () => {
    return (
      <TouchableOpacity onPress={shareMedia}>
        <Ionicons name="share-outline" color="white" size={24} />
      </TouchableOpacity>
    );
  };
  const { params } = route;
  const colorScheme = useColorScheme() || 'light';
  const isMovie = 'original_title' in params;
  const fetchUrl = isMovie
    ? movieUrl.detail(params.id)
    : tvUrl.detail(params.id);

  const { data, isValidating } = useSWR<MovieDetails | TVDetails>(
    fetchUrl,
    fetcher,
  );

  const shareMedia = async () => {
    if (data) {
      const isAndroid = Platform.OS === 'android';
      const homepage =
        isMovie && 'imdb_id' in data
          ? `https://www.imdb.com/title/${data.imdb_id}/`
          : data?.homepage;
      if (isAndroid) {
        await Share.share({
          message: `${params.overview}\nCheck it out: ${homepage}`,
          title: isMovie ? params.original_title : params.original_name,
        });
      } else {
        await Share.share({
          url: homepage,
          title: isMovie ? params.original_title : params.original_name,
        });
      }
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: isMovie ? 'Movie' : 'TV Show',
    });
  }, []);

  useEffect(() => {
    if (data) {
      navigation.setOptions({
        headerRight: () => <ShareButton />,
      });
    }
  }, [data]);

  const openYouTube = async (videoId: string) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoId}`;
    await WebBrowser.openBrowserAsync(baseUrl);
  };
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
            {isMovie ? params.original_title : params.original_name}
          </Styled.Title>
        </Styled.Column>
      </Styled.Header>
      <Styled.DetailContainer>
        <Styled.Overview>{params.overview}</Styled.Overview>
        {isValidating && <Loader />}
        {data?.videos?.results?.map((video) => (
          <Styled.VideoBtn
            key={video.key}
            onPress={() => openYouTube(video.key)}
          >
            <Ionicons name="logo-youtube" color="#EA2300" size={24} />
            <Styled.BtnText>{video.name}</Styled.BtnText>
          </Styled.VideoBtn>
        ))}
      </Styled.DetailContainer>
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
    margin: 20px 0;
  `,

  DetailContainer: styled.View`
    padding: 0 20px;
    margin-bottom: 20px;
  `,

  VideoBtn: styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
  `,

  BtnText: styled.Text`
    margin-left: 10px;
    color: ${({ theme }) => theme.text};
    font-weight: 600;
  `,
};
