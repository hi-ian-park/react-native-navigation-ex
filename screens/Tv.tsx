import React from "react";
import { ScrollView, FlatList, SafeAreaView } from "react-native";
import useSWR from "swr";
import styled from "styled-components/native";
import { fetcher, tvUrl } from "../api";
import HCardList from "../components/HCardList";
import Loader from "../components/Loader";
import VCard from "../components/VCard";

const Tv = () => {
  const { data: trendingData, mutate: mutateTrending } = useSWR(
    tvUrl.trending,
    fetcher
  );
  const { data: todayData, mutate: mutateToday } = useSWR(
    tvUrl.airingToday,
    fetcher
  );
  const { data: topData, mutate: mutateTop } = useSWR(tvUrl.topRated, fetcher);
  const isLoading = !trendingData || !todayData || !topData;

  if (isLoading) return <Loader />;
  return (
    <SafeAreaView>
      <Styled.Container>
        <HCardList title="Trending TV">
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{ marginBottom: 40, paddingLeft: 20 }}
            ItemSeparatorComponent={Styled.separatorV}
            data={trendingData.results}
            renderItem={({ item }) => (
              <VCard
                posterPath={item.poster_path}
                title={item.original_name}
                votes={item.votes_average}
              />
            )}
          />
        </HCardList>
        <HCardList title="On Air Today">
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{ marginBottom: 40, paddingLeft: 20 }}
            ItemSeparatorComponent={Styled.separatorV}
            data={todayData.results}
            renderItem={({ item }) => (
              <VCard
                posterPath={item.poster_path}
                title={item.original_name}
                votes={item.votes_average}
              />
            )}
          />
        </HCardList>
        <HCardList title="Top">
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{ marginBottom: 40, paddingLeft: 20 }}
            ItemSeparatorComponent={Styled.separatorV}
            data={topData.results}
            renderItem={({ item }) => (
              <VCard
                posterPath={item.poster_path}
                title={item.original_name}
                votes={item.votes_average}
              />
            )}
          />
        </HCardList>
      </Styled.Container>
    </SafeAreaView>
  );
};

const Styled = {
  Container: styled.ScrollView`
    padding: 30px 0;
  `,

  separatorV: styled.View`
    width: 20px;
  `,
  separatorH: styled.View`
    height: 15px;
  `,
};

export default Tv;
