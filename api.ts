const API_KEY = "d8e560fb14d2560d6f578c07fee2ac0e";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetcher = async (url: string) => {
  const data = await (await fetch(url)).json();
  return data;
};

const trendingUrl = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
const upComingUrl = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&region=kr`;
const nowPlayingUrl = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=kr`;

export const apiUrl = { trendingUrl, upComingUrl, nowPlayingUrl };
