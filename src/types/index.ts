export interface IVideo {
  filename: string;
  url: string;
}

export type ISearchParams = RequireAtLeastOne<{
  episode?: number;
  imdbid?: string;
  moviebytesize?: number;
  moviehash?: string;
  query?: string;
  season?: number;
  sublanguageid?: string;
  tag?: string;
}>;

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  { [K in Keys]-?: Required<Pick<T, K>> }[Keys];
