import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './App.context';

interface ISubSelectProps {
  visible: boolean;
}

const SubSelect = styled.div`
  display: ${({ visible }: ISubSelectProps) =>
    visible ? 'inline-block' : 'none'};
`;

export default function SubtitleSelect() {
  const { subtitles } = useContext(AppContext);

  return (
    <SubSelect visible={!!subtitles.length}>
      Subtitles:&nbsp;
      <select>
        {subtitles.map((subtitle, i) => (
          <option key={i} value={subtitle.languageAbbr}>
            {subtitle.language}
          </option>
        ))}
      </select>
    </SubSelect>
  );
}
