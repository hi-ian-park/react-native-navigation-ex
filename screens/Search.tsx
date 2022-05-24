import React, { useState } from 'react';
import styled from 'styled-components/native';
import useSWR from 'swr';

import { MovieResponse, fetcher, movieUrl, tvUrl } from '../api';
import HCardList from '../components/HCardList';
import Loader from '../components/Loader';

const Search = () => {
  const [userInput, setUserInput] = useState('');
  const [query, setQuery] = useState('');
  const onChangeText = (payload: string) => setUserInput(payload);
  const { data: movieData, isValidating: moviesLoading } =
    useSWR<MovieResponse>([movieUrl.search, query], fetcher);
  const { data: tvData, isValidating: tvLoading } = useSWR<MovieResponse>(
    [tvUrl.search, query],
    fetcher,
  );

  const isLoading = moviesLoading || tvLoading;

  const onSubmit = () => {
    if (userInput === '') return;
    setQuery(userInput);
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
