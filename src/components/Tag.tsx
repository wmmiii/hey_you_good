import React, { useMemo } from 'react';
import styles from './Tag.module.scss';
import tagIcons from './TagIcons';
import { Tag } from '../storage/localDb';

interface TagProps {
  onClick?: () => void;
  className?: string;
  children: Tag;
}

export default function Tag({
  onClick,
  className,
  children: tag,
}: TagProps): JSX.Element {
  const classes = [styles.tag];
  if (onClick != null) {
    classes.push(styles.clickable);
  }
  if (className) {
    classes.push(className);
  }

  const Icon = tagIcons[tag.icon];

  return (
    <div
      className={classes.join(' ')}
      style={{ backgroundColor: `var(--tag-color-${tag.color})` }}
      onClick={onClick}>
      <Icon />
      {tag.title}
    </div>
  );
}
