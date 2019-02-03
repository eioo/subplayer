import { IVideo } from '../types/models';
import { getFileHash } from '../utils/fileHash';

const supportedFileTypes = [
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/mkv',
];

const isSupportedAPI = () =>
  window.File || window.FileReader || window.FileList || window.Blob;

export function fileToVideoInfo(file: File) {
  if (!isSupportedAPI) {
    throw new Error('The File APIs are not fully supported in this browser.');
  }

  /*  if (!supportedFileTypes.includes(file.type)) {
    throw new Error('File type not supported');
  } */

  return new Promise(resolve => {
    const arrayBufferReader = new FileReader();

    arrayBufferReader.onloadend = async ({ target }: any) => {
      const blob = new Blob([new Uint8Array(target.result)], {
        type: file.type,
      });
      const url = window.URL.createObjectURL(blob);
      const hash = await getFileHash(file);
      const video: IVideo = {
        filename: file.name,
        url,
        hash,
      };

      resolve(video);
    };

    arrayBufferReader.readAsArrayBuffer(file);
  }) as Promise<IVideo | undefined>;
}
