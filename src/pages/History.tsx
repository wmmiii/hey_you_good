import Button from '../components/Button';
import Page from '../components/Page';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './History.module.scss';
import { Feeling, getFeelings } from '../storage/localDb';
import { gloriaIndex } from "../feelingsModel";
import { useNavigate } from 'react-router';

export default function History(): JSX.Element {
  const navigate = useNavigate();
  const [feelings, setFeelings] = useState<Feeling[] | null>(null);

  useEffect(() => {
    const now = new Date();
    const yearAgo = new Date(now);
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);

    getFeelings(now, yearAgo).then(setFeelings);
  });

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
        <Button
          flex="0 auto 0"
          onClick={() => navigate('/')}>
          Back
        </Button>
      }>
      {
        days == null ?
          <span>Loading...</span> :
          <ol>
            {
              days.map((d, i) => (
                <li key={i}>
                  <h3>{d.date.toLocaleDateString()}</h3>
                  <ul>
                    {
                      d.entries.map((e, i) => (
                        <div
                          key={i}
                          className={styles.feeling}
                          style={{
                            backgroundColor: gloriaIndex[e['path'][0]].color
                          }}>
                          {e["path"][e["path"].length - 1]}
                        </div>
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
  entries: Feeling[];
}
