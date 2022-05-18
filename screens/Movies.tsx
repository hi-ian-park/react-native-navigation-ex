import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, View } from "react-native";
import Swiper from "react-native-swiper";
import useSWR from "swr";
import styled from "styled-components/native";
import Slide from "../components/Slide";
import VCard from "../components/VCard";
import HCard from "../components/HCard";
import { fetcher, apiUrl, MovieResponse, Movie } from "../api";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({}) => {
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: trendingData,
    error: trendingError,
    mutate: mutateTrending,
  } = useSWR<MovieResponse>(apiUrl.trendingUrl, fetcher);
  const {
    data: nowPlayingData,
    error: playingError,
    mutate: mutateNowPlaying,
  } = useSWR<MovieResponse>(apiUrl.nowPlayingUrl, fetcher);
  const {
    data: upComingData,
    error: upComingError,
    mutate: mutateUpComing,
  } = useSWR<MovieResponse>(apiUrl.upComingUrl, fetcher);

  const isLoading = !trendingData || !nowPlayingData || !upComingData;
  const isError = trendingError || playingError || upComingError;

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([mutateTrending(), mutateNowPlaying(), mutateUpComing()]);
    setRefreshing(false);
  };

  const renderVCard = ({ item }: { item: Movie }) => (
    <VCard
      posterPath={item.poster_path || ""}
      title={item.original_title}
      votes={item.vote_average}
      releaseDate={item.release_date}
      overview={item.overview}
    />
  );

  const renderHCard = ({ item }: { item: Movie }) => (
    <HCard
      posterPath={item.poster_path || ""}
      title={item.original_title}
      votes={item.vote_average}
      releaseDate={item.release_date}
      overview={item.overview}
    />
  );

  const separatorV = styled.View`
    width: 20px;
  `;
  const separatorH = styled.View`
    height: 15px;
  `;

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
                  width: "100%",
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
                    backdropPath={movie.backdrop_path || ""}
                    posterPath={movie.poster_path || ""}
                    originalTitle={movie.original_title}
                    voteAverage={movie.vote_average}
                    overview={movie.overview}
                  />
                ))}
              </Swiper>
              <Styled.ListContainer>
                <Styled.ListTitle>Trending Movies</Styled.ListTitle>
                {trendingData && (
                  <FlatList
                    data={trendingData.results}
                    renderItem={renderVCard}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={separatorV}
                  />
                )}
              </Styled.ListContainer>
              <Styled.ListTitle>Coming Soon</Styled.ListTitle>
            </>
          }
          data={upComingData.results}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={separatorH}
          renderItem={renderHCard}
        />
      )}
    </Styled.SafeAreaView>
  );
};

const Styled = {
  SafeAreaView: styled.SafeAreaView`
    flex: 1;
  `,

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

  ComingSoonScroll: styled.FlatList``,
};

export default Movies;
