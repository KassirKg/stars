'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';

import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { createPortal } from 'react-dom';

import { useDebounce } from '@/shared/lib';

import styles from './SearchModal.module.scss';
import { type SearchModalProps } from './SearchModal.types';
import { SearchResults } from '../SearchResults/SearchResults';

export const SearchModal = ({ placeholder, onClose }: SearchModalProps) => {
  const t = useTranslations('common');
  const tSearch = useTranslations('search');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState('');
  const debounced = useDebounce(query.trim(), 350);

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const close = useCallback(() => {
    dialogRef.current?.close();
    onCloseRef.current();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    if (!dialog.open) dialog.showModal();
    inputRef.current?.focus();

    const onBrowserClose = () => onCloseRef.current();
    const onBackdropClick = (e: MouseEvent) => {
      if (e.target === dialog) close();
    };

    dialog.addEventListener('cancel', onBrowserClose);
    dialog.addEventListener('close', onBrowserClose);
    dialog.addEventListener('click', onBackdropClick);

    return () => {
      dialog.removeEventListener('cancel', onBrowserClose);
      dialog.removeEventListener('close', onBrowserClose);
      dialog.removeEventListener('click', onBackdropClick);
    };
  }, [close]);

  useEffect(() => {
    const { body } = document;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;

    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Escape') return;

    e.preventDefault();
    close();
  };

  const onClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const label = placeholder ?? t('searchPlaceholder');

  return createPortal(
    <dialog ref={dialogRef} className={styles.dialog} aria-label={label}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <div className={styles.field}>
            <Search className={styles.icon} size={18} aria-hidden />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={onChange}
              onKeyDown={onKeyDown}
              placeholder={label}
              aria-label={label}
              className={styles.input}
            />
            {query.length > 0 ? (
              <button
                type="button"
                className={styles.clear}
                onClick={onClear}
                aria-label={tSearch('clear')}
              >
                <X size={16} aria-hidden />
              </button>
            ) : null}
          </div>

          <button type="button" className={styles.cancel} onClick={close}>
            {t('cancel')}
          </button>
        </div>

        <div className={styles.body}>
          <SearchResults query={debounced} onNavigate={close} />
        </div>

        <div className={styles.footer}>
          <kbd className={styles.kbd}>esc</kbd>
          <span>{tSearch('escHint')}</span>
        </div>
      </div>
    </dialog>,
    document.body,
  );
};
