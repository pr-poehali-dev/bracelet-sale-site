export interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  color: string;
  tag?: string;
  description: string;
  reviews: Review[];
}

export const products: Product[] = [
  {
    id: 3,
    name: 'Golden Hour',
    price: 50,
    image: 'https://cdn.poehali.dev/files/02cc1558-cfae-4fc0-a46d-e7051d2c66b0.jpeg',
    color: '#FFD600',
    tag: 'Лимитед',
    description: 'Золотой браслет с кристаллами Swarovski. Роскошь, которую можно надеть каждый день.',
    reviews: [
      { id: 1, author: 'Катя Л.', rating: 5, text: 'Подарила маме — она в восторге! Качество на высоте.', date: '8 мая 2026' },
      { id: 2, author: 'Дина Б.', rating: 5, text: 'Смотрится дорого, хотя цена приятная.', date: '1 мая 2026' },
      { id: 3, author: 'Света О.', rating: 5, text: 'Лучший браслет в моей коллекции!', date: '22 апр 2026' },
    ],
  },
];