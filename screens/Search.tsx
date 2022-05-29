import React, { useRef, useState } from 'react';
import styled from 'styled-components/native';
import useSWR from 'swr';

import { MovieResponse, fetcher, movieUrl, tvUrl } from '../api';
import HCardList from '../components/HCardList';
import Loader from '../components/Loader';

const Search = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const queryRef = useRef('');

  const {
    data: movieData,
    isValidating: moviesLoading,
    mutate: revalidateMovie,
  } = useSWR<MovieResponse>(
    shouldFetch ? movieUrl.search(queryRef.current) : null,
    fetcher,
  );
  const {
    data: tvData,
    isValidating: tvLoading,
    mutate: revalidateTv,
  } = useSWR<MovieResponse>(
    shouldFetch ? tvUrl.search(queryRef.current) : null,
    fetcher,
  );

  const isLoading = moviesLoading || tvLoading;
  const onChangeText = (searchText: string) => (queryRef.current = searchText);
  const onSubmit = async () => {
    queryRef.current ? setShouldFetch(true) : setShouldFetch(false);
    await Promise.all([revalidateMovie(), revalidateTv()]);
  };

  if (isLoading) return <Loader />;
  return (
    <Styled.Container>
      <Styled.SearchBar
        placeholder="Search for Movie or TV show"
        placeholderTextColor="#808e9b"
        returnKeyType="done"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />

      {movieData && <HCardList title="Movie" data={movieData.results} />}
      {tvData && <HCardList title="TV" data={tvData.results} />}
    </Styled.Container>
  );
};

export default Search;

const Styled = {
  Container: styled.ScrollView``,

  SearchBar: styled.TextInput`
    background-color: ${({ theme }) => theme.textInputBackground};
    padding: 10px 15px;
    border-radius: 15px;
    width: 90%;
    margin: 20px auto;
  `,
};
