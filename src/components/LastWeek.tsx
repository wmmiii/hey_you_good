import IconBxCheckCircle from '../icons/IconBxCheckCircle';
import React, { useEffect, useState } from 'react';
import styles from './LastWeek.module.scss';
import { getFeelings } from '../storage/localDb';

interface DayProgress {
  date: Date;
  checkIn: boolean;
}

export default function LastWeek(): JSX.Element {
  const [days, setDays] = useState(getLastWeek());

  useEffect(() => {
    (async () => {
      for (const day of days) {
        const tomorrow = new Date(day.date);
        tomorrow.setDate(day.date.getDate() + 1);
        day.checkIn = (await getFeelings(day.date, tomorrow)).length > 0;
      }
      setDays([...days])
    })();
  }, []);

  return (
    <div>
      <h2>Over the last week...</h2>
      <div className={styles.week}>
        {
          days.map(d => (
            <div key={'head-' + d.date.toDateString()}>
              {d.date.toLocaleDateString('default', { weekday: "short" })}
            </div>
          ))
        }
        {
          days.map(d => (
            <div key={'body-' + d.date.toDateString()}>
              {
                d.checkIn &&
                <IconBxCheckCircle
                  fontSize={24}
                  color="var(--col-success)" />
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}

function getLastWeek(): DayProgress[] {

  const days: DayProgress[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let currDay = new Date(today);
  currDay.setDate(currDay.getDate() + 1);

  for (let i = 0; i < 7; ++i) {
    const prevDay = new Date(currDay);
    prevDay.setDate(prevDay.getDate() - 1);
    days.unshift({
      date: prevDay,
      checkIn: false,
    });
    currDay = prevDay;
  }

  return days;
}