import React from 'react';
import styles from './Page.module.scss';

interface PageProps {
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export default function Page(props: PageProps): JSX.Element {
  const contentClasses = [styles.content];
  if (props.className) {
    contentClasses.push(props.className);
  }

  return (
    <div className={styles.container}>
      {
        props.header &&
        <div className={styles.header}>
          {props.header}
        </div>
      }
      <div className={contentClasses.join(' ')}>
        {props.children}
      </div>
      {
        props.footer &&
        <div className={styles.footer}>
          {props.footer}
        </div>
      }
    </div>
  );
}