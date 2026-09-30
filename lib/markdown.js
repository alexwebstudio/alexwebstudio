/* Минимальный разбор описаний проектов: абзацы, списки «- », подзаголовки «## ».
   Возвращает структуру, которую страница рендерит обычными React-элементами. */
export function parseBody(text) {
  const blocks = [];
  for (const chunk of (text || '').split(/\n\s*\n/)) {
    const lines = chunk.split('\n').map(l => l.trim()).filter(Boolean);
    if (!lines.length) continue;
    if (lines.every(l => l.startsWith('- '))) {
      blocks.push({ type: 'list', items: lines.map(l => l.slice(2)) });
    } else if (lines[0].startsWith('## ')) {
      blocks.push({ type: 'h', text: lines[0].slice(3) });
      if (lines.length > 1) blocks.push({ type: 'p', text: lines.slice(1).join(' ') });
    } else {
      blocks.push({ type: 'p', text: lines.join(' ') });
    }
  }
  return blocks;
}
