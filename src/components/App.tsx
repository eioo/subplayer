import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import FileSelect from './FileSelect';
import Player from './Player';
import { VideoContext } from './Video.context';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  * {
    font-family: 'Roboto', sans-serif;
  }
`;

export default function App() {
  const [video, setVideo] = useState({
    url: '',
    filename: '',
  });

  return (
    <VideoContext.Provider
      value={{
        video,
        setVideo,
      }}
    >
      <GlobalStyle />

      <Player />
      <FileSelect />
    </VideoContext.Provider>
  );
}
