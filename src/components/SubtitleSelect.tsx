import React from 'react';
import styled from 'styled-components';
import { ISubtitle } from '../types/models';

interface IContainerProps {
  visible: boolean;
}

const Container = styled.div`
  display: ${({ visible }: IContainerProps) =>
    visible ? 'inline-block' : 'none'};
`;

interface ISubtitleSelectProps {
  subtitles: ISubtitle[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SubtitleSelect(props: ISubtitleSelectProps) {
  const { subtitles, onChange } = props;

  return (
    <Container visible={Boolean(subtitles.length)}>
      Subtitles:&nbsp;
      <select onChange={onChange}>
        <option defaultValue={`Select subtitle (${subtitles.length})`}>
          Select subtitle
        </option>
        {subtitles.map((subtitle, i) => (
          <option key={i} value={i}>
            {subtitle.language}
          </option>
        ))}
      </select>
    </Container>
  );
}
