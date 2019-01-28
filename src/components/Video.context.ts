// tslint:disable:no-empty
import { createContext } from 'react';

interface IVideoContext {
  videoUrl: string;
  setVideoUrl: React.Dispatch<React.SetStateAction<string>>;
}

const initialState: IVideoContext = {
  videoUrl: '',
  setVideoUrl: () => {},
};

export const VideoContext = createContext(initialState);
