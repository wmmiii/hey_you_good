import { getUserSettings } from "./userSettings";

const dbName = 'heyYouGoodData';
const feelingsOS = 'feelings';
const logEntriesOS = 'logEntries';
const tagOS = 'tags';

let dbPromise: Promise<IDBDatabase>;

export function initStorage(): Promise<void> {
  dbPromise = new Promise((resolve, reject) => {
    const openRequest = window.indexedDB.open(dbName, 3);

    openRequest.onerror = reject;
    openRequest.onsuccess = () => {
      resolve(openRequest.result);
    };
    openRequest.onupgradeneeded = async () => {
      const db = openRequest.result;
      db.onerror = reject;

      if (!db.objectStoreNames.contains(feelingsOS)) {
        db.createObjectStore(feelingsOS, { keyPath: 'ts' });
      } else {
        const os = db.transaction(feelingsOS, 'readwrite').objectStore(feelingsOS);
        await new Promise<void>((resolve, reject) => {
          const request = os.clear();
          request.onsuccess = () => resolve();
          request.onerror = reject;
        });
      }
      if (db.objectStoreNames.contains(logEntriesOS)) {
        db.deleteObjectStore(logEntriesOS);
      }
      if (!db.objectStoreNames.contains(tagOS)) {
        const os = db.createObjectStore(tagOS, { keyPath: 'id' });
        const addTag = (tag: Tag) => {
          return new Promise<void>((resolve, reject) => {
            const request = os.put(tag);
            request.onsuccess = () => resolve();
            request.onerror = reject;
          });
        }
        await addTag({
          id: 0,
          title: 'Caffeine',
          icon: 'coffee',
          color: 'yellow',
        });
        await addTag({
          id: 1,
          title: 'Alcohol',
          icon: 'drink',
          color: 'blue',
        });
        await addTag({
          id: 2,
          title: 'Hungover',
          icon: 'dizzy',
          color: 'green',
        });
        await addTag({
          id: 3,
          title: 'Period',
          icon: 'female',
          color: 'red',
        });
        await addTag({
          id: 4,
          title: 'Exercise',
          icon: 'run',
          color: 'orange',
        });
        await addTag({
          id: 5,
          title: 'Sick',
          icon: 'firstaid',
          color: 'red',
        });
      }
    };
  });

  return dbPromise.then(() => { });
}

async function getObjectStore(name: string): Promise<IDBObjectStore> {
  const db = await dbPromise;
  return db.transaction(name, 'readwrite').objectStore(name);
}

export interface StoredFeeling extends MinimalFeeling {
  ts: Date;
  // A list of tag IDs associated with this feeling.
  tags?: number[];
};

export type MinimalFeeling = {
  model: 'gloria';
  path: string[];
}

export async function recordFeeling(ts: Date, feeling: MinimalFeeling): Promise<void> {
  const os = await getObjectStore(feelingsOS);
  os.add({ ts, ...feeling } as StoredFeeling);
}

export async function getFeelings(from: Date, to: Date): Promise<StoredFeeling[]> {
  const os = await getObjectStore(feelingsOS);
  return new Promise((resolve, reject) => {
    const cursorRequest = os.openCursor(IDBKeyRange.bound(from, to));
    cursorRequest.onerror = reject;

    const list: StoredFeeling[] = [];
    cursorRequest.onsuccess = (event) => {
      const cursor = (event.target as any).result as IDBCursorWithValue;
      if (cursor) {
        list.push(cursor.value);
        cursor.continue();
      } else {
        resolve(list);
      }
    };
  });
}

type TagColor = 'red' |
  'pink' |
  'orange' |
  'yellow' |
  'green' |
  'teal' |
  'blue' |
  'violet';

export interface Tag {
  id: number;
  title: string;
  icon: string;
  color: TagColor;
}

export async function getTags(ids?: number[]): Promise<Tag[]> {
  const os = await getObjectStore(tagOS);

  if (ids != null) {
    const list: Tag[] = [];
    for (const id of ids) {
      list.push(await new Promise((resolve, reject) => {
        const cursorRequest = os.openCursor(id);
        cursorRequest.onerror = reject;
        cursorRequest.onsuccess = (event) => {
          const cursor = (event.target as any).result as IDBCursorWithValue;
          if (cursor) {
            resolve(cursor.value);
          }
        };
      }));
    }
    return list;
  } else {
    return new Promise((resolve, reject) => {
      const cursorRequest = os.openCursor();
      cursorRequest.onerror = reject;

      const list: Tag[] = [];
      cursorRequest.onsuccess = (event) => {
        const cursor = (event.target as any).result as IDBCursorWithValue;
        if (cursor) {
          list.push(cursor.value);
          cursor.continue();
        } else {
          resolve(list);
        }
      };
    });
  }
}

export async function saveTag(tag: Tag): Promise<void> {
  const os = await getObjectStore(tagOS);
  const request = os.put(tag);
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = reject;
  });
}
