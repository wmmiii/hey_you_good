import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  className?: string;
  onClick: () => void;
  icon?: JSX.Element;
  background?: string;
  disabled?: boolean;
  tabIndex?: number;
  flex?: string;
  children?: React.ReactNode;
}

export default function Button(props: ButtonProps): JSX.Element {
  const classes = [styles.button];
  if (props.children == null && props.icon != null) {
    classes.push(styles.iconOnly);
  }
  if (props.className) {
    classes.push(props.className);
  }

  return (
    <button
      className={classes.join(' ')}
      disabled={props.disabled}
      style={{
        backgroundColor: props.background || 'var(--button-bg)',
        flex: props.flex || '0',
      }}
      tabIndex={props.tabIndex || 0}
      onClick={props.onClick}>
      {
        props.icon != null &&
        <div className={styles.icon}>
          {props.icon}
        </div>
      }
      {props.children}
    </button>
  );
}