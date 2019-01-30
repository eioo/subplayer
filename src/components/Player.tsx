import React, { useContext } from 'react';
import { AppContext } from './App.context';

export default function Player() {
  const { video, subTrack } = useContext(AppContext);

  return (
    <div>
      <video width="640" height="360" key={video.url} controls>
        {subTrack && <track default kind="captions" src={subTrack} />}
        <source src={video.url} type="video/mp4" />
        Video tags not supported
      </video>
    </div>
  );
}
