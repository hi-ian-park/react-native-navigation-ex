import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
// eslint-disable-next-line import/default
import Swiper from 'react-native-swiper';
// FIXME: 이슈 https://github.com/leecade/react-native-swiper/issues/1183
import styled from 'styled-components/native';
import useSWR from 'swr';

import { MovieResponse, fetcher, movieUrl } from '../api';
import HCard from '../components/HCard';
import HCardList from '../components/HCardList';
import Loader from '../components/Loader';
import Slide from '../components/Slide';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: trendingData,
    error: trendingError,
    mutate: mutateTrending,
  } = useSWR<MovieResponse>(movieUrl.trending, fetcher);
  const {
    data: nowPlayingData,
    error: playingError,
    mutate: mutateNowPlaying,
  } = useSWR<MovieResponse>(movieUrl.nowPlaying, fetcher);
  const {
    data: upComingData,
    error: upComingError,
    mutate: mutateUpComing,
  } = useSWR<MovieResponse>(movieUrl.upComing, fetcher);

  const isLoading = !trendingData || !nowPlayingData || !upComingData;
  const isError = trendingError || playingError || upComingError;

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([mutateTrending(), mutateNowPlaying(), mutateUpComing()]);
    setRefreshing(false);
  };

  if (isLoading) return <Loader />;

  if (isError)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        Some Error!
      </View>
    );
  return (
    <Styled.SafeAreaView>
      {upComingData && (
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListHeaderComponent={
            <>
              <Swiper
                horizontal
                showsButtons={false}
                showsPagination={false}
                containerStyle={{
                  width: '100%',
                  height: SCREEN_HEIGHT / 4,
                  marginBottom: 30,
                }}
                autoplay
                autoplayTimeout={3.5}
                loop
              >
                {nowPlayingData?.results.map((movie) => (
                  <Slide
                    key={movie.id}
                    // TODO: 기본 이미지 추가 할 것
                    backdropPath={movie.backdrop_path || ''}
                    posterPath={movie.poster_path || ''}
                    originalTitle={movie.original_title}
                    voteAverage={movie.vote_average}
                    overview={movie.overview}
                    rawData={movie}
                  />
                ))}
              </Swiper>
              {trendingData && (
                <HCardList title="Trending" data={trendingData.results} />
              )}

              <Styled.ListTitle>Coming Soon</Styled.ListTitle>
            </>
          }
          data={upComingData.results}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={Styled.separatorH}
          renderItem={({ item }) => (
            <HCard
              posterPath={item.poster_path || ''}
              originalTitle={item.original_title}
              votes={item.vote_average}
              releaseDate={item.release_date}
              overview={item.overview}
              rawData={item}
            />
          )}
        />
      )}
    </Styled.SafeAreaView>
  );
};

const Styled = {
  SafeAreaView: styled.SafeAreaView`
    flex: 1;
  `,

  ListContainer: styled.View``,

  ListTitle: styled.Text`
    color: ${({ theme }) => theme.text};
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
    padding: 0 20px;
  `,

  ComingSoonScroll: styled.FlatList``,

  separatorV: styled.View`
    width: 20px;
  `,
  separatorH: styled.View`
    height: 15px;
  `,
};

export default Movies;
