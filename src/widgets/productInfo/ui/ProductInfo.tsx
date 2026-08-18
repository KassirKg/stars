'use client';

import { useState } from 'react';

import { useAtom } from 'jotai';
import { Crown, Package, Shirt, Banknote, Palette } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { paymentDataGatewayAtom } from '@/entities/payment';
import { type ProductColor, type ProductSize } from '@/entities/product';
import { Counter } from '@/features/counter';
import { currencyLabel } from '@/shared/config';
import { isAsideOpen } from '@/shared/store';

import styles from './ProductInfo.module.scss';

interface ProductInfoProps {
  id: string;
  title: string;
  author: string;
  price: number;
  currency: string;
  description: string;
  sizes: ProductSize[];
  colors: ProductColor[];
  stock: number;
}

const ProductInfo = ({
  id,
  title,
  author,
  price,
  currency,
  description,
  sizes,
  colors,
  stock,
}: ProductInfoProps) => {
  const t = useTranslations();
  const [count, setCount] = useState(1);
  // по умолчанию — первый доступный вариант, а не просто первый
  const [size, setSize] = useState(sizes.find((s) => s.available)?.value ?? '');
  const [colorId, setColorId] = useState<string | null>(
    colors.find((c) => c.available)?.id ?? null,
  );
  const [, setProduct] = useAtom(paymentDataGatewayAtom);
  const [, setIsAsideOpen] = useAtom(isAsideOpen);

  // размер обязателен только если он у товара вообще есть:
  // бэкенд отдаёт sizes: [] для товаров без размерной сетки
  const canBuy = stock > 0 && (sizes.length === 0 || Boolean(size));

  const handleBuy = () => {
    setProduct((prev) => ({ ...prev, id, price, currency, size, colorId, count }));
    setIsAsideOpen(true);
  };

  return (
    <div className={styles.info}>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.metaRow}>
        <Crown size={18} />
        <span>{author}</span>
      </div>

      <div className={styles.count}>
        <Package size={18} />
        <span>
          {t('left')} {stock} {t('products')}
        </span>
      </div>

      {sizes.length > 0 ? (
        <div className={styles.sizes}>
          <Shirt size={18} />
          <span>
            {t('sizes')}:{' '}
            {sizes
              .filter((s) => s.available)
              .map((s) => s.value)
              .join(', ')}
          </span>
        </div>
      ) : null}

      {colors.length > 0 ? (
        <div className={styles.colors}>
          <Palette size={18} />
          <div className={styles.colorList}>
            {colors.map((color) => (
              <button
                key={color.id}
                type="button"
                title={color.name}
                aria-label={color.name}
                aria-pressed={colorId === color.id}
                disabled={!color.available}
                onClick={() => setColorId(color.id)}
                style={{ background: color.hex }}
                className={`${styles.colorSwatch} ${colorId === color.id ? styles.colorSwatchActive : ''}`}
              />
            ))}
          </div>
        </div>
      ) : null}

      <div className={styles.price}>
        <Banknote size={18} />
        <span className={styles.price_money}>{price.toLocaleString()}</span>
        <span>{currencyLabel(currency)}</span>
      </div>

      <div className={styles.bottom}>
        <h2 className={styles.sectionTitle}>{t('description')}</h2>
        <div className={styles.description}>{description}</div>
      </div>

      <div className={styles.btns}>
        <div className={styles.btns_actions}>
          <Counter count={count} setCount={setCount} />
          {sizes.length > 0 ? (
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className={styles.select}
              aria-label={t('sizes')}
            >
              {sizes.map((s) => (
                <option key={s.value} value={s.value} disabled={!s.available}>
                  {s.value}
                </option>
              ))}
            </select>
          ) : null}
        </div>
        <button type="button" className={styles.buyButton} onClick={handleBuy} disabled={!canBuy}>
          {t('buy')}
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
