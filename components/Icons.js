/* Иконки в едином стиле: контур 1.6px, скругления */
const Svg = ({ children, ...p }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...p}>
    {children}
  </svg>
);

export const IconTelegram = p => (
  <Svg {...p}><path d="M21.2 4.2 2.9 11.3c-.8.3-.8 1.4 0 1.7l4.6 1.6 1.8 5.2c.2.6 1 .8 1.5.3l2.6-2.5 4.7 3.5c.6.4 1.4.1 1.6-.6L22.5 5.5c.2-.9-.6-1.6-1.3-1.3Z" /><path d="m7.5 14.6 10-7.1-7.4 8.3" /></Svg>
);
export const IconWhatsapp = p => (
  <Svg {...p}><path d="M3.5 20.5 4.8 16A8.6 8.6 0 1 1 8 19.3l-4.5 1.2Z" /><path d="M9.1 8.2c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2.1.4 0 .6l-.5.6c-.1.2-.2.3 0 .6.4.7 1 1.4 1.7 1.9.5.3.8.5 1 .6.2.1.4 0 .5-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.2.1.4.2.4.4 0 .5-.1 1.1-.5 1.5-.5.5-1.4.8-2.2.7-1-.1-2.4-.6-3.8-1.9-1.5-1.4-2.3-2.8-2.5-3.8-.2-1 .2-2 .5-2.4Z" /></Svg>
);
export const IconInstagram = p => (
  <Svg {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r=".6" fill="currentColor" /></Svg>
);
export const IconTiktok = p => (
  <Svg {...p}><path d="M14.5 3.5v11a3.8 3.8 0 1 1-3.8-3.8" /><path d="M14.5 3.5c.3 2.6 2.2 4.6 5 4.8" /></Svg>
);
export const IconChannel = p => (
  <Svg {...p}><path d="M4 10v4a1 1 0 0 0 1 1h2l6 4V5L7 9H5a1 1 0 0 0-1 1Z" /><path d="M16.5 9a4 4 0 0 1 0 6M19 6.5a7.5 7.5 0 0 1 0 11" /></Svg>
);
export const IconPhone = p => (
  <Svg {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" /></Svg>
);
export const IconArrow = p => <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>;
export const IconArrowUp = p => <Svg {...p}><path d="M7 17 17 7M8 7h9v9" /></Svg>;
export const IconClose = p => <Svg {...p}><path d="M6 6l12 12M18 6 6 18" /></Svg>;
export const IconChevron = p => <Svg {...p}><path d="m6 15 6-6 6 6" /></Svg>;

export const SOCIAL_ICONS = {
  telegram: IconTelegram, whatsapp: IconWhatsapp, instagram: IconInstagram, tiktok: IconTiktok, telegramChannel: IconChannel,
};
export const SOCIAL_LABELS = {
  telegram: 'Telegram', whatsapp: 'WhatsApp', instagram: 'Instagram', tiktok: 'TikTok', telegramChannel: 'Telegram-канал',
};

/* Ссылки на соцсети из content/settings.json; пустые адреса не выводятся */
export function socialList(contacts, keys = ['telegram', 'whatsapp', 'instagram', 'tiktok']) {
  return keys.filter(k => contacts[k]).map(k => ({ key: k, url: contacts[k], label: SOCIAL_LABELS[k], Icon: SOCIAL_ICONS[k] }));
}
