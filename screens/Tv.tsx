import React, { useState } from 'react';
import { fetcher, tvUrl } from '../api';
import HCardList from '../components/HCardList';
import { SafeAreaView, RefreshControl } from 'react-native';
import useSWR from 'swr';
import Loader from '../components/Loader';
import styled from 'styled-components/native';

const Tv = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data: trendingData, mutate: mutateTrending } = useSWR(tvUrl.trending, fetcher);
  const { data: todayData, mutate: mutateToday } = useSWR(tvUrl.airingToday, fetcher);
  const { data: topData, mutate: mutateTop } = useSWR(tvUrl.topRated, fetcher);
  const isLoading = !trendingData || !todayData || !topData;

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([mutateTrending(), mutateToday(), mutateTop()]);
    setRefreshing(false);
  };

  if (isLoading) return <Loader />;
  return (
    <SafeAreaView>
      <Styled.Container
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>
        }
      >
        <HCardList title="Trending TV" data={trendingData.results} />
        <HCardList title="On Air Today" data={todayData.results} />
        <HCardList title="Top" data={topData.results} />
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
