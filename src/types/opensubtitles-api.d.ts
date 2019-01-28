declare module 'opensubtitles-api' {
  interface IOpenSubtitlesConfig {
    useragent: string;
    username: string;
    password: string;
    ssl: boolean;
  }

  class OpenSubtitles {
    constructor(config: IOpenSubtitlesConfig);
  }

  export = OpenSubtitles;
}
