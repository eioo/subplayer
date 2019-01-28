import React, { useContext, useEffect, useState } from 'react';
import { VideoContext } from './Video.context';

const reader = new FileReader();

export default function Player() {
  const { setVideoUrl } = useContext(VideoContext);

  useEffect(() => {
    const supported = [
      window.File,
      window.FileReader,
      window.FileList,
      window.Blob,
    ].some(x => x);

    if (!supported) {
      alert('The File APIs are not fully supported in this browser.');
    }
  }, []);

  const onFileChange = (evt: any) => {
    const uploadedFile = evt.target.files[0];

    reader.onloadend = (loadEvent: any) => {
      // tslint:disable-next-line:no-console
      console.log(loadEvent.target);

      const video = new Blob([new Uint8Array(loadEvent.target.result)], {
        type: 'video/mp4',
      });
      const url = window.URL.createObjectURL(video);

      setVideoUrl(url);
    };

    reader.readAsArrayBuffer(uploadedFile);
  };

  return (
    <div>
      <input type="file" name="file" onChange={onFileChange} />
    </div>
  );
}
