import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { AppContext } from './App.context';
import FileSelect from './FileSelect';
import Player from './Player';

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
