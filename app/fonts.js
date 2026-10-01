import { Unbounded, Onest, JetBrains_Mono, Tektur } from 'next/font/google';
// import localFont from 'next/font/local';

/* Логотип и крупные декоративные цифры — Unbounded (фирменный, не меняется) */
export const logoFont = Unbounded({
  subsets: ['latin', 'cyrillic'], weight: ['600', '700', '800'], variable: '--font-logo', display: 'swap',
});

/* Основной текст, кнопки, формы — Onest (не меняется) */
export const bodyFont = Onest({
  subsets: ['latin', 'cyrillic'], weight: ['300', '400', '500', '600'], variable: '--font-body', display: 'swap',
});

/* Моноширинные подписи */
export const monoFont = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'], weight: ['400', '500'], variable: '--font-mono', display: 'swap',
});

/* ЗАГОЛОВКИ — Tektur: современный характерный дисплейный шрифт с кириллицей.
   Применяется только к заголовкам (.hx). Логотип и декоративные цифры
   остаются на Unbounded, основной текст — на Onest.
   Если захотите другой вариант, легко заменить на Wix Madefor Display
   или Geologica (оба с кириллицей) — поменяйте импорт и вызов ниже. */
export const headingFont = Tektur({
  subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600', '700'], variable: '--font-heading', display: 'swap',
});
