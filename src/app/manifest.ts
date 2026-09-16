import { brand, env } from '@/shared/config';

import type { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => {
  const code = env.NEXT_PUBLIC_COUNTRY_CODE;
  const iconsDir = `/images/favicons/${['kg', 'tj', 'uz'].includes(code) ? code : 'kg'}`;

  return {
    name: brand.appName,
    short_name: brand.appName,
    description: 'Официальный мерч и личные вещи звёзд: артисты, певцы, блогеры.',
    start_url: '/',
    display: 'standalone',
    background_color: '#111111',
    theme_color: '#111111',
    icons: [
      { src: `${iconsDir}/favicon.ico`, sizes: 'any', type: 'image/x-icon' },
      { src: `${iconsDir}/android-chrome-192x192.png`, sizes: '192x192', type: 'image/png' },
      { src: `${iconsDir}/android-chrome-512x512.png`, sizes: '512x512', type: 'image/png' },
    ],
  };
};

export default manifest;
