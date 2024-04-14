import Button from '../components/Button';
import TagComponent from '../components/Tag';
import Page from '../components/Page';
import React, { useEffect, useState } from 'react';
import styles from './History.module.scss';
import { Tag, getTags } from '../storage/localDb';
import { useNavigate } from 'react-router';

export default function Tags(): JSX.Element {
  const navigate = useNavigate();
  const [tags, setTags] = useState<Tag[] | null>(null);

  useEffect(() => {
    const now = new Date();
    const yearAgo = new Date(now);
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);

    getTags().then(setTags);
  });

  return (
    <Page
      className={styles.container}
      footer={
        <div className={styles.footer}>
          <Button onClick={() => navigate('/')}>
            Back
          </Button>
        </div>
      }>
      {
        tags == null ?
          <span>Loading...</span> :
          <ol>
            {
              tags.map(d => <TagComponent key={d.id}>{d}</TagComponent>)
            }
          </ol>
      }
    </Page>
  );
}
