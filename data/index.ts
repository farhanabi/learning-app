import bahasaIcon from '../public/images/category/blocks.png';
import kognitifIcon from '../public/images/category/brain.png';
import sosialIcon from '../public/images/category/chat.png';
import motorikIcon from '../public/images/category/juggling-ball.png';
import moralIcon from '../public/images/category/kindness.png';
import seniIcon from '../public/images/category/palette.png';
import emosiIcon from '../public/images/category/reaction.png';
import sensorikIcon from '../public/images/category/search.png';

export const ageSettings = [
  { slug: '1-2', name: '1-2 tahun' },
  { slug: '2-3', name: '2-3 tahun' },
  { slug: '3-4', name: '3-4 tahun' },
];

export const categories = [
  { slug: 'motorik', name: 'Motorik', images: motorikIcon },
  { slug: 'sensorik', name: 'Sensorik', images: sensorikIcon },
  { slug: 'kognitif', name: 'Kognitif', images: kognitifIcon },
  { slug: 'seni', name: 'Seni', images: seniIcon },
  { slug: 'sosial', name: 'Sosial', images: sosialIcon },
  { slug: 'bahasa', name: 'Bahasa', images: bahasaIcon },
  { slug: 'moral', name: 'Moral', images: moralIcon },
  { slug: 'emosi', name: 'Emosi', images: emosiIcon },
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

export function renderRingColor(slug: string) {
  switch (slug) {
    case 'motorik':
      return 'ring-[#E09090]';
    case 'sensorik':
      return 'ring-[#D9D1BA]';
    case 'kognitif':
      return 'ring-[#EDB64A]';
    case 'seni':
      return 'ring-[#7ADFED]';
    case 'sosial':
      return 'ring-[#D1A5EC]';
    case 'bahasa':
      return 'ring-[#DCDCDC]';
    case 'moral':
      return 'ring-[#52C7C0]';
    case 'emosi':
      return 'ring-[#5CACD2]';
    default:
      return 'ring-yellow-500';
  }
}

export function renderBgColor(slug: string | undefined) {
  switch (slug) {
    case 'motorik':
      return 'bg-[#E09090]';
    case 'sensorik':
      return 'bg-[#D9D1BA]';
    case 'kognitif':
      return 'bg-[#EDB64A]';
    case 'seni':
      return 'bg-[#7ADFED]';
    case 'sosial':
      return 'bg-[#D1A5EC]';
    case 'bahasa':
      return 'bg-[#DCDCDC]';
    case 'moral':
      return 'bg-[#52C7C0]';
    case 'emosi':
      return 'bg-[#5CACD2]';
    default:
      return 'bg-yellow-500';
  }
}
