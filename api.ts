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

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export const fetcher = async (url: string, param = '') => {
  console.log(param);
  const { data } = await axios.get(url + param);
  return data;
};

export const movieUrl = {
  trending: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ko-KR&region=kr`,
  upComing: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&region=kr`,
  nowPlaying: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=kr`,
  search: `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&region=kr&query=`,
};

export const tvUrl = {
  trending: `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`,
  airingToday: `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=ko-KR&region=kr`,
  topRated: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=ko-KR&region=kr`,
  search: `${BASE_URL}/search/tv?api_key=${API_KEY}&language=ko-KR&region=kr&query=`,
};
