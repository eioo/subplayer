import { css, Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import React, { useEffect, useState } from 'react';
import * as FileService from '../services/FileService';
import * as OpenSubtitleAPIService from '../services/OpenSubtitleAPIService';
import * as SubtitleService from '../services/SubtitleService';
import styled from '../styled';
import colors from '../theme/colors';
import { ISubtitle, IVideo } from '../types/models';
import Player from './Player/Player';
import Settings from './Settings/Settings';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600');
  @import url('https://fonts.googleapis.com/css?family=Inconsolata');
  @import url('https://fonts.googleapis.com/css?family=Laila');
  @import url('https://fonts.googleapis.com/css?family=Montserrat');

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
    font-size: 1.4rem;
    font-family: 'Open Sans';
    font-weight: 600;
    color: #ddd;
  }

  a {
    font-family: 'Montserrat';
    font-size: 1rem;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 0.85rem;
    letter-spacing: 0.08em;
  }

  h4 {
    font-size: 0.95rem;
    margin: 0;
  }
`;

export default function App() {
  const initialVideo: IVideo = {};
  const initialSubtitles: ISubtitle[] = [];

  const [video, setVideo] = useState(initialVideo);
  const [subtitles, setSubtitles] = useState(initialSubtitles);
  const [subtrack, setSubtrack] = useState('');
  const [progress, setProgress] = useState(0);

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

  return (
    <ThemeProvider theme={colors}>
      <Container>
        <Global styles={globalStyles} />

        <Player video={video} subtrack={subtrack} />

        <Settings />

        {/*         <SubtitleSelect subtitles={subtitles} onChange={onSubtitleSelect} />
        <FileSelect onChange={onFileSelect} />
        <Info video={video} subTrack={subTrack} /> */}
      </Container>
    </ThemeProvider>
  );
}
