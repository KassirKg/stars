import { type ButtonHTMLAttributes, type ReactNode } from 'react';

import clsx from 'clsx';
import { type LucideIcon } from 'lucide-react';

import styles from './FilterCell.module.scss';

interface FilterCellProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isActiveCell: boolean;
  icon?: LucideIcon;
}

function FilterCell({ children, isActiveCell, icon: Icon, ...props }: FilterCellProps) {
  return (
    <button
      type="button"
      data-active={isActiveCell}
      aria-pressed={isActiveCell}
      className={clsx(styles.cell, isActiveCell && styles.active)}
      {...props}
    >
      {Icon ? <Icon className={styles.icon} size={16} aria-hidden /> : null}
      <span>{children}</span>
    </button>
  );
}

export default FilterCell;
