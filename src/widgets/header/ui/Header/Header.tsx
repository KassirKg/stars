'use client';

import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { SearchBar } from '@/features/search';
import { brand } from '@/shared/config';
import { Link, usePathname } from '@/shared/lib/i18n/navigation';

import styles from './Header.module.scss';
import { Burger } from '../burger';
import { LocaleSwitcher } from '../LocaleSwitcher/LocaleSwitcher';

export const Header = () => {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label={brand.appName}>
          <Image
            src={'/images/logos/kg/headerLogo.svg'}
            alt="logo"
            width={120}
            height={40}
            className={styles.logo}
          />
        </Link>

        <div className={styles.searchSlot}>
          <SearchBar placeholder={t('common.searchPlaceholder')} />
        </div>

        <div className={styles.links}>
          <Link className={pathname === '/allStars' ? styles.activeLink : ''} href={'/allStars'}>
            {t('appHeader.stars')}
          </Link>
          <Link className={pathname === '/catalog' ? styles.activeLink : ''} href={'/catalog'}>
            {t('appHeader.catalog')}
          </Link>
        </div>

        <Burger />

        <div className={styles.actions}>
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
};
