/* Форматирование цен услуг. Единый источник — content/services.json.
   У услуг с полем `price` цена задана диапазонами для «Код» и «Tilda»
   в ₸ и ₽; у остальных (например, пригласительное) остаются строки rub/kzt. */

export const nf = n => n.toLocaleString('ru-RU').replace(/ /g, ' '); // 75000 → "75 000"
export const rangeStr = ([a, b], cur) => `${nf(a)}–${nf(b)} ${cur}`;

/* Стартовая цена для компактных карточек: минимум из всех вариантов. */
export function priceFrom(s) {
  if (!s.price) return { kzt: s.kzt || '', rub: s.rub || '' };
  const kztMin = Math.min(s.price.code.kzt[0], s.price.tilda.kzt[0]);
  const rubMin = Math.min(s.price.code.rub[0], s.price.tilda.rub[0]);
  return { kzt: `от ${nf(kztMin)} ₸`, rub: `от ${nf(rubMin)} ₽` };
}

/* Полная раскладка цены для страницы услуги. Возвращает строки под форматы. */
export function priceRows(s) {
  if (!s.price) {
    return [
      { label: 'Цена, ₸', value: s.kzt || '' },
      { label: 'Цена, ₽', value: s.rub || '' },
    ].filter(r => r.value);
  }
  const p = s.price;
  return [
    { label: 'На коде, ₸', value: rangeStr(p.code.kzt, '₸') },
    { label: 'На коде, ₽', value: rangeStr(p.code.rub, '₽') },
    { label: 'На Tilda, ₸', value: rangeStr(p.tilda.kzt, '₸') },
    { label: 'На Tilda, ₽', value: rangeStr(p.tilda.rub, '₽') },
  ];
}
