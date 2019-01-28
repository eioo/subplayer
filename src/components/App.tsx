import React, { useState } from 'react';
import FileSelect from './FileSelect';
import Player from './Player';
import { VideoContext } from './Video.context';
// import * as OS from 'opensubtitles-api';

export default function App() {
  const [videoUrl, setVideoUrl] = useState('');

  /* 
  useEffect(() => {
    const OpenSubtitles = new OS({
      useragent: process.env.OPENSUBTITLES_API_KEY,
      username: process.env.OPENSUBTITLES_USERNAME,
      password: process.env.OPENSUBTITLES_PASSWORD,
      ssl: true,
    });
  }, []);
  */

  return (
    <VideoContext.Provider
      value={{
        videoUrl,
        setVideoUrl,
      }}
    >
      <Player />
      <FileSelect />
    </VideoContext.Provider>
  );
}
