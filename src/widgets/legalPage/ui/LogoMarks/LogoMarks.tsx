import Image from 'next/image';

import { useTranslations } from 'next-intl';

import styles from './LogoMarks.module.scss';

type Ground = 'light' | 'dark' | 'brand';

interface Mark {
  src: string;
  ground: Ground;
  labelKey: string;
}

const MARKS: readonly Mark[] = [
  { src: '/images/logos/brand/base.png', ground: 'light', labelKey: 'markBase' },
  { src: '/images/logos/brand/mono.png', ground: 'brand', labelKey: 'markMono' },
  { src: '/images/logos/brand/invert.png', ground: 'dark', labelKey: 'markInvert' },
  { src: '/images/logos/brand/light-type.png', ground: 'dark', labelKey: 'markLightType' },
];

export const LogoMarks = () => {
  const t = useTranslations('legal');

  return (
    <section className={styles.root}>
      <h2 className={styles.heading}>{t('marks')}</h2>

      <ul className={styles.grid}>
        {MARKS.map((mark) => (
          <li key={mark.src} className={styles.item}>
            <div className={styles.plate} data-ground={mark.ground}>
              <Image
                src={mark.src}
                alt={t(mark.labelKey)}
                width={468}
                height={300}
                quality={90}
                className={styles.image}
              />
            </div>
            <p className={styles.caption}>{t(mark.labelKey)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
