import Button from '../components/Button';
import IconBxCheck from '../icons/IconBxCheck';
import Page from '../components/Page';
import React, { useCallback, useMemo, useState } from 'react';
import TextInput from '../components/TextInput';
import styles from './Checkin.module.scss';
import { gloriaList } from '../feelingsModel';
import { recordFeeling } from '../storage/localDb';
import { useNavigate } from 'react-router';

export default function CheckIn(): JSX.Element {
  const history = useNavigate();
  const [feeling, setFeeling] = useState<string[]>([]);
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
    <Page
      header={<h1>How are you feeling?</h1>}
      footer={
        <div className={styles.footer}>
          <Button onClick={() => history('/')} flex="1">
            Back to home
          </Button>
          <Button
            onClick={async () => {
              await recordFeeling(new Date(), feeling);
              history('/');
            }}
            disabled={feeling.length < 1}
            flex="1">
            Save
          </Button>
        </div>
      }>

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

    </Page>
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
