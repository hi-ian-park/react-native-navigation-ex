import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Loader = () => {
  return (
    <Styled.Wrapper>
      <ActivityIndicator />
    </Styled.Wrapper>
  );
};

export default Loader;

const Styled = {
  Wrapper: styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
  `,
};
