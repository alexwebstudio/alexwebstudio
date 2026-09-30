import Link from 'next/link';
import Heading from '@/components/Heading';
import BackLink from '@/components/BackLink';
import { IconArrow } from '@/components/Icons';

export const metadata = { title: 'Страница не найдена' };

const LINKS = [
  { href: '/portfolio', label: 'Портфолио' },
  { href: '/#useful', label: 'Полезные работы' },
  { href: '/#types', label: 'Услуги' },
  { href: '/brief', label: 'Обсудить проект' },
];

export default function NotFound() {
  return (
    <section className="nf has-wm">
      <span className="wm" aria-hidden="true">404</span>
      <div className="wrap nf-in">
        <p className="pj-kicker">Ошибка 404</p>
        <Heading as="h1" className="h-hero" text="Такой страницы *нет*" />
        <p className="lede">Возможно, ссылка устарела или в адресе опечатка. Вернитесь на главную или продолжите с одного из разделов.</p>
        <div className="cta">
          <Link className="btn btn-primary" href="/">На главную <IconArrow /></Link>
          <BackLink>Назад</BackLink>
        </div>
        <nav className="nf-links" aria-label="Разделы сайта">
          {LINKS.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </nav>
      </div>
    </section>
  );
}
