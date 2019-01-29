import React, { useContext, useEffect } from 'react';
import { getFileHash } from '../utils/filehash';
import { searchSubtitlesByFilename } from '../utils/opensubtitles';
import { AppContext } from './App.context';

const supportedFileTypes = ['video/mp4', 'video/webm', 'video/ogg'];
const arrayBufferReader = new FileReader();

export default function Player() {
  const { setVideo } = useContext(AppContext);

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

    arrayBufferReader.onloadend = ({ target }: any) => {
      const blob = new Blob([new Uint8Array(target.result)], {
        type: uploadedFile.type,
      });
      const url = window.URL.createObjectURL(blob);

      setVideo({
        filename: uploadedFile.name,
        url,
      });

      searchSubtitlesByFilename(uploadedFile.name);
    };

    arrayBufferReader.readAsArrayBuffer(uploadedFile);

    getFileHash(uploadedFile, fileHash => {
      console.log('Calculated filehash: ' + fileHash);
    });
  };

  return (
    <div>
      <input type="file" name="file" onChange={onFileChange} />
    </div>
  );
}
