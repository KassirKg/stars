import { brand } from '@/shared/config';

import type { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: brand.appName,
    short_name: brand.appName,
    description: 'Официальный мерч и личные вещи звёзд: артисты, певцы, блогеры.',
    start_url: '/',
    display: 'standalone',
    background_color: '#111111',
    theme_color: '#111111',
    icons: [
      { src: `/images/favicons/favicon.ico`, sizes: 'any', type: 'image/x-icon' },
      { src: `/images/favicons/android-chrome-192x192.png`, sizes: '192x192', type: 'image/png' },
      { src: `/images/favicons/android-chrome-512x512.png`, sizes: '512x512', type: 'image/png' },
    ],
  };
};

export default manifest;
