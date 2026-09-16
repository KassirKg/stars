import Image from 'next/image';

import { UserRound } from 'lucide-react';

import { formatPrice } from '@/shared/config';
import { Link } from '@/shared/lib/i18n/navigation';

import styles from './ProductCard.module.scss';

interface ProductCardProps {
  slug: string;
  title: string;
  author: string;
  price: number;
  currency?: string;
  image?: string;
  new?: boolean;
  onClick?: () => void;
}

const ProductCard = ({
  slug,
  title,
  author,
  price,
  currency,
  image,
  new: isNew,
  onClick,
}: ProductCardProps) => {
  return (
    <Link href={`/product/${slug}`} className={styles.root} onClick={onClick}>
      <div className={styles.imageWrap}>
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className={styles.image}
          />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden />
        )}

        {isNew ? <span className={styles.pinBadge}>new</span> : null}

        <div className={styles.priceCluster}>
          <span className={styles.priceBadge}>{formatPrice(price, currency)}</span>
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title} title={title}>
          {title}
        </h3>

        <p className={styles.date}>
          <span className={styles.dateIcon} aria-hidden>
            <UserRound size={13} strokeWidth={2.25} />
          </span>
          <span className={styles.dateText}>{author}</span>
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
