import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootFilm } from "../interfaces/IResponseMovie";
import { RootFilmById } from "../interfaces/IResponseMovieById";

const { VITE_API_URL, VITE_API_KEY } = process.env;

interface ISearchQueryParams {
  queryString: string;
  pageNumber: number;
}
export const filmApi = createApi({
  reducerPath: "filmApi",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_API_URL,
    prepareHeaders: (headers) => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      headers.set("Authorization", `Bearer ${VITE_API_KEY}`);
    },
  }),
  //TODO chiamata con accanto la response in una tabella in ate,
  //TODO tempo stimato per ogni cosa es login signup dashboard ecc poi tempo di definezione di done, contingensy
  //TODO nelle sezioni scrivere il principio di funzionamento, le chiamate che fa, l'oggetto che salva ecc
  endpoints: (builder) => ({
    getUpcomingMovies: builder.query<RootFilm, number>({
      query: (numberPage: number) => `/movie/upcoming?page=${numberPage}`,
    }),
    getTopRatedMovies: builder.query<RootFilm, number>({
      query: (numberPage: number) => `/movie/top_rated?page=${numberPage}`,
    }),
    getUpcomingMoviesById: builder.query<RootFilmById, string>({
      query: (movieId: string) => `/movie/${movieId}`,
    }),
    getFilmBySearch: builder.query<RootFilm, ISearchQueryParams>({
      query: ({ queryString, pageNumber }) =>
        `/search/movie?query=${queryString.trim()}&page=${pageNumber}`,
    }),
  }),
});

export const {
  useGetUpcomingMoviesQuery,
  useGetUpcomingMoviesByIdQuery,
  useGetFilmBySearchQuery,
  useGetTopRatedMoviesQuery,
} = filmApi;
