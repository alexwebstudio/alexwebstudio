import Link from 'next/link';
import Heading from '@/components/Heading';
import Reveal from '@/components/Reveal';
import { PRIVACY, PRIVACY_UPDATED } from '@/content/privacy';
import { getSettings } from '@/lib/content';

export const metadata = {
  title: 'Политика конфиденциальности',
  description: 'Политика в отношении обработки персональных данных на сайте alexwebstudio.ru в соответствии с ФЗ-152 «О персональных данных».',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
};

const fmtDate = d => new Date(d).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

export default function PrivacyPage() {
  const { siteUrl } = getSettings();
  return (
    <>
      <section className="page-hero has-wm">
        <span className="wm" aria-hidden="true">Политика</span>
        <div className="wrap">
          <Reveal as="nav" className="crumbs" aria-label="Навигация">
            <Link href="/">Главная</Link><span>/</span><span aria-current="page">Политика конфиденциальности</span>
          </Reveal>
          <Heading as="h1" className="h-hero" manual text="Политика *конфиденциальности*" />
          <Reveal as="p" className="lede">Политика в отношении обработки персональных данных на сайте {siteUrl.replace(/^https?:\/\//, '')}. Обновлено: {fmtDate(PRIVACY_UPDATED)}.</Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <article className="legal">
            {PRIVACY.map(section => (
              <section key={section.h}>
                <h2>{section.h}</h2>
                {section.blocks.map((b, i) => (
                  b.list
                    ? <ul key={i}>{b.list.map((li, j) => <li key={j}>{li}</li>)}</ul>
                    : <p key={i}>{b.p}</p>
                ))}
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
