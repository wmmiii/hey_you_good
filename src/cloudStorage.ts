import { Feeling } from "./storage/localDb";

const CLIENT_ID = '976680013278-52o310ope7mjj88ssvc7s88seb8ajon2.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAXzyNu43MAlactrN5v25YZOYLpLEWDIIs';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive.appdata';

let tokenClient: google.accounts.oauth2.TokenClient;
let gapiInited: () => void;
let gisInited: () => void;

const gapiPromise = new Promise<void>((resolve) => {
  gapiInited = resolve;
});

const gisPromise = new Promise<void>((resolve) => {
  gisInited = resolve;
});

window['gapiLoaded'] = () => {
  gapi.load('client', async () => {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited();
  });
}

window['gisLoaded'] = () => {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: () => { }, // defined later
  });
  gisInited();
}

export async function getFeelings(): Promise<Array<Feeling>> {
  await authenticateUser();

  return JSON.parse(await getFileContents('feelings.json'));
}

export async function setFeelings(feelings: Feeling[]): Promise<void> {
  await authenticateUser();

  await setFile('feelings.json', JSON.stringify(feelings), 'application/json');
}

export async function authenticateUser(): Promise<void> {
  await Promise.all([gapiPromise, gisPromise]);

  await new Promise<void>((res, rej) => {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        rej(resp.error);
      }
      res();
    };

    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({ prompt: '' });
    }
  });
}

async function getFileMetadata(name: string): Promise<gapi.client.drive.File> {
  const listResponse = await gapi.client.drive.files.list({
    pageSize: 10,
    q: `name="${name}"`,
    fields: 'files(id, name)',
    spaces: 'appDataFolder',
  });

  const file = listResponse.result.files?.find((f) => f.name == name);
  if (file == null) {
    throw new Error(`Could not find file ${name}.`);
  }
  return file;
}

async function createFileMetadata(name: string, mimeType: string): Promise<gapi.client.drive.File> {
  const response = await gapi.client.drive.files.create({
    resource: {
      name: name,
      mimeType: mimeType,
      parents: ['appDataFolder'],
    }
  });

  return response.result;
}

async function getFileContents(name: string): Promise<string> {
  const file = await getFileMetadata(name);

  const fetchResponse = await gapi.client.drive.files.get({
    fileId: file.id!,
    alt: 'media',
  });

  return fetchResponse.body;
}

async function setFile(name: string, contents: string, mimeType?: string): Promise<string> {
  let file: gapi.client.drive.File;

  try {
    file = await getFileMetadata(name);
  } catch (_) {
    file = await createFileMetadata(name, mimeType || 'text/plain');
  }

  const response = await gapi.client.request({
    path: `https://www.googleapis.com/upload/drive/v3/files/${file.id!}`,
    method: 'PATCH',
    body: contents,
    params: {
      uploadType: 'media',
      fields: 'id,version,name',
    },
  });
  return response.body;
}
