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

const BRACELET_IMG = 'https://cdn.poehali.dev/projects/7c62b135-c02e-40db-8c8e-122bf400b652/files/0719274b-3340-45d7-acd1-b37af9feb698.jpg';

export const products: Product[] = [
  {
    id: 1,
    name: 'Neon Coral',
    price: 1890,
    oldPrice: 2490,
    image: BRACELET_IMG,
    color: '#FF6B6B',
    tag: 'Хит',
    description: 'Яркий коралловый браслет из натуральных бусин. Идеален для пляжного сезона и городских прогулок.',
    reviews: [
      { id: 1, author: 'Маша К.', rating: 5, text: 'Обожаю! Цвет просто огонь, носить одно удовольствие 🔥', date: '12 мая 2026' },
      { id: 2, author: 'Алина Р.', rating: 5, text: 'Купила три штуки разных цветов — не могу остановиться!', date: '3 мая 2026' },
      { id: 3, author: 'Вера С.', rating: 4, text: 'Очень красивый, доставка быстрая. Советую!', date: '28 апр 2026' },
    ],
  },
  {
    id: 2,
    name: 'Electric Blue',
    price: 2290,
    image: BRACELET_IMG,
    color: '#00B8D9',
    tag: 'Новинка',
    description: 'Электрик синий браслет с серебряными вставками. Смелый акцент для любого образа.',
    reviews: [
      { id: 1, author: 'Таня М.', rating: 5, text: 'Получила комплимент от незнакомки на улице 😄', date: '10 мая 2026' },
      { id: 2, author: 'Оля В.', rating: 4, text: 'Цвет насыщеннее, чем на фото — это плюс!', date: '5 мая 2026' },
    ],
  },
  {
    id: 3,
    name: 'Golden Hour',
    price: 3190,
    image: BRACELET_IMG,
    color: '#FFD600',
    tag: 'Лимитед',
    description: 'Золотой браслет с кристаллами Swarovski. Роскошь, которую можно надеть каждый день.',
    reviews: [
      { id: 1, author: 'Катя Л.', rating: 5, text: 'Подарила маме — она в восторге! Качество на высоте.', date: '8 мая 2026' },
      { id: 2, author: 'Дина Б.', rating: 5, text: 'Смотрится дорого, хотя цена приятная.', date: '1 мая 2026' },
      { id: 3, author: 'Света О.', rating: 5, text: 'Лучший браслет в моей коллекции!', date: '22 апр 2026' },
    ],
  },
  {
    id: 4,
    name: 'Mint Fresh',
    price: 1590,
    image: BRACELET_IMG,
    color: '#00E5CC',
    description: 'Нежный мятный браслет из полимерной глины. Лёгкий и воздушный — как весенний ветер.',
    reviews: [
      { id: 1, author: 'Настя Г.', rating: 4, text: 'Очень нежный и аккуратный. Ношу каждый день!', date: '15 мая 2026' },
      { id: 2, author: 'Ира П.', rating: 5, text: 'Мой фаворит этого лета 🌿', date: '9 мая 2026' },
    ],
  },
  {
    id: 5,
    name: 'Violet Storm',
    price: 2690,
    oldPrice: 3200,
    image: BRACELET_IMG,
    color: '#9B59B6',
    tag: 'Скидка',
    description: 'Темно-фиолетовый браслет с матовыми камнями. Загадочный и стильный.',
    reviews: [
      { id: 1, author: 'Юля К.', rating: 5, text: 'Неожиданно стал любимым! Очень необычный цвет.', date: '7 мая 2026' },
      { id: 2, author: 'Лена Д.', rating: 4, text: 'Заказала по скидке — отличное качество за такую цену!', date: '2 мая 2026' },
    ],
  },
  {
    id: 6,
    name: 'Wild Rose',
    price: 2190,
    image: BRACELET_IMG,
    color: '#FF4081',
    tag: 'Топ',
    description: 'Розовый браслет с жемчугом и бронзовыми элементами. Для тех, кто любит romance.',
    reviews: [
      { id: 1, author: 'Аня С.', rating: 5, text: 'Жемчуг настоящий и очень красивый!', date: '11 мая 2026' },
      { id: 2, author: 'Рита М.', rating: 5, text: 'Купила себе и подруге — обе счастливы 💕', date: '6 мая 2026' },
      { id: 3, author: 'Тоня Н.', rating: 4, text: 'Очень женственный, всем советую.', date: '30 апр 2026' },
    ],
  },
];
