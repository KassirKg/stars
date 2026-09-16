'use client';

import { StarHumanCard, useArtists } from '@/entities/starHuman';

import styles from './StarsList.module.scss';

interface ContentSectionProps {
  title?: string;
  category: string;
}

const StarsList = ({ title, category }: ContentSectionProps) => {
  const { data } = useArtists(category);

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
