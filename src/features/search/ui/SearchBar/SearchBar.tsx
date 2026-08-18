'use client';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';

import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ProductCard } from '@/entities/product';
import { StarHumanCard } from '@/entities/starHuman';
import { useClickOutside, useDebounce } from '@/shared/lib';
import { usePathname } from '@/shared/lib/i18n/navigation';
import { Loader } from '@/shared/ui';

import styles from './SearchBar.module.scss';
import { type SearchBarProps } from './SearchBar.types';
import { useSearch } from '../../api/client';

export const SearchBar = ({ placeholder }: SearchBarProps) => {
  const t = useTranslations('common');
  const tSearch = useTranslations('search');
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const debounced = useDebounce(query.trim(), 350);

  const { data, isFetching, isError } = useSearch(debounced);

  useEffect(() => {
    setIsOpen(false);
    setQuery('');
  }, [pathname]);

  useClickOutside(containerRef, () => setIsOpen(false));

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const onClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  const artists = data?.artists ?? [];
  const products = data?.products ?? [];
  const hasResults = artists.length > 0 || products.length > 0;

  return (
    <div ref={containerRef} className={styles.root}>
      <div className={styles.field}>
        <Search className={styles.icon} aria-hidden size={18} />
        <input
          type="search"
          value={query}
          onChange={onChange}
          onFocus={() => debounced.length > 0 && setIsOpen(true)}
          placeholder={placeholder ?? t('searchPlaceholder')}
          className={styles.input}
          aria-label={t('searchPlaceholder')}
        />
        {query.length > 0 ? (
          <button type="button" className={styles.clear} onClick={onClear} aria-label={t('cancel')}>
            <X size={16} aria-hidden />
          </button>
        ) : null}
      </div>

      {isOpen && debounced.length > 0 ? (
        <div className={styles.dropdown} role="listbox">
          {isFetching && !hasResults ? (
            <div className={styles.state}>
              <Loader size="sm" ariaLabel={t('loading')} />
            </div>
          ) : isError ? (
            <div className={styles.state}>{t('error')}</div>
          ) : hasResults ? (
            <>
              {artists.length > 0 ? (
                <>
                  <h3 className={styles.groupTitle}>{tSearch('stars')}</h3>
                  <div className={styles.results}>
                    {artists.map((artist) => (
                      <StarHumanCard
                        key={artist.id}
                        slug={artist.slug}
                        name={artist.name}
                        description={artist.description}
                        image={artist.image}
                        categoryName={artist.category_name}
                        onClick={() => setIsOpen(false)}
                      />
                    ))}
                  </div>
                </>
              ) : null}

              {products.length > 0 ? (
                <>
                  <h3 className={styles.groupTitle}>{tSearch('products')}</h3>
                  <div className={styles.results}>
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        slug={product.slug}
                        title={product.title}
                        image={product.image}
                        price={product.price}
                        currency={product.currency}
                        new={product.is_new}
                        author={product.author}
                        onClick={() => setIsOpen(false)}
                      />
                    ))}
                  </div>
                </>
              ) : null}
            </>
          ) : (
            <div className={styles.state}>{tSearch('empty')}</div>
          )}
        </div>
      ) : null}
    </div>
  );
};
