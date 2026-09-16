export interface FooterLink {
  href: string;
  labelKey: string;
}

export interface FooterGroup {
  title: string;
  links: readonly FooterLink[];
}

export const NAV_GROUPS: readonly FooterGroup[] = [
  {
    title: 'aboutCompany',
    links: [
      { href: '/about', labelKey: 'aboutProject' },
      { href: '/partners', labelKey: 'partners' },
      { href: '/offer', labelKey: 'public' },
      { href: '/logos', labelKey: 'logo' },
    ],
  },
  {
    title: 'rules',
    links: [
      { href: '/terms', labelKey: 'userAgreement' },
      { href: '/delivery', labelKey: 'delivery' },
      { href: '/rights', labelKey: 'forHolders' },
      { href: '/privacy', labelKey: 'privacyPolicy' },
    ],
  },
];
