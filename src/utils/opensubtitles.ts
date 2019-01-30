import config from '../config';
import { sliceString } from './sliceString';

const API_URL = 'https://api.opensubtitles.org:443/xml-rpc';
const USERAGENT = config.opensubtitles.useragent;

let accessToken: string;

interface ISubtitle {
  languageAbbr: string;
  language: string;
  downloadUrl: string;
}

export async function searchSubtitlesByHash(hash: string) {
  if (!accessToken) {
    accessToken = await getAccessToken();
  }

  const xmlBody = xmlSearchSubtitles
    .replace('%accessToken%', accessToken)
    .replace('%hash%', hash);
  const request = await fetch(API_URL, {
    method: 'POST',
    body: xmlBody,
  });
  let text = await request.text();

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

  console.log(subtitles);
}

async function getAccessToken(): Promise<string> {
  const xmlBody = xmlGetAccessToken.replace('%useragent%', USERAGENT);
  const request = await fetch(API_URL, {
    method: 'POST',
    body: xmlBody,
  });
  const text = await request.text();
  const token = text.split('<string>')[1].split('</string>')[0];

  return token;
}

const removeWhitespace = (s: string) => s.replace(/\>\s+\</g, '><');

const xmlGetAccessToken = removeWhitespace(`
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
      <value><string>%useragent%</string></value>
    </param>
  </params>
</methodCall>
`);

const xmlSearchSubtitles = removeWhitespace(`
<methodCall>
  <methodName>SearchSubtitles</methodName>
  <params>
    <param>
      <value><string>%accessToken%</string></value>
    </param>
    <param>
    <value>
      <array>
        <data>
          <value>
          <struct>
            <member>
              <name>moviehash</name>
              <value><string>%hash%</string></value>
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
