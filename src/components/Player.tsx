import React, { useContext } from 'react';
import { AppContext } from './App.context';

export default function Player() {
  const { video } = useContext(AppContext);

  return (
    <div>
      <video width="640" height="360" key={video.url} controls>
        <source src={video.url} type="video/mp4" />
        Video tags not supported
      </video>
      <p>Filename: {video.filename || '-'}</p>
    </div>
  );
}
