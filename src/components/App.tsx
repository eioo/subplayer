import React, { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { ISubtitle, IVideo } from '../types/types';
import { searchSubtitlesByHash } from '../utils/opensubtitles';
import { AppContext } from './App.context';
import FileSelect from './FileSelect';
import Info from './Info';
import Player from './Player';
import SubtitleSelect from './SubtitleSelect';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  * {
    font-family: 'Roboto', sans-serif;
  }
`;

export default function App() {
  const initialVideo: IVideo = {};
  const initialSubtitles: ISubtitle[] = [];
  const [video, setVideo] = useState(initialVideo);
  const [subtitles, setSubtitles] = useState(initialSubtitles);
  const [subTrack, setSubTrack] = useState('');

  const fetchSubtitles = async () => {
    if (!video.hash) {
      return;
    }

    const searchResults = await searchSubtitlesByHash(video.hash);
    setSubtitles(searchResults);
  };

  useEffect(
    () => {
      fetchSubtitles();
    },
    [video]
  );

  return (
    <AppContext.Provider
      value={{
        video,
        subtitles,
        subTrack,
        setVideo,
        setSubtitles,
        setSubTrack,
      }}
    >
      <GlobalStyle />

      <Player />
      <SubtitleSelect />
      <FileSelect />
      <Info />
    </AppContext.Provider>
  );
}
