import { type ReactNode } from 'react';

import { Inter } from 'next/font/google';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Toaster } from 'react-hot-toast';

import { brand, env } from '@/shared/config';
import { assertLocale } from '@/shared/lib/i18n';
import { routing } from '@/shared/lib/i18n/routing';
import { themeInitScript } from '@/shared/lib/theme-init-script';
import { AppProviders } from '@/shared/providers/AppProviders';
import { WebVitals } from '@/shared/providers/WebVitals';
import { ScrollToTop } from '@/shared/ui';

import type { Metadata, Viewport } from 'next';

import '@/shared/styles/globals.scss';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#111111',
};

export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }));

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta-data' });

  const title = t('title');
  const description = t('description');

  const code = env.NEXT_PUBLIC_COUNTRY_CODE;

  const iconsDir = `/images/favicons/${['kg', 'tj', 'uz'].includes(code) ? code : 'kg'}`;

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
    icons: {
      icon: [
        { url: `${iconsDir}/favicon.ico`, sizes: 'any' },
        { url: `${iconsDir}/favicon-32x32.png`, type: 'image/png', sizes: '32x32' },
        { url: `${iconsDir}/favicon-16x16.png`, type: 'image/png', sizes: '16x16' },
      ],
      apple: `${iconsDir}/apple-touch-icon.png`,
    },
    title: {
      default: `${title} — ${brand.appName}`,
      template: `%s — ${brand.appName}`,
    },
    description,
    keywords: t('keywords')
      .split(',')
      .map((keyword) => keyword.trim()),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    alternates: {
      canonical: '/',
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l === routing.defaultLocale ? '' : l}`]),
      ),
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: env.NEXT_PUBLIC_SITE_URL,
      siteName: brand.appName,
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
};

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;
  assertLocale(locale);

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-accent={brand.accent}
      className={inter.variable}
      suppressHydrationWarning
    >
      {}
      <head>
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ScrollToTop />
          <AppProviders>{children}</AppProviders>
        </NextIntlClientProvider>
        <Toaster position="top-center" />
        <WebVitals />
      </body>
    </html>
  );
};

export default LocaleLayout;
