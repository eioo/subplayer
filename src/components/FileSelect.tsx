import React, { useContext, useEffect } from 'react';
import { VideoContext } from './Video.context';

const supportedFileTypes = ['video/mp4', 'video/webm', 'video/ogg'];
const reader = new FileReader();

export default function Player() {
  const { setVideo } = useContext(VideoContext);

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

  const onFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target || !evt.target.files || !evt.target.files.length) {
      return;
    }

    const uploadedFile = evt.target.files[0];

    if (supportedFileTypes.indexOf(uploadedFile.type) === -1) {
      return alert('File type not supported.');
    }

    reader.onloadend = (loadEvent: any) => {
      // tslint:disable-next-line:no-console
      console.log(loadEvent);

      const blob = new Blob([new Uint8Array(loadEvent.target.result)], {
        type: uploadedFile.type,
      });
      const url = window.URL.createObjectURL(blob);

      setVideo({
        filename: uploadedFile.name,
        url,
      });
    };
  };

  return (
    <div>
      <input type="file" name="file" onChange={onFileChange} />
    </div>
  );
}
