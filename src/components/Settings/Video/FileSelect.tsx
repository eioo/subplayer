import React from 'react';
import styled from 'styled-components';
import dragDrop from '../../../../assets/icons/cloud-upload.svg';

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;

  > * {
    margin: 0.5rem 0;
  }
`;

const SelectLabel = styled.label`
  display: inline-flex;
  padding: 0 1rem;
  border-radius: 1rem;
  line-height: 2.5rem;
  box-shadow: 0px 3px 2px 0px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.065rem;
  background: linear-gradient(to right, #b02333, #b0235d);
  user-select: none;
  transition: transform 250ms;

  &:active {
    transform: scale(0.975);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
  }

  input[type='file'] {
    display: none;
  }
`;

const DragDropContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9rem;
  height: 6rem;
  border: 0.5rem solid rgba(255, 255, 255, 0.3);
  border-radius: 1rem;

  background-image: url(${dragDrop});
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
  filter: invert(50%);

  clip-path: polygon(
    20% 0,
    0 0,
    0 20%,
    100% 20%,
    100% 0,
    80% 0,
    80% 20%,
    80% 100%,
    100% 100%,
    100% 80%,
    0 80%,
    0 100%,
    20% 100%
  );

  img {
    width: 4rem;
    opacity: 0.4;
    filter: invert(1);
  }
`;

interface IFileSelectProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FileSelect(props: IFileSelectProps) {
  const { onChange } = props;

  return (
    <Container>
      <SelectLabel>
        <input type="file" name="file" onChange={onChange} />
        Valitse tiedosto
      </SelectLabel>

      <DragDropContainer />
    </Container>
  );
}
