import React, { useContext } from 'react';
import * as SubtitleService from '../../../services/SubtitleService';
import SettingsStore from '../store';
import SubtitleSelect from './SubtitleSelect';

export default function Subtitles() {
  const { subtitles, setSubtrack } = useContext(SettingsStore);

  const onSubtitleSelect = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target as HTMLSelectElement;
    const subtitle = subtitles[Number(value)];

    if (subtitle) {
      const url = await SubtitleService.subtitleToWebVTT(subtitle);
      setSubtrack(url);
    }
  };

  return (
    <div>
      <h2>Tekstitykset</h2>
      <SubtitleSelect subtitles={subtitles} onChange={onSubtitleSelect} />
    </div>
  );
}
