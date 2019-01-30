// tslint:disable:no-empty
import { createContext } from 'react';
import { ISubtitle, IVideo } from '../types/types';

interface IAppContext {
  video: IVideo;
  subtitles: ISubtitle[];
  subTrack: string;
  setVideo: React.Dispatch<React.SetStateAction<IVideo>>;
  setSubtitles: React.Dispatch<React.SetStateAction<ISubtitle[]>>;
  setSubTrack: React.Dispatch<React.SetStateAction<string>>;
}

const initialState: IAppContext = {
  video: {
    filename: '',
    url: '',
    hash: '',
  },
  subtitles: [],
  subTrack: '',
  setVideo: () => {},
  setSubtitles: () => {},
  setSubTrack: () => {},
};

export const AppContext = createContext(initialState);
