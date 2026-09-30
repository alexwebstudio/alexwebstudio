import Heading from '@/components/Heading';
import Reveal from '@/components/Reveal';
import CtaBand from '@/components/CtaBand';
import { IconArrowUp } from '@/components/Icons';
import reviews from '@/content/reviews.json';

export const metadata = {
  title: 'Отзывы клиентов',
  description: 'Отзывы клиентов alexwebstudio о разработке сайтов: многостраничный сайт, каталог, пригласительное, интернет-магазин.',
  alternates: { canonical: '/reviews' },
};

const initials = n => (n.replace(/[^A-Za-zА-Яа-яЁё]/g, '').slice(0, 2) || '•').toUpperCase();

export default function ReviewsPage() {
  return (
    <>
      <section className="page-hero has-wm">
        <span className="wm" aria-hidden="true">Отзывы</span>
        <div className="wrap">
          <Heading as="h1" className="h-hero" manual text="Что говорят *клиенты*" />
          <Reveal as="p" className="lede">Отзывы опубликованы без изменений. Рядом с каждым — ссылка на скриншот оригинала.</Reveal>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal stagger className="rv-grid">
            {reviews.map(r => (
              <figure key={r.nm} className="rv">
                <span className="rv-q" aria-hidden="true">“</span>
                <blockquote className="rv-text">{r.txt}</blockquote>
                <figcaption className="rv-meta">
                  <div className="rv-au">
                    <span className="rv-av" aria-hidden="true">{initials(r.nm)}</span>
                    <div><div className="rv-name">{r.nm}</div><div className="rv-pr">{r.pr}</div></div>
                  </div>
                  {r.src && <a className="rv-src" href={r.src} target="_blank" rel="noopener noreferrer">Оригинал отзыва <IconArrowUp /></a>}
                </figcaption>
              </figure>
            ))}
          </Reveal>
          <div style={{ height: 'clamp(72px,9vw,130px)' }} />
          <CtaBand title="Станьте следующим *клиентом*" text="Расскажите о задаче — отвечу и предложу подходящий формат сайта." />
        </div>
      </section>
    </>
  );
}
