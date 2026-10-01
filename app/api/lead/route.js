/* Приём заявок с сайта и отправка в Telegram.
   Токен и chat_id хранятся в переменных окружения на сервере
   (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID) и не попадают в браузер. */

const esc = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const SOURCES = { brief: '🔥 Новая заявка с сайта', join: '🤝 Заявка в команду' };

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return Response.json({ ok: false, error: 'bad-request' }, { status: 400 }); }

  const { source, rows, company, page } = body || {};
  // ловушка для ботов: скрытое поле должно остаться пустым
  if (company) return Response.json({ ok: true });
  if (!SOURCES[source] || !Array.isArray(rows) || !rows.length || rows.length > 30) {
    return Response.json({ ok: false, error: 'bad-request' }, { status: 400 });
  }
  const clean = rows
    .filter(r => Array.isArray(r) && r.length === 2 && String(r[1] ?? '').trim())
    .map(([k, v]) => [String(k).slice(0, 80), String(v).trim().slice(0, 2000)]);
  if (!clean.length) return Response.json({ ok: false, error: 'bad-request' }, { status: 400 });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) {
    // Чаще всего это значит, что на хостинге не заданы переменные окружения
    // TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID (локально они берутся из .env.local,
    // который намеренно не попадает в деплой). Смотрите логи функции /api/lead.
    console.error('[lead] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID не заданы в окружении этого сервера — заявка не отправлена.');
    return Response.json({ ok: false, error: 'not-configured' }, { status: 503 });
  }

  const text = '<b>' + SOURCES[source] + '</b>\n\n' +
    clean.map(([k, v]) => '<b>' + esc(k) + ':</b> ' + esc(v)).join('\n') +
    (page ? '\n\n<i>' + esc(String(page).slice(0, 300)) + '</i>' : '');

  try {
    const res = await fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text, parse_mode: 'HTML', disable_web_page_preview: true }),
      signal: AbortSignal.timeout(10000),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.ok === false) {
      console.error('[lead] Telegram API вернул ошибку:', res.status, data && data.description);
      return Response.json({ ok: false, error: 'telegram' }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (e) {
    console.error('[lead] Не удалось обратиться к Telegram:', e && e.message);
    return Response.json({ ok: false, error: 'telegram' }, { status: 502 });
  }
}
