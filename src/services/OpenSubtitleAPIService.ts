import axios from 'axios';
import config from '../config';
import { ISubtitle, IVideo } from '../types/models';
import { sliceString } from '../utils/sliceString';

const API_URL = 'https://api.opensubtitles.org:443/xml-rpc';
const USERAGENT = config.opensubtitles.useragent;

const removeWhitespace = (s: string) => s.replace(/\>\s+\</g, '><');

function getXMLStringForSearchSubtitles(hash: string, accessToken: string) {
  return removeWhitespace(`
<methodCall>
  <methodName>SearchSubtitles</methodName>
  <params>
    <param>
      <value><string>${accessToken}</string></value>
    </param>
    <param>
    <value>
      <array>
        <data>
          <value>
          <struct>
            <member>
              <name>moviehash</name>
              <value><string>${hash}</string></value>
            </member>
          </struct>
          </value>
        </data>
      </array>
    </value>
    </param>
  </params>
</methodCall>
  `);
}

function getXMLStringForLogin(userAgent: string) {
  return removeWhitespace(`
<methodCall>
  <methodName>LogIn</methodName>
  <params>
    <param>
      <value><string></string></value>
    </param>
    <param>
      <value><string></string></value>
    </param>
    <param>
      <value><string>en</string></value>
    </param>
    <param>
      <value><string>${userAgent}</string></value>
    </param>
  </params>
</methodCall>`);
}

export async function searchSubtitlesByHash(
  hash: string,
  accessToken: string
): Promise<ISubtitle[]> {
  const xmlBody = getXMLStringForSearchSubtitles(accessToken, hash);

  console.log('haloo');

  const response = await axios.post(API_URL, xmlBody, {
    onUploadProgress: e => {
      console.log(e);
    },
    onDownloadProgress: e => {
      console.log('x', e);
    },
  });

  let text = response.data;

  const extractData = (key: string) => {
    const start = `${key}</name><value><string>`;
    const pos = text.indexOf(start);
    const value = text.split(start)[1].split('</string>')[0];
    const length = start.length + value.length;

    // Remove extracted data from text
    text = sliceString(text, pos, length);
    return value;
  };

  const subtitles: ISubtitle[] = [];

  while (text.indexOf('ISO639</name>') !== -1) {
    const subtitle: ISubtitle = {
      languageAbbr: extractData('ISO639'),
      language: extractData('LanguageName'),
      downloadUrl: extractData('SubDownloadLink'),
    };

    subtitles.push(subtitle);
  }

  return subtitles.sort((a, b) => a.language.localeCompare(b.language));
}

export async function getAccessToken(): Promise<string> {
  const xmlBody = getXMLStringForLogin(USERAGENT);
  const request = await fetch(API_URL, {
    method: 'POST',
    body: xmlBody,
  });
  const text = await request.text();
  const token = text.split('<string>')[1].split('</string>')[0];

  return token;
}

export async function searchSubtitles(video: IVideo) {
  if (!video.hash) {
    return;
  }

  const accessToken = await getAccessToken();
  const searchResults = await searchSubtitlesByHash(video.hash, accessToken);

  return searchResults;
}
