import React from 'react';
import styles from './Page.module.scss';

interface PageProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export default function Page(props: PageProps): JSX.Element {
  return (
    <div className={styles.container}>
      {
        props.header &&
        <div className={styles.header}>
          {props.header}
        </div>
      }
      {props.children}
      {
        props.footer &&
        <div className={styles.footer}>
          {props.footer}
        </div>
      }
    </div>
  );
}