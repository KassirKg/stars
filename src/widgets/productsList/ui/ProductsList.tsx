'use client';

import {
  ProductCard,
  useArtistProducts,
  useProducts,
  type ProductListItem,
} from '@/entities/product';

import styles from './ProductsList.module.scss';

interface ProductsListProps {
  title?: string;
  artist?: string;
}

const Grid = ({ title, items }: { title?: string; items: ProductListItem[] }) => {
  if (!items.length) return null;

  return (
    <section className={styles.root}>
      {title && (
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </header>
      )}

      <div className={styles.grid}>
        {items.map((item) => (
          <ProductCard
            key={item.id}
            slug={item.slug}
            title={item.title}
            image={item.image}
            price={item.price}
            currency={item.currency}
            new={item.is_new}
            author={item.author}
          />
        ))}
      </div>
    </section>
  );
};

const AllProducts = ({ title }: { title?: string }) => {
  const { data } = useProducts();
  return <Grid title={title} items={data?.items ?? []} />;
};

const ArtistProducts = ({ title, slug }: { title?: string; slug: string }) => {
  const { data } = useArtistProducts(slug);
  return <Grid title={title} items={data?.items ?? []} />;
};

const ProductsList = ({ title, artist }: ProductsListProps) =>
  artist ? <ArtistProducts title={title} slug={artist} /> : <AllProducts title={title} />;

export default ProductsList;
