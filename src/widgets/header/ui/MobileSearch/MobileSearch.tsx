'use client';

import { useTranslations } from 'next-intl';

import { SearchTrigger } from '@/features/search';

import styles from './MobileSearch.module.scss';

export const MobileSearch = () => {
  const t = useTranslations('common');

  return (
    <div className={styles.root}>
      <SearchTrigger placeholder={t('searchPlaceholder')} />
    </div>
  );
};
