import { atom } from 'jotai';

/** Псевдо-категория «Все» — в API её нет, просто не фильтруем. */
export const ALL_CATEGORIES = 'all';

/** Выбранная категория: ALL_CATEGORIES либо slug из api/artist-categories. */
export const selectedArtistCategoryAtom = atom<string>(ALL_CATEGORIES);
