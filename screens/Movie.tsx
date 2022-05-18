import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";
import Swiper from "react-native-swiper";
import useSWR from "swr";
import styled from "styled-components/native";
import Slide from "../components/Slide";
import VCard from "../components/VCard";
import HCard from "../components/HCard";
import { fetcher, apiUrl } from "../api";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movie: React.FC<NativeStackScreenProps<any, "Movies">> = ({}) => {
  const [refreshing, setRefreshing] = useState(false);

  const { data: trendingData, error: trendingError } = useSWR(
    apiUrl.trendingUrl,
    fetcher
  );
  const { data: nowPlayingData, error: playingError } = useSWR(
    apiUrl.nowPlayingUrl,
    fetcher
  );
  const { data: upComingData, error: upComingError } = useSWR(
    apiUrl.upComingUrl,
    fetcher
  );

  const isLoading = !trendingData || !nowPlayingData || !upComingData;
  const isError = trendingError || playingError || upComingError;
  const onRefresh = async () => {};

  const renderCard = {
    v: ({ item }) => (
      <VCard
        posterPath={item.poster_path}
        title={item.original_title}
        votes={item.vote_average}
        releaseDate={item.release_date}
        overview={item.overview}
      />
    ),
    h: ({ item }) => (
      <HCard
        posterPath={item.poster_path}
        title={item.original_title}
        votes={item.vote_average}
        releaseDate={item.release_date}
        overview={item.overview}
      />
    ),
  };

  const separator = {
    v: styled.View`
      width: 20px;
    `,
    h: styled.View`
      height: 15px;
    `,
  };

  const movieKeyExtractor = (item) => item.id;

  if (isLoading)
    return (
      <Styled.Loader>
        <ActivityIndicator />
      </Styled.Loader>
    );

  if (isError)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        Some Error!
      </View>
    );
  return (
    <Styled.SafeAreaView>
      <Styled.Container
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <>
            <Swiper
              horizontal
              showsButtons={false}
              showsPagination={false}
              containerStyle={{
                width: "100%",
                height: SCREEN_HEIGHT / 4,
                marginBottom: 30,
              }}
              autoplay
              autoplayTimeout={3.5}
              loop
            >
              {nowPlayingData.results?.map((movie) => (
                <Slide
                  key={movie.id}
                  backdropPath={movie.backdrop_path}
                  posterPath={movie.poster_path}
                  originalTitle={movie.original_title}
                  voteAverage={movie.vote_average}
                  overview={movie.overview}
                />
              ))}
            </Swiper>
            <Styled.ListContainer>
              <Styled.ListTitle>Trending Movies</Styled.ListTitle>
              <Styled.TrendingScroll
                data={trendingData.results}
                keyExtractor={movieKeyExtractor}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                renderItem={renderCard.v}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={separator.v}
              />
            </Styled.ListContainer>
            <Styled.ListTitle>Coming Soon</Styled.ListTitle>
          </>
        }
        keyExtractor={movieKeyExtractor}
        data={upComingData.results}
        ItemSeparatorComponent={separator.h}
        renderItem={renderCard.h}
      />
    </Styled.SafeAreaView>
  );
};

const Styled = {
  SafeAreaView: styled.SafeAreaView`
    flex: 1;
  `,

  Container: styled.FlatList``,

  Loader: styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
  `,

  ListContainer: styled.View`
    margin-bottom: 40px;
  `,

  ListTitle: styled.Text`
    color: ${({ theme }) => theme.text};
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
    padding: 0 20px;
  `,

  TrendingScroll: styled.FlatList``,
  ComingSoonScroll: styled.FlatList``,
};

export default Movie;
