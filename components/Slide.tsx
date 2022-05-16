import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import { makeImgPath } from "../utils";
import Poster from "./Poster";
import Votes from "./Votes";

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
}) => {
  const userTheme = useColorScheme();
  return (
    <View style={{ flex: 1 }}>
      <Styled.BackgroundImage
        source={{ uri: makeImgPath(backdropPath) }}
        style={StyleSheet.absoluteFill}
      />
      <BlurView
        tint={userTheme || "light"}
        intensity={80}
        style={StyleSheet.absoluteFill}
      >
        <Styled.Wrapper>
          <Poster path={posterPath} />
          <Styled.Column>
            <Styled.Title>{originalTitle}</Styled.Title>
            <Votes votes={voteAverage} />
            <Styled.Overview>{overview.slice(0, 90)}...</Styled.Overview>
          </Styled.Column>
        </Styled.Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;

const Styled = {
  BackgroundImage: styled.Image``,

  Title: styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
  `,

  Overview: styled.Text`
    margin-top: 10px;
    color: ${({ theme }) => theme.text}; ;
  `,

  Wrapper: styled.View`
    flex-direction: row;
    height: 100%;
    justify-content: center;
    align-items: center;
  `,

  Column: styled.View`
    width: 50%;
    margin-left: 15px;
  `,
};
