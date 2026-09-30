'use client';
/* Отправка заявок на сервер (/api/lead → Telegram).
   rows — массив пар [подпись, значение]. */

export function leadText(title, rows) {
  return title + '\n\n' +
    rows.filter(r => r[1] && String(r[1]).trim()).map(r => r[0] + ': ' + r[1]).join('\n');
}

export async function sendLead({ source, title, rows, trap = '' }) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source, title, rows, company: trap, page: location.href }),
      signal: ctrl.signal,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) {
      const err = new Error(data.error || 'failed');
      err.code = data.error || 'failed';
      throw err;
    }
    return true;
  } finally {
    clearTimeout(t);
  }
}

/* простая проверка контакта по выбранному способу связи */
export function checkContact(kind, value) {
  const v = (value || '').trim();
  const digits = v.replace(/\D/g, '');
  if (!v) return false;
  if (kind === 'telegram') return /^@?[a-zA-Z0-9_]{4,32}$/.test(v) || (digits.length >= 10 && digits.length <= 15);
  return digits.length >= 10 && digits.length <= 15;
}

export const CONTACT_KINDS = {
  telegram: { label: 'Telegram', placeholder: '@username или номер телефона', type: 'text', inputMode: 'text',
    error: 'Укажите @username (от 4 символов) или номер телефона' },
  whatsapp: { label: 'WhatsApp', placeholder: '+7 700 000 00 00', type: 'tel', inputMode: 'tel',
    error: 'Укажите номер WhatsApp — не меньше 10 цифр' },
  phone: { label: 'Телефон', placeholder: '+7 700 000 00 00', type: 'tel', inputMode: 'tel',
    error: 'Укажите номер телефона — не меньше 10 цифр' },
};
