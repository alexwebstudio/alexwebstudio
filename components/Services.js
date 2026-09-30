/* «Какой сайт нужен вам?» — компактные карточки-ссылки на страницы услуг. */
import Link from 'next/link';
import services from '@/content/services.json';
import Reveal from './Reveal';
import { IconArrow } from './Icons';

export default function Services() {
  return (
    <Reveal stagger className="svc-grid">
      {services.map((s, i) => (
        <Link key={s.id} className="svc" href={`/services/${s.slug}`}>
          <span className="svc-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <span className="svc-title">{s.title}</span>
          <span className="svc-fit">{s.lead}</span>
          <span className="svc-foot">
            <span className="svc-price">{s.rub}<span>{s.kzt} · {s.term}</span></span>
            <span className="svc-more" aria-hidden="true"><IconArrow /></span>
          </span>
        </Link>
      ))}
      <Link className="svc svc-help" href="/brief">
        <span className="svc-num" aria-hidden="true">?</span>
        <span className="svc-title">Не знаете, что выбрать?</span>
        <span className="svc-fit">Ответьте на несколько вопросов — по ответам подскажу подходящий формат.</span>
        <span className="svc-foot">
          <span className="svc-price">Пройти квиз</span>
          <span className="svc-more" aria-hidden="true"><IconArrow /></span>
        </span>
      </Link>
    </Reveal>
  );
}
