import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import Slide from "../components/Slide";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "d8e560fb14d2560d6f578c07fee2ac0e";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movie: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    const response = await fetch(
      `${BASE_URL}/movie/trending/movie/week?api_key=${API_KEY}`
    );
    const { results } = await response.json();
    setTrending(results);
  };

  const getUpcoming = async () => {
    const response = await fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&region=kr`
    );
    const { results } = await response.json();
    setUpComing(results);
  };

  const getNowPlaying = async () => {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=kr`
    );
    const { results } = await response.json();
    setNowPlaying(results);
  };

  const getData = async () => {
    await Promise.all([getTrending(), getNowPlaying(), getUpcoming()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Styled.Loader>
      <ActivityIndicator />
    </Styled.Loader>
  ) : (
    <Styled.Container>
      <Swiper
        horizontal
        showsButtons={false}
        showsPagination={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
        autoplay
        autoplayTimeout={3.5}
        loop
      >
        {nowPlaying.map((movie) => (
          <Slide
            key={movie.id}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            voteAverage={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.ScrollView``,

  Loader: styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
  `,
};

export default Movie;
