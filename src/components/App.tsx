import React, { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { searchSubtitlesByHash } from '../utils/opensubtitles';
import { AppContext, IVideo } from './App.context';
import FileSelect from './FileSelect';
import Player from './Player';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  * {
    font-family: 'Roboto', sans-serif;
  }
`;

export default function App() {
  const initialVideo: IVideo = {};
  const [video, setVideo] = useState(initialVideo);

  useEffect(
    () => {
      if (!video.hash) {
        return;
      }

      searchSubtitlesByHash(video.hash);
    },
    [video]
  );

  return (
    <AppContext.Provider
      value={{
        video,
        setVideo,
      }}
    >
      <GlobalStyle />

      <Player />
      <FileSelect />
    </AppContext.Provider>
  );
}
