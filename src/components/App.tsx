import React, { useEffect, useState } from 'react';
import FileSelect from './FileSelect';
import Player from './Player';
import { VideoContext } from './Video.context';

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
      <Player />
      <FileSelect />
    </VideoContext.Provider>
  );
}
