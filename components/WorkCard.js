/* Карточка работы — портфолио и связанные работы на страницах услуг. */
import Image from 'next/image';
import Link from 'next/link';
import { IconArrow } from './Icons';

export const projectSub = p => [p.type, p.niche].filter(Boolean).join(' · ');

export default function WorkCard({ p, sizes = '(max-width: 900px) 100vw, 33vw', priority = false }) {
  return (
    <Link className="work" href={`/portfolio/${p.slug}`}>
      <div className="work-media">
        {p.cover && <Image src={p.cover.src} alt={`Скриншот сайта ${p.title}`} fill sizes={sizes} priority={priority} />}
        <span className="work-go" aria-hidden="true">Смотреть проект <IconArrow /></span>
      </div>
      <div className="work-meta">
        <h3 className="work-title">{p.title}</h3>
        <p className="work-sub">{projectSub(p)}</p>
      </div>
    </Link>
  );
}
