export const LEGAL_SLUGS = [
  'about',
  'partners',
  'offer',
  'logos',
  'terms',
  'delivery',
  'rights',
  'privacy',
] as const;

export type LegalSlug = (typeof LEGAL_SLUGS)[number];

export interface LegalSection {
  heading: string;
  body?: readonly string[];
  list?: readonly string[];
}

export interface LegalDoc {
  title: string;
  intro: string;
  sections: readonly LegalSection[];
  withContacts?: boolean;
}

export type LegalDocs = Readonly<Record<LegalSlug, LegalDoc>>;
