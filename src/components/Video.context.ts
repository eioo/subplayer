// tslint:disable:no-empty
import { createContext } from 'react';
import { IVideo } from '../types';

interface IVideoContext {
  video: IVideo;
  setVideo: React.Dispatch<React.SetStateAction<IVideo>>;
}

const initialState: IVideoContext = {
  video: {
    filename: '',
    url: '',
  },
  setVideo: () => {},
};

export const VideoContext = createContext(initialState);
