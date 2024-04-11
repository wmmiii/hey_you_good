import Feeling from './Feeling';
import IconBxCheck from '../icons/IconBxCheck';
import React, { useState } from 'react';
import TagComponent from './Tag';
import styles from './TagFeeling.module.scss'
import { StoredFeeling, Tag, getTags } from '../storage/localDb';
import { useEffect } from 'react';

interface TagFeelingProps {
  feeling: StoredFeeling;
  setFeeling: (feeling: StoredFeeling) => void;
}

export default function TagFeeling({
  feeling,
  setFeeling
}: TagFeelingProps): JSX.Element {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    getTags().then(setTags);
  }, []);

  return (
    <>
      <h3>Add tag to</h3>
      <Feeling>{feeling}</Feeling>
      <ul className={styles.list}>
        {
          tags.map((t, i) => {
            const index = (feeling.tags || []).indexOf(t.id);
            return (
              <li key={i}>
                <div className={styles.iconContainer}>
                  {
                    index > -1 &&
                    <IconBxCheck />
                  }
                </div>
                <TagComponent
                  onClick={() => {
                    if (index > -1) {
                      feeling.tags!.splice(index, 1);
                    } else {
                      feeling.tags = feeling.tags || [];
                      feeling.tags.push(t.id);
                    }
                    setFeeling({ ...feeling });
                  }}>
                  {t}
                </TagComponent>
              </li>
            );
          })
        }
      </ul>
    </>
  );
}
