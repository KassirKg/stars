'use client';

import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';

import { useArtistCategories } from '@/entities/artistCategory';
import { ALL_CATEGORIES, selectedArtistCategoryAtom } from '@/shared/model';

import styles from './FilterArtistsList.module.scss';
import FilterCell from '../filterCell/FilterCell';

function FilterArtistsList() {
  const [selectedCategory, setSelectedCategory] = useAtom(selectedArtistCategoryAtom);
  const localizer = useTranslations();
  const { data: categories } = useArtistCategories();

  // Категорий нет — фильтровать нечем, строка кнопок не нужна.
  if (!categories?.length) return null;

  return (
    <div className={styles.filterList}>
      <FilterCell
        onClick={() => setSelectedCategory(ALL_CATEGORIES)}
        isActiveCell={selectedCategory === ALL_CATEGORIES}
      >
        {localizer('filterLinks.all')}
      </FilterCell>

      {categories.map((category) => (
        <FilterCell
          key={category.id}
          onClick={() => setSelectedCategory(category.slug)}
          isActiveCell={selectedCategory === category.slug}
        >
          {category.name}
        </FilterCell>
      ))}
    </div>
  );
}

export default FilterArtistsList;
