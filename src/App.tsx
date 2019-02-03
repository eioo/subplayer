import React, { useEffect, useState } from 'react';
import FileSelect from './components/FileSelect';
import Info from './components/Info';
import Player from './components/Player';
import Settings from './components/Settings/Settings';
import SubtitleSelect from './components/SubtitleSelect';
import * as FileService from './services/FileService';
import * as OpenSubtitleAPIService from './services/OpenSubtitleAPIService';
import * as SubtitleService from './services/SubtitleService';
import styled, { createGlobalStyle, ThemeProvider } from './styled-components';
import colors from './theme/colors';
import { ISubtitle, IVideo } from './types/models';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600');
  @import url('https://fonts.googleapis.com/css?family=Inconsolata');

  body {
    display: flex;
    margin: 0;
    font-family: 'Open Sans', sans-serif;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Container = styled.div`
  flex: 1;
  background: ${p => p.theme.background};
  color: ${p => p.theme.foreground};

  h2 {
    font-size: 1.1rem;
    text-transform: uppercase;
  }
`;

export default function App() {
  const initialVideo: IVideo = {};
  const initialSubtitles: ISubtitle[] = [];

  const [video, setVideo] = useState(initialVideo);
  const [subtitles, setSubtitles] = useState(initialSubtitles);
  const [subTrack, setSubTrack] = useState('');

  const fetchSubtitles = async () => {
    const searchResults = await OpenSubtitleAPIService.searchSubtitles(video);

    if (searchResults) {
      setSubtitles(searchResults);
    }
  };

  useEffect(
    () => {
      fetchSubtitles();
    },
    [video]
  );

  const onSubtitleSelect = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target as HTMLSelectElement;
    const subtitle = subtitles[Number(value)];

    if (subtitle) {
      const url = await SubtitleService.subtitleToWebVTT(subtitle);
      setSubTrack(url);
    }
  };

  const onFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target || !event.target.files || !event.target.files.length) {
      return;
    }

    const selectedFile = event.target.files[0];
    const selectedVideo = await FileService.fileToVideoInfo(selectedFile);

    if (selectedVideo) {
      setVideo(selectedVideo);
    }
  };

  return (
    <ThemeProvider theme={colors}>
      <Container>
        <GlobalStyle />

        <Player video={video} subTrack={subTrack} />

        <Settings />

        {/*         <SubtitleSelect subtitles={subtitles} onChange={onSubtitleSelect} />
        <FileSelect onChange={onFileSelect} />
        <Info video={video} subTrack={subTrack} /> */}
      </Container>
    </ThemeProvider>
  );
}
