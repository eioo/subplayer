import React, { useContext } from 'react';
import styled from 'styled-components';
import { ISubtitle } from '../types/types';
import { subtitleToWebVTT } from '../utils/subtitleToWebVTT';
import { AppContext } from './App.context';

interface ISubSelectProps {
  visible: boolean;
}

const SubSelect = styled.div`
  display: ${({ visible }: ISubSelectProps) =>
    visible ? 'inline-block' : 'none'};
`;

export default function SubtitleSelect() {
  const { subtitles, setSubTrack } = useContext(AppContext);

  const downloadSubtitle = async (subtitle: ISubtitle) => {
    const url = await subtitleToWebVTT(subtitle);
    setSubTrack(url);
  };

  const handleSelect = (event: React.SyntheticEvent) => {
    const { value } = event.target as HTMLSelectElement;
    const subtitle = subtitles[value];

    if (!subtitle) {
      return alert('Something went wrong');
    }

    downloadSubtitle(subtitle);
  };

  return (
    <SubSelect visible={!!subtitles.length}>
      Subtitles:&nbsp;
      <select onChange={handleSelect}>
        <option defaultValue={`Select subtitle (${subtitles.length})`}>
          Select subtitle
        </option>
        {subtitles.map((subtitle, i) => (
          <option key={i} value={i}>
            {subtitle.language}
          </option>
        ))}
      </select>
    </SubSelect>
  );
}
