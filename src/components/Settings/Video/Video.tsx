import bytes from 'bytes';
import React, { useContext, useState } from 'react';
import * as FileService from '../../../services/FileService';
import styled from '../../../styled';
import ProgressBarStore from '../ProgressBar/store';
import SettingsStore from '../store';
import FileSelect from './FileSelect';

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;

  > *:first-of-type {
    margin-right: 1rem;
  }
`;

const InfoWrapper = styled.div`
  padding-top: 3rem;
`;

const Info = styled.div`
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.065rem;
  color: #a2a2a2;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export default function Video() {
  const { video, setVideo } = useContext(SettingsStore);
  const { setProgress } = useContext(ProgressBarStore);

  const onFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target || !event.target.files || !event.target.files.length) {
      return;
    }

    const selectedFile = event.target.files[0];

    const selectedVideo = await FileService.fileToVideoInfo(
      selectedFile,
      progress => {
        setProgress(progress);
      }
    );

    if (selectedVideo) {
      setVideo(selectedVideo);
    }
  };

  return (
    <div>
      <h2>Video</h2>

      <SelectWrapper>
        <FileSelect onChange={onFileSelect} />

        <InfoWrapper>
          {video && (
            <>
              <h4>Nimi</h4>
              <Info>{video.filename}</Info>

              <h4>URL</h4>
              <Info>{video.url}</Info>
            </>
          )}
        </InfoWrapper>
      </SelectWrapper>
    </div>
  );
}
