import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import { makeImgPath } from "../utils";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "d8e560fb14d2560d6f578c07fee2ac0e";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movie: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);

  const getNowPlaying = async () => {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=kr`
    );
    const { results } = await response.json();
    setNowPlaying(results);
    setLoading(false);
  };

  useEffect(() => {
    getNowPlaying();
  }, []);

  return loading ? (
    <Styled.Loader>
      <ActivityIndicator />
    </Styled.Loader>
  ) : (
    <Styled.Container>
      <Swiper
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
        timeout={3.5}
        controlsEnabled={false}
        loop
      >
        {nowPlaying.map((movie) => (
          <Styled.View key={movie.id}>
            <Styled.BackgroundImage
              source={{ uri: makeImgPath(movie.backdrop_path) }}
              style={StyleSheet.absoluteFill}
            />
            <BlurView intensity={20} style={StyleSheet.absoluteFill}>
              <Styled.Title>{movie.title}</Styled.Title>
            </BlurView>
          </Styled.View>
        ))}
      </Swiper>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.ScrollView``,

  View: styled.View`
    flex: 1;
  `,

  Loader: styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
  `,

  BackgroundImage: styled.Image`
    margin: 10px;
    border-radius: 20px;
  `,

  Title: styled.Text`
    font-size: 28px;
  `,
};

export default Movie;
