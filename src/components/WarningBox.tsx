import React from 'react';
import styles from './WarningBox.module.scss';
import Button from './Button';
import IconBxError from '../icons/IconBxError';
import IconBxX from '../icons/IconBxX';

interface WarningBoxProps {
  onCloseClicked: () => void;
  children: React.ReactNode;
}

export default function WarningBox(props: WarningBoxProps): JSX.Element {
  return (
    <div className={styles.warningBox}>
      <IconBxError
        className={styles.warningBoxIcon}
        color="var(--col-warning)"
        viewBox="0 0 24 24"
        fontSize={36} />

      <div className={styles.contents}>
        {props.children}
      </div>

      <Button
        onClick={props.onCloseClicked}
        icon={<IconBxX
          color="currentColor"
          viewBox="0 0 24 24"
          fontSize="24"
        />} />
    </div>
  );
}