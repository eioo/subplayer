import React, { useState } from 'react';
import styled from '../../../styled';

const Wrapper = styled.div`
  z-index: 1031;
  background: linear-gradient(to right, #b02333, #b0235d);
  height: 2px;
  position: sticky;
  left: 0;
  top: 0;
  transition: all 200ms linear;
`;

interface IProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: IProgressBarProps) => (
  <Wrapper
    style={{
      clipPath: `polygon(0 0, 0 100%, ${progress * 100}% 100%, ${progress *
        100}% 0)`,
      opacity: progress === 1 ? 0 : 1,
    }}
  />
);

export default ProgressBar;
