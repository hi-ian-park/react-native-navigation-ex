import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import Poster from "../components/Poster";
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
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    );
    const { results } = await response.json();
    console.log("results: ", results);
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
    <Styled.SafeAreaView>
      <Styled.Container>
        <Swiper
          horizontal
          showsButtons={false}
          showsPagination={false}
          containerStyle={{
            width: "100%",
            height: SCREEN_HEIGHT / 4,
            marginBottom: 30,
          }}
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
        <Styled.ListContainer>
          <Styled.ListTitle>Trending Movies</Styled.ListTitle>
          <Styled.TrendingScroll
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {trending?.map((movie) => (
              <Styled.Movie key={movie.id}>
                <Poster path={movie.poster_path} />
                <Styled.Title>
                  {movie.original_title.slice(0, 13)}
                  {movie.original_title.length > 13 && "..."}
                </Styled.Title>
                {movie.vote_average > 0 && (
                  <Styled.Votes>⭐️ {movie.vote_average} / 10</Styled.Votes>
                )}
              </Styled.Movie>
            ))}
          </Styled.TrendingScroll>
        </Styled.ListContainer>

        <Styled.ListContainer>
          <Styled.ListTitle>Coming Soon</Styled.ListTitle>
          {upComing.map((movie) => (
            <Styled.HorizontalMovie key={movie.id}>
              <Poster path={movie.poster_path} />
              <Styled.HorizontalColumn>
                <Styled.Title>{movie.original_title}</Styled.Title>
                <Styled.Date>
                  Coming:{" "}
                  {new Date(movie.release_date).toLocaleDateString("ko")}
                </Styled.Date>
                <Styled.OverView>
                  {movie.overview.length > 140
                    ? movie.overview.slice(0, 140)
                    : movie.overview}
                </Styled.OverView>
              </Styled.HorizontalColumn>
            </Styled.HorizontalMovie>
          ))}
        </Styled.ListContainer>
      </Styled.Container>
    </Styled.SafeAreaView>
  );
};

const Styled = {
  SafeAreaView: styled.SafeAreaView``,

  Container: styled.ScrollView``,

  HorizontalMovie: styled.View`
    flex-direction: row;
    margin-bottom: 10px;
  `,

  HorizontalColumn: styled.View`
    margin-left: 10px;
    width: 100%;
  `,

  Loader: styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
  `,

  ListContainer: styled.View`
    padding: 0 20px;
    margin-bottom: 40px;
  `,

  ListTitle: styled.Text`
    color: ${({ theme }) => theme.text};
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
  `,

  Movie: styled.View`
    align-items: center;
    margin-right: 20px;
  `,

  Title: styled.Text`
    color: ${({ theme }) => theme.text};
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 5px;
  `,

  Votes: styled.Text`
    color: ${({ theme }) => theme.text};
  `,

  OverView: styled.Text`
    color: ${({ theme }) => theme.text};
    width: 70%;
  `,

  TrendingScroll: styled.ScrollView``,

  Date: styled.Text`
    font-size: 12px;
    color: ${({ theme }) => theme.text};
    margin-bottom: 5px;
  `,
};

export default Movie;
