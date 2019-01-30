import iconv from 'iconv-lite';
import pako from 'pako';
import VTTConverter from 'srt-webvtt';
import { ISubtitle } from '../types/types';

export async function subtitleToWebVTT(subtitle: ISubtitle): Promise<string> {
  const srtData = await downloadSubtitle(subtitle.downloadUrl);
  const srtBlob = new Blob([srtData], { type: 'text/plain' }) as any;
  const vttConverter = new VTTConverter(srtBlob);
  const vttUrl = await vttConverter.getURL();

  return vttUrl;
}

async function downloadSubtitle(url: string): Promise<string> {
  const request = await fetch(url);
  const arrayBuffer = await request.arrayBuffer();
  const byteArray = new Uint8Array(arrayBuffer);
  const data = pako.inflate(byteArray);
  const srtData = iconv.decode(Buffer.from(data), 'iso-8859-1');

  return srtData;
}
