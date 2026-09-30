import { Unbounded, Onest, JetBrains_Mono } from 'next/font/google';
// import localFont from 'next/font/local';

/* Логотип и крупные цифры — Unbounded (фирменный, не меняется) */
export const logoFont = Unbounded({
  subsets: ['latin', 'cyrillic'], weight: ['600', '700', '800'], variable: '--font-logo', display: 'swap',
});

/* Основной текст, кнопки, формы — Onest (с кириллицей) */
export const bodyFont = Onest({
  subsets: ['latin', 'cyrillic'], weight: ['300', '400', '500', '600'], variable: '--font-body', display: 'swap',
});

/* Моноширинные подписи */
export const monoFont = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'], weight: ['400', '500'], variable: '--font-mono', display: 'swap',
});

/* ШРИФТ ЗАГОЛОВКОВ
   Пока нового файла нет, заголовки набраны Onest (лёгкие начертания).
   Чтобы подключить свой шрифт:
   1) положите файл в app/fonts/heading.woff2;
   2) раскомментируйте импорт localFont выше и замените блок ниже на:
      export const headingFont = localFont({
        src: './fonts/heading.woff2', variable: '--font-heading', display: 'swap',
      });
   Шрифт применится только к заголовкам. */
export const headingFont = Onest({
  subsets: ['latin', 'cyrillic'], weight: ['300', '400', '500'], variable: '--font-heading', display: 'swap',
});
