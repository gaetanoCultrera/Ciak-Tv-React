export interface RootFilm {
  dates: Dates;
  page: number;
  results: CustomDataCard[];
  total_pages: number;
  total_results: number;
}

export interface Dates {
  maximum: string;
  minimum: string;
}

export interface CustomDataCard {
  id: string;
  poster_path: string;
  title: string;
}
