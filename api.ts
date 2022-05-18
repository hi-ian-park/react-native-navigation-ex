const API_KEY = "d8e560fb14d2560d6f578c07fee2ac0e";
const BASE_URL = "https://api.themoviedb.org/3";

// api의 실제 데이터는 모두 results 안에 있어야 함.
export const fetcher = async (url: string) => {
  const data = await (await fetch(url)).json();
  return data?.results;
};

export const trendingUrl = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
export const upComingUrl = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ko-KR&region=kr`;
export const nowPlayingUrl = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=kr`;
