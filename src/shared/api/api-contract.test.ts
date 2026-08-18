import { describe, expect, it } from 'vitest';

import { artistCategoriesSchema } from '@/entities/artistCategory/api/schemas';
import { productDetailSchema, productListSchema } from '@/entities/product/api/schemas';
import { artistDetailSchema, artistListSchema } from '@/entities/starHuman/api/schemas';

// реальные ответы боевого API
const CATEGORIES = {
  payload: [
    {
      id: 'a0cb2d87-24aa-413e-acb5-aeaed4b857ce',
      slug: 'ewqew',
      name: 'выф',
      name_single: 'выф',
      count: 1,
    },
  ],
};

const ARTISTS = {
  payload: {
    items: [
      {
        id: 'a23bc7cc-4411-443e-bf8a-3234fc464f4f',
        slug: 'уйцуйц',
        name: 'уйцуйцуу',
        description: 'уцйуйц',
        image: '/uploads/1786959773312-530810331.png',
        category_name: 'выф',
      },
    ],
    meta: { total: 1, page: 1, per_page: 20, last_page: 1 },
  },
};

const PRODUCTS = {
  payload: {
    items: [
      {
        id: '3f134864-c9ec-468a-86e3-a9bf016cf321',
        slug: 'eqweqw',
        title: 'eqweqwewqe',
        price: 33,
        currency: 'KGS',
        image: '/uploads/1786959855741-930151538.png',
        is_new: true,
        author: 'уйцуйцуу',
      },
    ],
    meta: { total: 1, page: 1, per_page: 20, last_page: 1 },
  },
};

/** GET api/artist/уйцуйц */
const ARTIST_DETAIL = {
  id: 'a23bc7cc-4411-443e-bf8a-3234fc464f4f',
  slug: 'уйцуйц',
  name: 'уйцуйцуу',
  image: '/uploads/1786959773312-530810331.png',
  category: 'ewqew',
  category_name: 'выф',
  products_count: 1,
  subscribers_count: 0,
  description: 'уцйуйц',
  seo: { title: 'уйцуйцуу', description: 'уцйуйц' },
};

/** GET api/product/eqweqw — обратите внимание: поля colors нет вообще */
const PRODUCT_DETAIL = {
  id: '3f134864-c9ec-468a-86e3-a9bf016cf321',
  title: 'eqweqwewqe',
  price: 33,
  currency: 'KGS',
  description: 'eqweqw',
  images: ['/uploads/1786959855741-930151538.png'],
  sizes: [],
  stock: 30,
  author: 'уйцуйцуу',
};

describe('схемы принимают реальные ответы API', () => {
  it('artist-categories: UUID-строка в id', () => {
    const parsed = artistCategoriesSchema.parse(CATEGORIES.payload);
    expect(parsed[0]!.id).toBe('a0cb2d87-24aa-413e-acb5-aeaed4b857ce');
    expect(parsed[0]!.name).toBe('выф');
  });

  it('all-artists: id строкой, image разворачивается в абсолютный URL', () => {
    const parsed = artistListSchema.parse(ARTISTS.payload);
    const item = parsed.items[0]!;
    expect(item.id).toBe('a23bc7cc-4411-443e-bf8a-3234fc464f4f');
    expect(item.image).toBe('https://stars-api.kassir.kg/uploads/1786959773312-530810331.png');
    expect(item.slug).toBe('уйцуйц');
  });

  it('all-products: id строкой, image абсолютный', () => {
    const parsed = productListSchema.parse(PRODUCTS.payload);
    const item = parsed.items[0]!;
    expect(item.id).toBe('3f134864-c9ec-468a-86e3-a9bf016cf321');
    expect(item.image).toBe('https://stars-api.kassir.kg/uploads/1786959855741-930151538.png');
    expect(item.is_new).toBe(true);
  });

  it('числовой id тоже принимается — на случай, если бэкенд вернётся к спеке', () => {
    const parsed = artistCategoriesSchema.parse([
      { id: 42, slug: 's', name: 'n', name_single: 'ns', count: 0 },
    ]);
    expect(parsed[0]!.id).toBe('42');
  });

  it('artist/{slug}: карточка звезды со всеми полями и seo', () => {
    const parsed = artistDetailSchema.parse(ARTIST_DETAIL);
    expect(parsed.id).toBe('a23bc7cc-4411-443e-bf8a-3234fc464f4f');
    expect(parsed.image).toBe('https://stars-api.kassir.kg/uploads/1786959773312-530810331.png');
    expect(parsed.category).toBe('ewqew');
    expect(parsed.products_count).toBe(1);
    expect(parsed.seo.title).toBe('уйцуйцуу');
  });

  it('product/{slug}: поля colors нет вовсе — подставляется пустой массив', () => {
    const parsed = productDetailSchema.parse(PRODUCT_DETAIL);
    expect(parsed.colors).toEqual([]);
    expect(parsed.sizes).toEqual([]);
    expect(parsed.stock).toBe(30);
    expect(parsed.images).toEqual([
      'https://stars-api.kassir.kg/uploads/1786959855741-930151538.png',
    ]);
  });

  it('product/{slug}: colors приходит null — тоже пустой массив', () => {
    expect(productDetailSchema.parse({ ...PRODUCT_DETAIL, colors: null }).colors).toEqual([]);
  });

  it('абсолютный URL картинки не трогаем', () => {
    const parsed = productListSchema.parse({
      items: [{ ...PRODUCTS.payload.items[0], image: 'https://cdn.example/x.png' }],
      meta: PRODUCTS.payload.meta,
    });
    expect(parsed.items[0]!.image).toBe('https://cdn.example/x.png');
  });
});
