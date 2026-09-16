'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib';

import styles from './SearchTrigger.module.scss';
import { type SearchTriggerProps } from './SearchTrigger.types';
import { SearchModal } from '../SearchModal/SearchModal';

export const SearchTrigger = ({ placeholder, shortcut = false, className }: SearchTriggerProps) => {
  const t = useTranslations('common');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  const label = placeholder ?? t('searchPlaceholder');

  useEffect(() => {
    if (!shortcut) return undefined;

    setIsMac(/mac|iphone|ipad|ipod/i.test(navigator.userAgent));

    const onKeyDown = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.altKey) return;
      if (e.code !== 'KeyK' && e.key.toLowerCase() !== 'k') return;

      e.preventDefault();
      setIsOpen(true);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [shortcut]);

  const onClose = useCallback(() => {
    setIsOpen(false);
    buttonRef.current?.focus();
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={cn(styles.root, className)}
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <Search className={styles.icon} size={18} aria-hidden />
        <span className={styles.label}>{label}</span>
        {shortcut ? (
          <kbd className={styles.hint} aria-hidden>
            {isMac ? '⌘' : 'Ctrl'} K
          </kbd>
        ) : null}
      </button>

      {isOpen ? <SearchModal placeholder={placeholder} onClose={onClose} /> : null}
    </>
  );
};
