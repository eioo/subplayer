import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { getFileHash } from '../utils/filehash';
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

    const selectedFile = evt.target.files[0];

    if (supportedFileTypes.indexOf(selectedFile.type) === -1) {
      return alert('File type not supported.');
    }

    arrayBufferReader.onloadend = async ({ target }: any) => {
      const blob = new Blob([new Uint8Array(target.result)], {
        type: selectedFile.type,
      });
      const url = window.URL.createObjectURL(blob);
      const hash = await getFileHash(selectedFile);

      setVideo({
        filename: selectedFile.name,
        url,
        hash,
      });
    };

    arrayBufferReader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div>
      <p>
        <input type="file" name="file" onChange={onFileChange} />
      </p>
    </div>
  );
}
