'use client';

import { useAtomValue } from 'jotai';

import { StarHumanCard, useArtists } from '@/entities/starHuman';
import { selectedArtistCategoryAtom } from '@/shared/model';

import styles from './StarsList.module.scss';

interface ContentSectionProps {
  title?: string;
  /** Жёстко заданная категория. Без неё берём выбранную в фильтре. */
  category?: string;
}

const StarsList = ({ title, category }: ContentSectionProps) => {
  const selectedCategory = useAtomValue(selectedArtistCategoryAtom);
  // Фильтрует бэкенд: «Все» -> api/all-artists, категория -> api/artist-categories/{slug}
  const { data } = useArtists(category ?? selectedCategory);

  const artists = data?.items ?? [];

  if (!artists.length) return null;

  return (
    <section className={styles.root}>
      {title && (
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </header>
      )}

      <div className={styles.grid}>
        {artists.map((item) => (
          <StarHumanCard
            key={item.id}
            slug={item.slug}
            name={item.name}
            description={item.description}
            image={item.image}
            categoryName={item.category_name}
          />
        ))}
      </div>
    </section>
  );
};

export default StarsList;
