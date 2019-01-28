import React, { useContext } from 'react';
import { VideoContext } from './Video.context';

export default function Player() {
  const { videoUrl } = useContext(VideoContext);

  return (
    <video width="640" height="360" key={videoUrl} controls>
      <source src={videoUrl || ''} type="video/mp4" />
      Video tags not supported
    </video>
  );
}
