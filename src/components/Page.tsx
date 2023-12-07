import React from 'react';
import styles from './Page.module.scss';

interface PageProps {
  children: React.ReactNode;
}

export default function Page(props: PageProps): JSX.Element {
  console.log(styles);

  return (
    <div className={styles.container}>
      {props.children}
    </div>
  );
}