import { Unbounded, Onest, JetBrains_Mono, Wix_Madefor_Display } from 'next/font/google';
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

/* ЗАГОЛОВКИ — Wix Madefor Display: современный премиальный дисплейный шрифт
   с характером и полной поддержкой кириллицы. Применяется только к заголовкам (.hx).
   Логотип и декоративные цифры остаются на Unbounded, основной текст — на Onest.
   Альтернативы с кириллицей при желании: Geologica, Golos Text. */
export const headingFont = Wix_Madefor_Display({
  subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600', '700'], variable: '--font-heading', display: 'swap',
});
