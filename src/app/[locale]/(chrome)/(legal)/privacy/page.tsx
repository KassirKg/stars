import { setRequestLocale } from 'next-intl/server';

import { brand } from '@/shared/config';
import { getLegalDoc } from '@/shared/content/legal';
import { assertLocale } from '@/shared/lib/i18n';
import { LegalPage } from '@/widgets/legalPage';

import type { Metadata } from 'next';

const SLUG = 'privacy';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { locale } = await params;
  const doc = await getLegalDoc(locale, SLUG);

  return {
    title: doc.title,
    description: doc.intro,
    alternates: { canonical: '/privacy' },
    openGraph: {
      siteName: brand.appName,
      type: 'article',
      title: doc.title,
      description: doc.intro,
    },
  };
};

const Page = async ({ params }: PageProps) => {
  const { locale } = await params;
  assertLocale(locale);
  setRequestLocale(locale);

  const doc = await getLegalDoc(locale, SLUG);

  return <LegalPage doc={doc}></LegalPage>;
};

export default Page;
