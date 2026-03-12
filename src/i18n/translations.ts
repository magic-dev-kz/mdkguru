export const languages = {
  ru: 'Русский',
  en: 'English',
  es: 'Español',
};

export const defaultLang = 'ru';

export const ui = {
  ru: {
    'nav.home': 'Главная',
    'nav.blog': 'Блог',
    'nav.apps': 'Приложения',
    'nav.skills': 'Скиллы',
    'nav.roadmap': 'Roadmap',
    'nav.about': 'О студии',
    'nav.dashboard': 'Dashboard',
    'hero.title': 'Один человек. Пять агентов.',
    'hero.subtitle': 'Бесконечные возможности.',
    'hero.description': 'MDK.GURU - студия, где один предприниматель управляет командой ИИ-агентов. Автоматизация бизнеса, контент, аналитика - без найма людей.',
    'hero.cta': 'Читать блог',
    'hero.cta2': 'Подписаться',
    'features.title': 'Что делают мои агенты',
    'features.mo': 'Операционный директор. Аналитика, отчёты, дедлайны.',
    'features.izya': 'SMM-менеджер. Контент в Instagram, Telegram, ВК.',
    'features.molot': 'Разведчик. Тренды, конкуренты, материал.',
    'features.leo': 'Дизайнер. Визуал, обложки, баннеры.',
    'features.house': 'Доктор системы. Мониторинг и восстановление.',
    'footer.telegram': 'Подписаться на канал',
    'footer.copyright': '© 2026 MDK.GURU. Один человек + ИИ.',
    'blog.title': 'Блог',
    'blog.description': 'Практика, кейсы, грабли. Без воды.',
    'apps.title': 'Приложения',
    'skills.title': 'OpenClaw Скиллы',
    'roadmap.title': 'Roadmap',
    'about.title': 'О студии',
  },
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.apps': 'Apps',
    'nav.skills': 'Skills',
    'nav.roadmap': 'Roadmap',
    'nav.about': 'About',
    'nav.dashboard': 'Dashboard',
    'hero.title': 'One person. Five agents.',
    'hero.subtitle': 'Infinite possibilities.',
    'hero.description': 'MDK.GURU is a studio where one entrepreneur runs a team of AI agents. Business automation, content, analytics - without hiring people.',
    'hero.cta': 'Read blog',
    'hero.cta2': 'Subscribe',
    'features.title': 'What my agents do',
    'features.mo': 'COO. Analytics, reports, deadlines.',
    'features.izya': 'SMM Manager. Content for Instagram, Telegram, VK.',
    'features.molot': 'Scout. Trends, competitors, research.',
    'features.leo': 'Designer. Visuals, covers, banners.',
    'features.house': 'System Doctor. Monitoring and recovery.',
    'footer.telegram': 'Subscribe to channel',
    'footer.copyright': '© 2026 MDK.GURU. One person + AI.',
    'blog.title': 'Blog',
    'blog.description': 'Practice, cases, lessons. No fluff.',
    'apps.title': 'Apps',
    'skills.title': 'OpenClaw Skills',
    'roadmap.title': 'Roadmap',
    'about.title': 'About',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.blog': 'Blog',
    'nav.apps': 'Apps',
    'nav.skills': 'Skills',
    'nav.roadmap': 'Roadmap',
    'nav.about': 'Sobre',
    'nav.dashboard': 'Dashboard',
    'hero.title': 'Una persona. Cinco agentes.',
    'hero.subtitle': 'Posibilidades infinitas.',
    'hero.description': 'MDK.GURU es un estudio donde un emprendedor dirige un equipo de agentes IA. Automatización, contenido, analítica - sin contratar personas.',
    'hero.cta': 'Leer blog',
    'hero.cta2': 'Suscribirse',
    'features.title': 'Qué hacen mis agentes',
    'features.mo': 'Director de operaciones. Analítica, informes, plazos.',
    'features.izya': 'SMM. Contenido para Instagram, Telegram, VK.',
    'features.molot': 'Explorador. Tendencias, competidores, investigación.',
    'features.leo': 'Diseñador. Visuales, portadas, banners.',
    'features.house': 'Doctor del sistema. Monitoreo y recuperación.',
    'footer.telegram': 'Suscribirse al canal',
    'footer.copyright': '© 2026 MDK.GURU. Una persona + IA.',
    'blog.title': 'Blog',
    'blog.description': 'Práctica, casos, lecciones. Sin relleno.',
    'apps.title': 'Apps',
    'skills.title': 'OpenClaw Skills',
    'roadmap.title': 'Roadmap',
    'about.title': 'Sobre',
  },
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}
