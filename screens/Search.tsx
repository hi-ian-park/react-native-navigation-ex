import React, { useState } from 'react';
import styled from 'styled-components/native';
import useSWR from 'swr';

import { fetcher, movieUrl } from '../api';

const Search = () => {
  const [query, setQuery] = useState('');
  const onChangeText = (payload: string) => setQuery(payload);
  const { data, mutate: mutateMovieSearch } = useSWR(
    [movieUrl.search, query],
    fetcher,
    {
      revalidateOnMount: false,
    },
  );

  console.log(data);
  const onSubmit = () => {
    if (query === '') return;
    mutateMovieSearch();
  };
  return (
    <Styled.Container>
      <Styled.SearchBar
        placeholder="Search for Movie or TV show"
        placeholderTextColor="#808e9b"
        returnKeyType="done"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
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
    margin: 10px auto;
  `,
};
