import React from 'react';
import * as FileService from '../../services/FileService';
import FileSelect from '../FileSelect';

export default function Video() {
  const onFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target || !event.target.files || !event.target.files.length) {
      return;
    }

    const selectedFile = event.target.files[0];
    const selectedVideo = await FileService.fileToVideoInfo(selectedFile);

    if (selectedVideo) {
      // setVideo(selectedVideo);
      console.log('jea');
    }
  };

  return (
    <div>
      <h2>Video</h2>

      <FileSelect onChange={onFileSelect} />
    </div>
  );
}
