import Image from 'next/image';
import Link from 'next/link';
import Heading from '@/components/Heading';
import Reveal from '@/components/Reveal';
import { Marquee, Principles, ProcessAccordion, Statement } from '@/components/AboutParts';
import { IconArrow } from '@/components/Icons';
import about from '@/content/about.json';

export const metadata = {
  title: 'Обо мне',
  description: 'Александр — веб-разработчик, основатель alexwebstudio. Как я работаю: этапы, принципы и подход к сайтам для бизнеса в России и Казахстане.',
  alternates: { canonical: '/about' },
};

const BENTO = ['b-lg', 'b-2', '', '', 'b-w'];

export default function AboutPage() {
  const [lead, ...team] = about.team;
  return (
    <>
      <section className="page-hero has-wm">
        <span className="wm" aria-hidden="true">Обо мне</span>
        <div className="wrap">
          <Heading as="h1" className="h-hero" manual text="Меня зовут Александр. Я делаю *сайты* для бизнеса" />
        </div>
      </section>

      {/* Кто делает сайты. Когда в content/about.json → team появятся
          другие участники, ниже автоматически выведется сетка команды. */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap about-top">
          <div>
            <Reveal className="bio">{about.bio.map(p => <p key={p.slice(0, 20)}>{p}</p>)}</Reveal>
            <Reveal stagger className="stack">
              {about.stack.map(s => <div className="st-chip" key={s.nm}><span className="dot" /><span className="nm">{s.nm}</span><span className="ct">{s.ct}</span></div>)}
            </Reveal>
          </div>
          <Reveal as="figure" className="about-photo">
            <Image src={lead.photo} alt={`${lead.name} — ${lead.role}`} fill sizes="(max-width: 900px) 100vw, 40vw" />
            <figcaption><b>{lead.name}</b><span>{lead.role}</span></figcaption>
          </Reveal>
        </div>
        {team.length > 0 && (
          <div className="wrap" style={{ marginTop: 64 }}>
            <Reveal stagger className="team-grid">
              {team.map(m => (
                <figure key={m.name} className="about-photo">
                  {m.photo && <Image src={m.photo} alt={m.name} fill sizes="300px" />}
                  <figcaption><b>{m.name}</b><span>{m.role}</span></figcaption>
                </figure>
              ))}
            </Reveal>
          </div>
        )}
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Statement text="Сначала разбираюсь в вашем бизнесе и целях, потом делаю. Объясняю понятно, держу в курсе и не пропадаю после оплаты." accent={['разбираюсь', 'понятно']} />
        </div>
      </section>

      <section className="section has-wm" id="approach" aria-labelledby="approachTitle">
        <span className="wm" aria-hidden="true">Подход</span>
        <div className="wrap">
          <div className="s-head">
            <div><Heading id="approachTitle" className="h2" text="Полный *цикл*" /></div>
            <Reveal className="s-side"><p>От прототипа до поддержки после запуска — всё в одних руках.</p></Reveal>
          </div>
          <Reveal stagger className="bento">
            {about.cycle.map((c, i) => (
              <div key={c.t} className={BENTO[i]}><span className="b-n">{String(i + 1).padStart(2, '0')}</span><h3>{c.t}</h3><p>{c.d}</p></div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section has-wm" id="process" aria-labelledby="processTitle">
        <span className="wm" aria-hidden="true">Этапы</span>
        <div className="wrap">
          <div className="s-head">
            <div><Heading id="processTitle" className="h2" text="Этапы *работы*" /></div>
            <Reveal className="s-side"><p>Пять понятных шагов: на каждом вы видите результат и можете внести правки.</p></Reveal>
          </div>
          <Reveal><ProcessAccordion steps={about.process} /></Reveal>
        </div>
      </section>

      <Marquee words={about.principles.map(p => p.t)} />

      <section className="section has-wm" id="principles" aria-labelledby="principlesTitle">
        <span className="wm" aria-hidden="true">Принципы</span>
        <div className="wrap">
          <div className="s-head">
            <div><Heading id="principlesTitle" className="h2" text="Мои *принципы*" /></div>
          </div>
          <Principles items={about.principles} />
        </div>
      </section>

      <section className="section has-wm" id="advantages" aria-labelledby="advTitle" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="s-head">
            <div><Heading id="advTitle" className="h2" text="Преим*ущества*" /></div>
          </div>
          <Reveal stagger className="adv">
            {about.advantages.map((a, i) => (
              <div key={a.t} className="adv-card"><span className="adv-wm" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><h3>{a.t}</h3><p>{a.d}</p></div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="scene2">
        <div className="wrap">
          <Heading className="scramble" text="Дизайн, который *продаёт*" />
          <Reveal as="p">Каждый элемент работает на одно: чтобы посетитель стал клиентом.</Reveal>
          <Reveal><Link className="btn btn-primary" href="/brief">Обсудить проект <IconArrow /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
