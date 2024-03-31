import IconBxCheck from '../icons/IconBxCheck';
import React, { useCallback, useMemo, useState } from 'react';
import TextInput from './TextInput';
import styles from './Checkin.module.scss';
import { gloriaList } from '../feelingsModel';

interface CheckInProps {
  feeling: string[];
  setFeeling: (feeling: string[]) => void;
}

export default function CheckIn({
  feeling,
  setFeeling
}: CheckInProps): JSX.Element {
  const [searchString, setSearchString] = useState('');

  const filteredFeelings = useMemo(
    () => gloriaList.filter(
      f => isFeelingVisible(f.path, feeling, searchString)),
    [feeling, searchString]);

  const onFeelingSelected = useCallback((feelingPath: string[]) => {
    if (isFeelingSelected(feelingPath, feeling)) {
      const newPath = [...feelingPath];
      newPath.pop();
      setFeeling(newPath);
    } else {
      setFeeling([...feelingPath]);
    }
    setSearchString('');
  }, [feeling, setFeeling, setSearchString]);

  return (
    <div className={styles.wrapper}>
      <TextInput
        className={styles.searchInput}
        value={searchString}
        onInput={setSearchString}
        placeholder="Search for a feeling..." />

      {
        filteredFeelings.map(f => {
          const classes = [styles.feeling];
          if (isFeelingSelected(f.path, feeling)) {
            classes.push(styles.selected);
          }

          return (
            <div
              key={f.name}
              className={classes.join(' ')}
              style={{ backgroundColor: f.color }}
              onClick={() => onFeelingSelected(f.path)}
              onKeyDown={() => onFeelingSelected(f.path)}>
              <div className={styles.iconContainer}>
                {isFeelingSelected(f.path, feeling) && <IconBxCheck />}
              </div>
              {f.name}
            </div>
          );
        })
      }
    </div>
  );
}

function isFeelingVisible(
  feelingPath: string[],
  existingPath: string[],
  searchString: string
): boolean {
  if (searchString) {
    const lowerSearch = searchString.toLocaleLowerCase();
    const lowerFeeling =
      feelingPath[feelingPath.length - 1].toLocaleLowerCase();
    return lowerFeeling.indexOf(lowerSearch) >= 0;
  }

  if (feelingPath.length - 1 > existingPath.length) {
    return false;
  } else if (feelingPath.length > existingPath.length) {
    return existingPath.every((f, i) => f === feelingPath[i]);
  } else {
    return feelingPath.every((f, i) => f === existingPath[i]);
  }
}

function isFeelingSelected(
  feelingPath: string[],
  existingPath: string[]
): boolean {
  return feelingPath.every((f, i) => f === existingPath[i]);
}
