'use client';

import { useState } from 'react';

import { useAtom } from 'jotai';
import { Crown, Package, Shirt, Banknote } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { paymentDataGatewayAtom } from '@/entities/payment';
import { Counter } from '@/features/counter';
import { isAsideOpen } from '@/shared/store';

import styles from './ProductInfo.module.scss';

interface ProductInfoProps {
  title: string;
  author: string;
  price: number;
  description: string;
  sizes: string[];
  image: string;
}

const ProductInfo = ({ ...props }: ProductInfoProps) => {
  const t = useTranslations();
  const [count, setCount] = useState(1);
  const [size, setSize] = useState(props.sizes[0] || '');
  const [, setProduct] = useAtom(paymentDataGatewayAtom);
  const [, setIsAsideOpen] = useAtom(isAsideOpen);

  const handleBuy = () => {
    setProduct((prev) => ({
      ...prev,
      id: 0,
      price: props.price,
      size: size,
      count: count,
    }));
    setIsAsideOpen(true);
  };

  return (
    <>
      <div className={styles.info}>
        <h1 className={styles.title}>{props.title}</h1>

        <div className={styles.metaRow}>
          <Crown size={18} />
          <span>{props.author}</span>
        </div>

        <div className={styles.count}>
          <Package size={18} />
          <span>
            {t('left')} 2300 {t('products')}
          </span>
        </div>

        <div className={styles.sizes}>
          <Shirt size={18} />
          <span>
            {t('sizes')}: {props.sizes.join(', ')}
          </span>
        </div>

        <div className={styles.price}>
          <Banknote size={18} />
          <span className={styles.price_money}>{props.price}</span>
          <span>{t('som')}</span>
        </div>

        <div className={styles.bottom}>
          <h2 className={styles.sectionTitle}>{t('description')}</h2>

          <div className={styles.description}>{props.description}</div>
        </div>

        <div className={styles.btns}>
          <div className={styles.btns_actions}>
            <Counter count={count} setCount={setCount} />
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className={styles.select}
            >
              {props.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <button type="button" className={styles.buyButton} onClick={handleBuy}>
            {t('buy')}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
