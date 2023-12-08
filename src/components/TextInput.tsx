import React from 'react';
import styles from './TextInput.module.scss';

interface TextInputProps {
  className?: string;
  value: string;
  onInput: (value: string) => void;
  placeholder?: string;
}

export default function TextInput(props: TextInputProps): JSX.Element {
  const classes = [styles.input];
  if (props.className) {
    classes.push(props.className);
  }

  return (
    <input
      className={classes.join(' ')}
      type="text"
      value={props.value}
      onInput={e => props.onInput((e.target as HTMLInputElement).value)}
      placeholder={props.placeholder} />
  );
}