export interface Project {
  slug: string
  name: string
  url: string
  screenshotPath: string
  bgColor: string
  cardLabel: { en: string; ru: string }
  tags: string[]
  oneLiner: { en: string; ru: string }
  challenge: { en: string; ru: string }
  solution: { en: string; ru: string }
  result: { en: string; ru: string }
  gridSize: 'normal' | 'wide'
}

export const projects: Project[] = [
  {
    slug: 'squidwtf',
    name: 'SquidWTF',
    url: 'https://qobuz.squid.wtf',
    screenshotPath: '/images/squidwtf.jpg',
    bgColor: '#150D1E',
    cardLabel: {
      en: 'Music downloader for audiophiles',
      ru: 'Музыкальный загрузчик для аудиофилов',
    },
    tags: ['Web App', 'UI/UX', 'Music'],
    oneLiner: {
      en: 'A browser-based interface for Qobuz that turns a command-line workflow into something you actually want to use.',
      ru: 'Браузерный интерфейс для Qobuz — для тех, кто хочет музыку в высоком качестве без командной строки.',
    },
    challenge: {
      en: 'Downloading high-quality audio from Qobuz required technical knowledge and comfort with the command line — putting it out of reach for most users. The product needed a frontend that matched the quality of the audio it delivered.',
      ru: 'Загрузка аудио высокого качества с Qobuz требовала технических знаний и работы в терминале — большинству пользователей это недоступно. Продукту нужен был интерфейс, который соответствует качеству самой музыки.',
    },
    solution: {
      en: 'We designed and built a clean, fast browser interface that handles the entire download flow without exposing any technical complexity. Search, select, download — three steps, no friction. The visual language reflects the premium nature of lossless audio.',
      ru: 'Мы спроектировали и разработали чистый быстрый браузерный интерфейс, который берёт на себя весь процесс загрузки без технических сложностей. Поиск, выбор, скачивание — три шага, ноль лишнего. Визуальный язык отражает премиальность lossless-аудио.',
    },
    result: {
      en: 'A production-ready web app that makes high-quality music accessible to anyone — not just developers.',
      ru: 'Готовое к продакшену веб-приложение, которое делает музыку высокого качества доступной для любого пользователя.',
    },
    gridSize: 'normal',
  },
  {
    slug: 'monochrome',
    name: 'Monochrome',
    url: '#',
    screenshotPath: '/images/monochrome.jpg',
    bgColor: '#0D0D0D',
    cardLabel: {
      en: 'Browser music player, refined',
      ru: 'Браузерный плеер без компромиссов',
    },
    tags: ['Web App', 'UI/UX', 'Music'],
    oneLiner: {
      en: 'A desktop-grade music player in the browser — library, editorial picks, and rare releases in one clean dark interface.',
      ru: 'Музыкальный плеер уровня десктопного приложения — прямо в браузере.',
    },
    challenge: {
      en: 'Streaming platforms are bloated and cluttered. Users who care about music — not algorithms — needed a player that felt focused, fast, and built for listening rather than engagement metrics.',
      ru: 'Стриминговые платформы перегружены и работают на удержание, а не на слушателя. Нужен был плеер — сфокусированный, быстрый, без лишнего.',
    },
    solution: {
      en: 'We built Monochrome as a browser application that behaves like a native desktop app. Sidebar navigation, persistent playback, editorial picks, and access to rare material — all in a minimal dark interface with no visual noise.',
      ru: 'Мы создали Monochrome как браузерное приложение, которое ведёт себя как нативный десктоп. Sidebar-навигация, непрерывное воспроизведение, редакционные подборки и редкие релизы — в минималистичном тёмном интерфейсе без визуального шума.',
    },
    result: {
      en: 'A music player that respects the listener. Clean, functional, and genuinely different from what the market offers.',
      ru: 'Музыкальный плеер, который уважает слушателя. Чистый, функциональный и непохожий на то, что есть на рынке.',
    },
    gridSize: 'normal',
  },
  {
    slug: 'blueriver',
    name: 'Blue River',
    url: 'https://traiding-company-almaty-blue-river-2555.fly.dev',
    screenshotPath: '/images/blueriver.jpg',
    bgColor: '#0A1628',
    cardLabel: {
      en: 'E-commerce with a visual identity',
      ru: 'Интернет-магазин с характером',
    },
    tags: ['E-commerce', 'UI/UX', 'Web'],
    oneLiner: {
      en: 'A full-cycle online store for an Almaty trading company — aesthetic goods in conceptual collections, built for real commerce.',
      ru: 'Полноценный интернет-магазин для алматинской компании — эстетичные товары в концептуальных коллекциях с полным циклом покупки.',
    },
    challenge: {
      en: 'The client sold visually distinctive products but had no online presence that matched their aesthetic. They needed a store that felt as considered as the goods inside it, with a complete purchase flow.',
      ru: 'Клиент продавал визуально сильные товары, но не имел онлайн-присутствия, которое соответствовало бы их уровню. Нужен был магазин, выглядящий так же продуманно, как сам продукт.',
    },
    solution: {
      en: 'We structured the catalog around four conceptual collections: Nature, Urban, Ocean, and Space. We built the full purchase cycle: product pages, cart, favorites, account, and support. The interface is minimal and image-forward.',
      ru: 'Мы выстроили каталог вокруг четырёх концептуальных коллекций: Nature, Urban, Ocean и Space. Разработали полный цикл покупки: карточки товаров, корзина, избранное, личный кабинет и поддержка.',
    },
    result: {
      en: 'A complete e-commerce platform that gives Blue River a digital presence as strong as their product selection.',
      ru: 'Полноценная e-commerce платформа, которая даёт Blue River такое же сильное онлайн-присутствие, как и их ассортимент.',
    },
    gridSize: 'wide',
  },
  {
    slug: 'coal-analytics',
    name: 'CoalAnalytics',
    url: '#',
    screenshotPath: '/images/coal-analysis-vercel.png',
    bgColor: '#0F0F14',
    cardLabel: {
      en: 'Real-time coal market analytics',
      ru: 'Аналитика угольного рынка в реальном времени',
    },
    tags: ['Dashboard', 'Data', 'Analytics'],
    oneLiner: {
      en: 'A live analytics dashboard tracking coal trading volumes, prices, and market dynamics across Kazakhstan\'s ETS and Kaspi exchanges.',
      ru: 'Live-дашборд для отслеживания объёмов торгов, цен и динамики рынка угля на биржах ETS и Kaspi Казахстана.',
    },
    challenge: {
      en: 'Coal market data across ETS and Kaspi exchanges was fragmented and hard to interpret. Traders and analysts needed a unified, real-time view of volumes, prices, and market structure without digging through raw exchange data.',
      ru: 'Данные угольного рынка Казахстана по биржам ETS и Kaspi были разрозненными и сложными для анализа. Трейдерам и аналитикам не хватало единой актуальной картины по объёмам, ценам и структуре рынка.',
    },
    solution: {
      en: 'We built CoalAnalytics — a live dashboard that consolidates trading data from both exchanges into a single interface. Volume charts, price dynamics, monthly breakdowns, coal type structures, and buyer/seller metrics — all filterable by period and exchange, updating in real time.',
      ru: 'Мы создали CoalAnalytics — live-дашборд, который собирает данные обеих бирж в одном интерфейсе. Объёмы торгов, ценовая динамика, помесячные разбивки, структура по типам угля и метрики покупателей — всё фильтруется по периоду и бирже и обновляется в реальном времени.',
    },
    result: {
      en: 'A professional-grade analytics tool that gives Kazakhstan coal market participants a clear, unified view of trading activity they couldn\'t get anywhere else.',
      ru: 'Профессиональный аналитический инструмент, который даёт участникам угольного рынка Казахстана чёткую единую картину торговой активности.',
    },
    gridSize: 'normal',
  },
]
