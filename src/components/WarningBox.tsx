import Button from './Button';
import IconBxError from '../icons/IconBxError';
import IconBxX from '../icons/IconBxX';
import React from 'react';
import styles from './WarningBox.module.scss';

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
        fontSize={36} />

      <div className={styles.contents}>
        {props.children}
      </div>

      <Button
        onClick={props.onCloseClicked}
        icon={<IconBxX fontSize="24" />} />
    </div>
  );
}