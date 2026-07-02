'use client';

import Image from 'next/image';

import { useAtom } from 'jotai';
import { ReceiptText, UserRound } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { IoClose } from 'react-icons/io5';

import { paymentDataGatewayAtom } from '@/entities/payment';
import { FormSendDataUserForPay } from '@/features/sendDataUserForPay';
import { isAsideOpen } from '@/shared/store';
import { calculateTotalPrice } from '@/shared/utils';

import styles from './AsideBar.module.scss';

interface AsideBarProps {
  title: string;
  image: string;
}

const AsideBar = ({ ...props }: AsideBarProps) => {
  const localizer = useTranslations();
  const [isAsideBarOpen, setIsAsideBarOpen] = useAtom(isAsideOpen);
  const [paymentInfo] = useAtom(paymentDataGatewayAtom);

  const onClose = () => {
    setIsAsideBarOpen(false);
  };

  return (
    <>
      <button
        className={`${styles.overlay} ${isAsideBarOpen ? styles.overlayOpen : ''}`}
        onClick={onClose}
      />

      <aside
        className={`${styles.panel} ${isAsideBarOpen ? styles.panelOpen : ''}`}
        aria-hidden={!isAsideBarOpen}
      >
        <div className={styles.header}>
          <div className={styles.header__top}>
            <h2>{localizer('checkoutTitle')}</h2>
            <button type="button" className={styles.close} onClick={onClose} aria-label="close">
              <IoClose size={24} />
            </button>
          </div>

          <h4>{localizer('checkoutSubtitle')}</h4>

          <div className={styles.productInfo}>
            <Image src={props.image} alt={'product image'} width={100} height={100} priority />
            <div className={styles.productInfo_textInfo}>
              <h4>{props.title}</h4>
              <p>
                {paymentInfo.price} {localizer('som')}
              </p>
              <div>
                <p>
                  {localizer('sizes')}: {paymentInfo.size}
                </p>
                <p>
                  {localizer('count')}: {paymentInfo.count}шт.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className={styles.form}>
          <div className={styles.form_title}>
            <UserRound size={18} color={'lab(79.2667 9.96342 51.0155)'} />
            <h2>{localizer('contactDetails')}</h2>
          </div>
          <div className={styles.body}>
            <FormSendDataUserForPay />
          </div>
        </section>

        <div className={styles.footer}>
          <div className={styles.footer_price}>
            <div>
              <ReceiptText size={18} color={'lab(79.2667 9.96342 51.0155)'} />
              <h3>{localizer('totalToPay')}</h3>
            </div>
            <h2>
              {calculateTotalPrice(paymentInfo.count, paymentInfo.price)} {localizer('som')}
            </h2>
          </div>
          <div className={styles.footer_btns}>
            <button className={styles.payBtn} form={'payment-form'}>
              {localizer('pay')}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AsideBar;
