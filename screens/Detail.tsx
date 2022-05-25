import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

const Detail = ({ navigation, route }) => {
  const { setOptions } = navigation;
  const { originalTitle } = route.params;

  useEffect(() => {
    setOptions({ title: originalTitle });
  }, []);
  return (
    <Styled.Container>
      <Text>{originalTitle}</Text>
    </Styled.Container>
  );
};

export default Detail;

const Styled = {
  Container: styled.ScrollView`
    background-color: ${({ theme }) => theme.background};
  `,
};
