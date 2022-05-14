import React from "react";
import styled from "styled-components/native";

const Movie = ({ navigation: { navigate } }) => {
  return (
    <Styled.Container
      onPress={() => navigate("Stack", { screen: "Three" })}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Styled.Title>Movie</Styled.Title>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.background};
  `,

  Title: styled.Text`
    color: ${({ theme }) => theme.text};
  `,
};

export default Movie;
