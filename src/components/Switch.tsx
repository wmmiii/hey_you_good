import React from 'react';
import styles from './Switch.module.scss';

interface SwitchProps {
  value: boolean;
  disabled?: boolean;
  before?: React.ReactNode;
  onClick: (_: boolean) => void;
  children?: React.ReactNode;
}

export default function Switch(props: SwitchProps): JSX.Element {
  const switchClasses = [styles.switch];
  if (props.value) {
    switchClasses.push(styles.on);
  }
  if (props.disabled) {
    switchClasses.push(styles.disabled);
  }

  return (
    <div className={styles.container}
      onClick={() => props.onClick(!props.value)}
      onKeyDown={() => props.onClick(!props.value)}>
      {props.before}

      <span className={switchClasses.join(' ')}>
        <div className={styles.background} />
        <div className={styles.slide} />
      </span>

      {props.children}
    </div>
  );
}