import Feeling from './Feeling';
import React, { useCallback, useMemo, useState } from 'react';
import TextInput from './TextInput';
import styles from './Checkin.module.scss';
import { MinimalFeeling } from '../storage/localDb';
import { gloriaList } from '../feelingsModel';

interface CheckInProps {
  feeling: MinimalFeeling | null;
  setFeeling: (feeling: MinimalFeeling) => void;
}

export default function CheckIn({
  feeling,
  setFeeling
}: CheckInProps): JSX.Element {
  const [searchString, setSearchString] = useState('');

  const filteredFeelings = useMemo(
    () => gloriaList.filter(
      f => isFeelingVisible(f.path, feeling?.path || [], searchString)),
    [feeling, searchString]);

  const onFeelingSelected = useCallback((feelingPath: string[]) => {
    if (isFeelingSelected(feelingPath, feeling)) {
      const newPath = [...feelingPath];
      newPath.pop();
      setFeeling({
        model: 'gloria',
        path: newPath,
      });
    } else {
      setFeeling({
        model: 'gloria',
        path: feelingPath,
      });
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
        filteredFeelings.map((f, i) => (
          <Feeling
            key={i}
            className={styles.feeling}
            selected={isFeelingSelected(f.path, feeling)}
            onSelect={() => onFeelingSelected(f.path)}>
            {f}
          </Feeling>
        ))
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
  selected: MinimalFeeling | null,
): boolean {
  return feelingPath.every((f, i) => f === (selected?.path || [])[i]);
}
