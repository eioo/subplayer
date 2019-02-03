import React from 'react';
import styled from 'styled-components';
import { IVideo } from '../types/models';

const Grid = styled.span`
  display: grid;
  grid-template-columns: 150px 1fr;
`;

const Left = styled.span`
  padding-right: 15px;
  text-align: right;
`;

const Right = styled.span`
  color: gray;
`;

interface IInfoProps {
  video: IVideo;
  subTrack: string;
}

export default function Info(props: IInfoProps) {
  const { video, subTrack } = props;

  return (
    <Grid>
      <Left>URL:</Left>
      <Right>{video.url || '-'}</Right>

      <Left>Filename:</Left>
      <Right>{video.filename || '-'}</Right>

      <Left>File hash:</Left>
      <Right>{video.hash || '-'}</Right>

      <Left>Subtitle track url:</Left>
      <Right>{subTrack || '-'}</Right>
    </Grid>
  );
}
