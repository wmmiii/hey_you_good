
const dbName = 'heyYouGoodData';
const feelingsOS = 'feelings';

let dbPromise: Promise<IDBDatabase>;

export function initStorage(): Promise<void> {
  dbPromise = new Promise((resolve, reject) => {
    const openRequest = window.indexedDB.open(dbName);

    openRequest.onerror = reject;
    openRequest.onsuccess = () => {
      resolve(openRequest.result);
    };
    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      db.onerror = reject;

      db.createObjectStore(feelingsOS, { keyPath: 'ts' });

      resolve(db);
    }
  });

  return dbPromise.then(() => {});
}

async function getObjectStore(name: string): Promise<IDBObjectStore> {
  const db = await dbPromise;
  return db.transaction(name, 'readwrite').objectStore(name);
}

interface Feeling {
  ts: Date;
  path: string[];
};

export async function recordFeeling(ts: Date, path: string[]): Promise<void> {
  const os = await getObjectStore(feelingsOS);
  os.add({ ts, path });
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
      } else {
        resolve(list);
      }
    };
  })
}
