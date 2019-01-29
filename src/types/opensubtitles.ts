export interface IRequestParam {
  type: string;
  value: string | number | undefined;
}

export interface ILogInRequest {
  username?: string;
  password?: string;
  language?: string;
  useragent: string;
}

export interface ILogInResponse {
  token: string;
  status: string;
  seconds: number;
}

export interface ISearchSubtitlesRequest {
  token: string;
}
