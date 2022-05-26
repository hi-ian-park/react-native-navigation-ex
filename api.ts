import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'd8e560fb14d2560d6f578c07fee2ac0e';

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TV {
  name: string;
  original_name: string;
  origin_country: string[];
  vote_count: number;
  backdrop_path: string | null;
  vote_average: number;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  popularity: number;
  media_type: string;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export const fetcher = async (url: string, param = '') => {
  const { data } = await axios.get(url + param);
  return data;
};

export const movieUrl = {
  trending: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ko-KR&region=kr`,
  upComing: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&region=kr`,
  nowPlaying: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=kr`,
  search: `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&region=kr&query=`,
  detail: (id: number) =>
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`,
};

export const tvUrl = {
  trending: `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`,
  airingToday: `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=ko-KR&region=kr`,
  topRated: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=ko-KR&region=kr`,
  search: `${BASE_URL}/search/tv?api_key=${API_KEY}&language=ko-KR&region=kr&query=`,
  detail: (id: number) =>
    `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos`,
};
