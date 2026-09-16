'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { brand } from '@/shared/config';
import { Link, usePathname } from '@/shared/lib/i18n/navigation';
import { ThemeToggle } from '@/shared/ui';
import { LocaleSwitcher } from '@/widgets/header/ui/LocaleSwitcher/LocaleSwitcher';

import styles from './Burger.module.scss';

export default function Burger() {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        className={clsx(styles.burger, open && styles.open)}
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-label="menu"
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={clsx(styles.menu, open && styles.menuOpen)}>
        <div className={styles.menu_content}>
          <Link
            href="/"
            className={styles.brand}
            aria-label={brand.appName}
            onClick={() => setOpen(false)}
          >
            <Image src="/images/logos/kg/headerLogo.svg" alt="" width={120} height={40} />
          </Link>

          <nav className={styles.links}>
            <Link className={pathname === '/' ? styles.activeLink : ''} href={'/'}>
              {t('appHeader.main')}
            </Link>
            <Link className={pathname === '/allStars' ? styles.activeLink : ''} href={'/allStars'}>
              {t('appHeader.stars')}
            </Link>
            <Link className={pathname === '/catalog' ? styles.activeLink : ''} href={'/catalog'}>
              {t('appHeader.catalog')}
            </Link>
          </nav>

          <div className={styles.settings}>
            <div className={styles.settingsRow}>
              <span className={styles.settingsLabel}>{t('common.language')}</span>
              <LocaleSwitcher />
            </div>
            <div className={styles.settingsRow}>
              <span className={styles.settingsLabel}>{t('common.switchTheme')}</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {open && <button className={styles.overlay} onClick={() => setOpen(false)} />}
    </>
  );
}
