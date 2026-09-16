export type AccentColor = 'blue' | 'orange' | 'violet' | 'red' | 'cyan' | 'yellow';

export interface BrandConfig {
  appName: string;
  phone: string;
  email: string;
  address: string;
  copyright: string;
  telegram: string;
  instagram: string;
  support: string;
  accent: AccentColor;
}

export const brand: BrandConfig = {
  appName: 'Stars',
  phone: '+996 704 144 155',
  email: 'info@kassir.kg',
  address: 'г.Бишкек, ул. Исанова 105/3',
  copyright: 'ОсОО "Билет Онлайн"',
  telegram: 'https://t.me/kassirkgz',
  instagram: 'https://www.instagram.com/kassir.kg/',
  support: 'https://wa.me/996700266933',
  accent: 'yellow',
};
