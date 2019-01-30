// tslint:disable:no-empty
import { createContext } from 'react';

export interface IVideo {
  filename?: string;
  url?: string;
  hash?: string;
}

interface IAppContext {
  video: IVideo;
  setVideo: React.Dispatch<React.SetStateAction<IVideo>>;
}

const initialState: IAppContext = {
  video: {
    filename: '',
    url: '',
    hash: '',
  },
  setVideo: () => {},
};

export const AppContext = createContext(initialState);
