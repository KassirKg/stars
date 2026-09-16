'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { ALL_CATEGORIES_ICON, categoryIcon, useArtistCategories } from '@/entities/artistCategory';
import { usePathname, useRouter } from '@/shared/lib/i18n';
import { ALL_CATEGORIES, CATEGORY_PARAM } from '@/shared/model';

import styles from './FilterArtistsList.module.scss';
import FilterCell from '../filterCell/FilterCell';

interface FilterArtistsListProps {
  selected: string;
}

interface PillRect {
  left: number;
  width: number;
}

function FilterArtistsList({ selected }: FilterArtistsListProps) {
  const localizer = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const { data: categories } = useArtistCategories();

  const trackRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<PillRect | null>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  const [active, setActive] = useState(selected);

  useEffect(() => setActive(selected), [selected]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const measure = () => {
      const active = track.querySelector<HTMLElement>('[data-active="true"]');
      setPill(active ? { left: active.offsetLeft, width: active.offsetWidth } : null);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    track.querySelectorAll('button').forEach((button) => observer.observe(button));

    return () => observer.disconnect();
  }, [active, categories]);

  useEffect(() => {
    if (!pill || isAnimated) return undefined;

    const frame = requestAnimationFrame(() => setIsAnimated(true));
    return () => cancelAnimationFrame(frame);
  }, [pill, isAnimated]);

  if (!categories?.length) return null;

  const select = (slug: string) => {
    setActive(slug);

    const href = slug === ALL_CATEGORIES ? pathname : `${pathname}?${CATEGORY_PARAM}=${slug}`;
    router.replace(href, { scroll: false });
  };

  return (
    <div className={styles.filterList}>
      <div ref={trackRef} className={styles.track}>
        {pill ? (
          <span
            aria-hidden
            className={clsx(styles.pill, isAnimated && styles.pillAnimated)}
            style={{ width: pill.width, transform: `translateX(${pill.left}px)` }}
          />
        ) : null}

        <FilterCell
          icon={ALL_CATEGORIES_ICON}
          onClick={() => select(ALL_CATEGORIES)}
          isActiveCell={active === ALL_CATEGORIES}
        >
          {localizer('filterLinks.all')}
        </FilterCell>

        {categories.map((category) => (
          <FilterCell
            key={category.id}
            icon={categoryIcon(category.slug, category.name)}
            onClick={() => select(category.slug)}
            isActiveCell={active === category.slug}
          >
            {category.name}
          </FilterCell>
        ))}
      </div>
    </div>
  );
}

export default FilterArtistsList;
