import Button from '../components/Button';
import Page from '../components/Page';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './History.module.scss';
import { StoredFeeling, getFeelings } from '../storage/localDb';
import { useNavigate } from 'react-router';
import Feeling from '../components/Feeling';

export default function History(): JSX.Element {
  const navigate = useNavigate();
  const [feelings, setFeelings] = useState<StoredFeeling[] | null>(null);

  useEffect(() => {
    const now = new Date();
    const yearAgo = new Date(now);
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);

    getFeelings(yearAgo, now).then(setFeelings);
  }, []);

  const days = useMemo((): Day[] => {
    if (feelings == null) {
      return [];
    }

    return feelings
      .sort((a, b) => b.ts.getTime() - a.ts.getTime())
      .reduce((list, entry) => {
        const entryDay = new Date(entry.ts.getTime());
        entryDay.setHours(0);
        entryDay.setMinutes(0);
        entryDay.setSeconds(0);
        entryDay.setMilliseconds(0);

        if (list.length > 0) {
          const lastEntry = list[list.length - 1];
          if (lastEntry.date.getTime() === entryDay.getTime()) {
            lastEntry.entries.push(entry);
            return list;
          }
        }
        list.push({
          date: entryDay,
          entries: [entry],
        });
        return list;
      }, [] as Day[])
  }, [feelings]);


  return (
    <Page
      footer={
        <div className={styles.footer}>
          <Button onClick={() => navigate('/')}>
            Back
          </Button>
        </div>
      }>
      {
        days == null ?
          <span>Loading...</span> :
          <ol className={styles.container}>
            {
              days.map(d => (
                <li key={d.date.toDateString()}>
                  <h3>{d.date.toLocaleDateString()}</h3>
                  <ul className={styles.day}>
                    {
                      d.entries.map((f, i) => (
                        <li key={i}>
                        <Feeling>
                          {f}
                        </Feeling>
                        </li>
                      ))
                    }
                  </ul>
                </li>
              ))
            }
          </ol>
      }
    </Page>
  );
}

interface Day {
  date: Date;
  entries: StoredFeeling[];
}
