import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './App.context';

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

export default function Info() {
  const { video, subTrack } = useContext(AppContext);

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
