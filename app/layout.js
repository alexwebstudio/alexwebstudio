import './globals.css';
import { bodyFont, headingFont, logoFont, monoFont } from './fonts';
import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import settings from '@/content/settings.json';

export const metadata = {
  metadataBase: new URL(settings.siteUrl),
  title: {
    default: 'alexwebstudio — сайты, которые доводят посетителя до заявки',
    template: '%s — alexwebstudio',
  },
  description: 'Проектирую и запускаю сайты для бизнеса в России и Казахстане: лендинги, многостраничные сайты, интернет-магазины, сайты-визитки и пригласительные. На коде или на Tilda.',
  keywords: ['разработка сайтов', 'создание сайтов под ключ', 'веб-студия', 'заказать лендинг', 'интернет-магазин', 'корпоративный сайт', 'сайт-визитка', 'Казахстан', 'Россия', 'Караганда'],
  authors: [{ name: 'AlexWebStudio' }],
  openGraph: {
    type: 'website', locale: 'ru_RU', siteName: 'AlexWebStudio', url: '/',
    images: [{ url: '/images/preview.jpg', width: 1200, height: 1200 }],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/images/favicon.svg', apple: '/images/preview.jpg' },
  verification: { google: 'qtXbQVBaCC6v8RDU9ZV0k3fUgVZHvfCc2bzX7riVO_w' },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: '#050507', viewportFit: 'cover' };

/* до первой отрисовки: включаем режим анимаций и пропускаем прелоадер,
   если он уже был показан в этой сессии */
const boot = `(function(d){d.classList.add('js');try{if(sessionStorage.getItem('aws-seen')||matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('no-preload')}catch(e){}})(document.documentElement)`;

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${logoFont.variable} ${bodyFont.variable} ${monoFont.variable} ${headingFont.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <div className="glow-bg" aria-hidden="true" />
        <div className="prog" aria-hidden="true" />
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
