'use client';

import { memo } from 'react';

import { useTranslations } from 'next-intl';

import { ProductCard } from '@/entities/product';
import { StarHumanCard } from '@/entities/starHuman';
import { Loader } from '@/shared/ui';

import styles from './SearchResults.module.scss';
import { type SearchResultsProps } from './SearchResults.types';
import { useSearch } from '../../api/client';

const SearchResultsView = ({ query, onNavigate }: SearchResultsProps) => {
  const t = useTranslations('common');
  const tSearch = useTranslations('search');

  const { data, isFetching, isError } = useSearch(query);

  const artists = data?.artists ?? [];
  const products = data?.products ?? [];
  const hasResults = artists.length > 0 || products.length > 0;

  if (query.length === 0) {
    return <p className={styles.state}>{tSearch('hint')}</p>;
  }

  if (isFetching && !hasResults) {
    return (
      <div className={styles.state}>
        <Loader size="sm" ariaLabel={t('loading')} />
      </div>
    );
  }

  if (isError) {
    return <p className={styles.state}>{t('error')}</p>;
  }

  if (!hasResults) {
    return <p className={styles.state}>{tSearch('empty')}</p>;
  }

  return (
    <>
      {artists.length > 0 ? (
        <section className={styles.group}>
          <h3 className={styles.groupTitle}>{tSearch('stars')}</h3>
          <div className={styles.grid}>
            {artists.map((artist) => (
              <StarHumanCard
                key={artist.id}
                slug={artist.slug}
                name={artist.name}
                description={artist.description}
                image={artist.image}
                categoryName={artist.category_name}
                onClick={onNavigate}
              />
            ))}
          </div>
        </section>
      ) : null}

      {products.length > 0 ? (
        <section className={styles.group}>
          <h3 className={styles.groupTitle}>{tSearch('products')}</h3>
          <div className={styles.grid}>
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
                onClick={onNavigate}
              />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
};

export const SearchResults = memo(SearchResultsView);
