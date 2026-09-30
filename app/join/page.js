import Heading from '@/components/Heading';
import Reveal from '@/components/Reveal';
import JoinCards from '@/components/JoinCards';

export const metadata = {
  title: 'Вступить в команду',
  description: 'Оставьте заявку, чтобы работать вместе с alexwebstudio: разработка, Tilda, дизайн, продажи, SMM. С опытом и без опыта.',
  alternates: { canonical: '/join' },
};

export default function JoinPage() {
  return (
    <>
      <section className="page-hero has-wm">
        <span className="wm" aria-hidden="true">Команда</span>
        <div className="wrap">
          <Heading as="h1" className="h-hero" manual text="Хотите делать сайты *вместе*?" />
          <Reveal as="p" className="lede">Студия растёт, и в будущем мне понадобятся люди в разных направлениях — разработка, дизайн, продажи, SMM. Выберите подходящий путь и оставьте заявку.</Reveal>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <JoinCards />
          <Reveal as="p" className="join-note">Сейчас нет открытых вакансий. Заявка — это способ познакомиться: я сохраню её и свяжусь, когда появится задача по вашему направлению.</Reveal>
        </div>
      </section>
    </>
  );
}
