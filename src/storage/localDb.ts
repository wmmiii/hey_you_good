
const dbName = 'heyYouGoodData';
const feelingsOS = 'feelings';
const logEntriesOS = 'logEntries';

let dbPromise: Promise<IDBDatabase>;

export function initStorage(): Promise<void> {
  dbPromise = new Promise((resolve, reject) => {
    const openRequest = window.indexedDB.open(dbName, 2);

    openRequest.onerror = reject;
    openRequest.onsuccess = () => {
      resolve(openRequest.result);
    };
    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      db.onerror = reject;

      if (!db.objectStoreNames.contains(feelingsOS)) {
        db.createObjectStore(feelingsOS, { keyPath: 'ts' });
      }
      if (db.objectStoreNames.contains(logEntriesOS)) {
        db.deleteObjectStore(logEntriesOS);
      }
    };
  });

  return dbPromise.then(() => { });
}

async function getObjectStore(name: string): Promise<IDBObjectStore> {
  const db = await dbPromise;
  return db.transaction(name, 'readwrite').objectStore(name);
}

export interface Feeling {
  ts: Date;
  model: 'gloria';
  path: string[];
};

export async function recordFeeling(ts: Date, path: string[]): Promise<void> {
  const os = await getObjectStore(feelingsOS);
  os.add({ ts, model: 'gloria', path } as Feeling);
}

export async function getFeelings(from: Date, to: Date): Promise<Feeling[]> {
  const os = await getObjectStore(feelingsOS);
  return new Promise((resolve, reject) => {
    const cursorRequest = os.openCursor(IDBKeyRange.bound(from, to));
    cursorRequest.onerror = reject;

    const list: Feeling[] = [];
    cursorRequest.onsuccess = (event) => {
      const cursor = (event.target as any).result as IDBCursorWithValue;
      if (cursor) {
        list.push(cursor.value);
        cursor.continue();
      } else {
        resolve(list);
      }
    };
  })
}

export interface LogEntry {
  ts: Date;
  entries: { [prompt: string]: string };
}

export async function recordLogEntries(ts: Date, entries: LogEntry['entries']): Promise<void> {
  const os = await getObjectStore(logEntriesOS);
  os.add({ ts, entries });
}

export async function getLogEntries(from: Date, to: Date): Promise<LogEntry[]> {
  const os = await getObjectStore(logEntriesOS);
  return new Promise((resolve, reject) => {
    const cursorRequest = os.openCursor(IDBKeyRange.bound(from, to));
    cursorRequest.onerror = reject;

    const list: LogEntry[] = [];
    cursorRequest.onsuccess = (event) => {
      const cursor = (event.target as any).result as IDBCursorWithValue;
      if (cursor) {
        list.push(cursor.value);
        cursor.continue();
      } else {
        resolve(list);
      }
    };
  })
}
