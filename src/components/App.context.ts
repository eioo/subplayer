// tslint:disable:no-empty
import { createContext } from 'react';
import { ISubtitle, IVideo } from '../types/types';

interface IAppContext {
  video: IVideo;
  subtitles: ISubtitle[];
  setVideo: React.Dispatch<React.SetStateAction<IVideo>>;
  setSubtitles: React.Dispatch<React.SetStateAction<ISubtitle[]>>;
}

const initialState: IAppContext = {
  video: {
    filename: '',
    url: '',
    hash: '',
  },
  subtitles: [],
  setVideo: () => {},
  setSubtitles: () => {},
};

export const AppContext = createContext(initialState);
