import config from '../config';

const API_URL = 'https://api.opensubtitles.org:443/xml-rpc';
const USERAGENT = config.opensubtitles.useragent;

let accessToken: string;

export async function searchSubtitlesByHash(hash: string) {
  if (!accessToken) {
    accessToken = await getAccessToken();
  }

  // TODO: Do subtitle search here
}

async function getAccessToken(): Promise<string> {
  const xmlBody = `
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
         <value><string>${USERAGENT}</string></value>
        </param>
      </params>
    </methodCall>
  `;

  const request = await fetch(API_URL, {
    method: 'POST',
    body: xmlBody,
  });
  const text = await request.text();
  const token = text.split('<string>')[1].split('</string>')[0];

  return token;
}
