import { observable } from 'mobx';
import { createContext } from 'react';

export class ProgressBarStore {
  @observable
  public progress = 0;

  public setProgress = (progress: number) => {
    this.progress = progress;
  };
}

export default createContext(new ProgressBarStore());
