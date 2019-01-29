// tslint:disable:no-empty
import { createContext } from 'react';
import { IVideo } from '../types';

interface IAppContext {
  video: IVideo;
  setVideo: React.Dispatch<React.SetStateAction<IVideo>>;
}

const initialState: IAppContext = {
  video: {
    filename: '',
    url: '',
  },
  setVideo: () => {},
};

export const AppContext = createContext(initialState);
