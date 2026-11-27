export interface ScheduleEntry {
  readonly days: readonly string[];
  readonly opens: string;
  readonly closes: string;
  readonly label: string;
}

export interface BrandConfig {
  readonly name: string;
  readonly subtitle: string;
  readonly fullName: string;
  readonly founder: string;
  readonly founderRole: string;
  readonly slogan: string;
  readonly siteUrl: string;
  readonly whatsappPrimary: string;
  readonly whatsappDisplay: string;
  readonly instagramHandle: string;
  readonly instagramUrl: string;
  readonly googleMapsUrl: string;
  readonly googleKgUrl: string;
  readonly address: {
    readonly street: string;
    readonly neighborhood: string;
    readonly city: string;
    readonly state: string;
    readonly postalCode: string;
    readonly country: string;
    readonly full: string;
  };
  readonly geo: {
    readonly latitude: number;
    readonly longitude: number;
  };
  readonly rating: {
    readonly value: string;
    readonly best: string;
    readonly count: string;
  };
  readonly schedule: readonly ScheduleEntry[];
  readonly publishedIso: string;
  readonly updatedIso: string;
  readonly updatedDisplay: string;
}

export const BRAND: BrandConfig = {
  name: 'Stela Gualberto',
  subtitle: 'Doceria',
  fullName: 'Stela Gualberto Doceria',
  founder: 'Stela Gualberto',
  founderRole: 'Chef Confeiteira e Fundadora',
  slogan: 'Minha doçura, pra você!',
  siteUrl: 'https://newstelagualbertodoceria.pages.dev',
  whatsappPrimary: '5537999232526',
  whatsappDisplay: '(37) 99923-2526',
  instagramHandle: '@stelagualbertodoceria',
  instagramUrl: 'https://www.instagram.com/stelagualbertodoceria/',
  googleMapsUrl:
    'https://www.google.com/maps/place/Stela+Gualberto+Doceria/@-20.1361212,-44.8947003,17z/data=!3m1!4b1!4m6!3m5!1s0xa0afd2dee5e55f:0xfe593c3b98ec5bdb!8m2!3d-20.1361212!4d-44.8921254!16s%2Fg%2F11cnm7p8tk',
  googleKgUrl: 'https://www.google.com/search?kgmid=/g/11cnm7p8tk',
  address: {
    street: 'Av. Divino Espírito Santo, 826',
    neighborhood: 'Centro',
    city: 'Divinópolis',
    state: 'MG',
    postalCode: '35500-021',
    country: 'BR',
    full: 'Av. Divino Espírito Santo, 826 · Centro · Divinópolis - MG',
  },
  geo: {
    latitude: -20.1361212,
    longitude: -44.8921254,
  },
  rating: {
    value: '4.7',
    best: '5',
    count: '435',
  },
  schedule: [
    {
      days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '11:00',
      closes: '19:00',
      label: 'Terça a sexta: 11h às 19h',
    },
    {
      days: ['Saturday', 'Sunday'],
      opens: '10:00',
      closes: '17:00',
      label: 'Sábado e domingo: 10h às 17h',
    },
  ],
  publishedIso: '2026-11-25',
  updatedIso: '2026-11-27',
  updatedDisplay: '27 de novembro de 2026',
} as const;
