import IconBxCheck from '../icons/IconBxCheck';
import React, { useEffect, useState } from 'react';
import TagComponent from '../components/Tag';
import styles from './Feeling.module.scss';
import { MinimalFeeling, StoredFeeling, Tag, getTags } from '../storage/localDb';
import { getFeelingColor } from '../feelingsModel';
import { useMemo } from 'react';

interface FeelingProps {
  selected?: boolean;
  onSelect?: () => void;
  className?: string;
  children: MinimalFeeling | StoredFeeling;
}

export default function Feeling({
  selected,
  onSelect,
  className,
  children: feeling,
}: FeelingProps): JSX.Element {
  const [tags, setTags] = useState<Tag[]|null>(null);

  useEffect(() => {
    if (feeling['tags']) {
      getTags(feeling['tags']).then((t) => {
        console.log(t);
        setTags(t);
      });
    }
  }, [feeling]);

  const classes = [styles.feeling];
  if (onSelect != null) {
    classes.push(styles.selectable);
  }
  if (selected) {
    classes.push(styles.selected);
  }
  if (className) {
    classes.push(className);
  }

  const name = useMemo(
    () => feeling["path"][feeling["path"].length - 1],
    [feeling]);

  const color = useMemo(
    () => getFeelingColor(feeling),
    [feeling]);

  return (
    <div
      className={classes.join(' ')}
      style={{ backgroundColor: color }}
      onClick={onSelect}
      onKeyDown={onSelect}>
      {
        onSelect &&
        <div className={styles.iconContainer}>
          {selected && <IconBxCheck />}
        </div>
      }
      <span className={styles.name}>
        {name}
      </span>
      {
        tags &&
        <ul className={styles.tags}>
          {
            tags.map((t, i) => (
              <li key={i}>
                <TagComponent>{t}</TagComponent>
              </li>
            ))
          }
        </ul>
      }
    </div>
  );
}
