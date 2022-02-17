export const ageSettings = [
  { slug: '1-2', name: '1-2 tahun' },
  { slug: '2-3', name: '2-3 tahun' },
  { slug: '3-4', name: '3-4 tahun' },
];

export const categories = [
  { slug: 'motorik', name: 'Motorik' },
  { slug: 'sensorik', name: 'Sensorik' },
  { slug: 'kognitif', name: 'Kognitif' },
  { slug: 'seni', name: 'Seni' },
  { slug: 'sosial', name: 'Sosial' },
  { slug: 'bahasa', name: 'Bahasa' },
  { slug: 'lorem', name: 'Lorem' },
  { slug: 'lorem', name: 'Lorem' },
];

export const posts = [
  {
    slug: 'mengenal-waktu-sehari-hari',
    title: 'Mengenal Waktu Sehari-hari',
    href: '#',
    category: categories[2],
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    minAge: 2,
    maxAge: 10,
    numberOfPlay: 300,
    needRegistration: false,
    objective: 'Aktivitas ini mengenai pengenalan anak kepada waktu dan aktivitas sehari-hari',
    items: ['Jam Dinding', 'Kertas', 'Pensil/Pulpen'],
  },
  {
    slug: 'mencari-harta-harun-di-rumah',
    title: 'Mencari Harta Karun di Rumah',
    href: '#',
    category: categories[2],
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
    imageUrl:
      'https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    minAge: 4,
    maxAge: 10,
    numberOfPlay: 300,
    needRegistration: false,
    objective: 'Aktivitas ini mengenai pengenalan anak kepada waktu dan aktivitas sehari-hari',
    items: ['Jam Dinding', 'Kertas', 'Pensil/Pulpen'],
  },
  {
    slug: 'mencari-rumah-di-harta-karun',
    title: 'Mencari Rumah di Harta Karun',
    href: '#',
    category: categories[2],
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    imageUrl:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    minAge: 4,
    maxAge: 10,
    numberOfPlay: 250,
    needRegistration: true,
    objective: 'Aktivitas ini mengenai pengenalan anak kepada waktu dan aktivitas sehari-hari',
    items: ['Jam Dinding', 'Kertas', 'Pensil/Pulpen'],
  },
];
