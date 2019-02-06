import { observable } from 'mobx';
import { createContext } from 'react';
import { IVideo } from '../../types/models';
import { ISubtitle } from './../../types/models';

export class SettingsStore {
  @observable
  public video: IVideo | null = null;

  @observable
  public subtitles: ISubtitle[] = [];

  @observable
  public selectedSubtitle: string | null = null;

  public setVideo = (video: IVideo) => {
    this.video = video;
  };

  public setSubtitles = (subtitles: ISubtitle[]) => {
    this.subtitles = subtitles;
  };

  public setSelectedSubtitle = (selectedSubtitle: string) => {
    this.selectedSubtitle = selectedSubtitle;
  };
}

export default createContext(new SettingsStore());
