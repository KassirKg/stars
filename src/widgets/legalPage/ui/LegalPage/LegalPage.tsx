import { type ReactNode } from 'react';

import { Mail, MapPin, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { brand } from '@/shared/config';
import { type LegalDoc } from '@/shared/content/legal';

import styles from './LegalPage.module.scss';

interface LegalPageProps {
  doc: LegalDoc;
  children?: ReactNode;
}

export const LegalPage = ({ doc, children }: LegalPageProps) => {
  const t = useTranslations('legal');
  const year = new Date().getFullYear();

  return (
    <article className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.title}>{doc.title}</h1>
        <p className={styles.intro}>{doc.intro}</p>
      </header>

      {doc.sections.map((section) => (
        <section key={section.heading} className={styles.section}>
          <h2 className={styles.heading}>{section.heading}</h2>

          {section.body?.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}

          {section.list ? (
            <ul className={styles.list}>
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      {children}

      {doc.withContacts ? (
        <section className={styles.contacts}>
          <h2 className={styles.heading}>{t('requisites')}</h2>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <MapPin size={16} aria-hidden />
              <span>{brand.address}</span>
            </li>
            <li className={styles.contactItem}>
              <Phone size={16} aria-hidden />
              <a href={`tel:${brand.phone.replace(/\s+/g, '')}`}>{brand.phone}</a>
            </li>
            <li className={styles.contactItem}>
              <Mail size={16} aria-hidden />
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </li>
          </ul>
          <p className={styles.entity}>
            {brand.copyright}, {year}
          </p>
        </section>
      ) : null}
    </article>
  );
};
