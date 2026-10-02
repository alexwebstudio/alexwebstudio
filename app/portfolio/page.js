import Heading from '@/components/Heading';
import Reveal from '@/components/Reveal';
import PortfolioGrid from '@/components/PortfolioGrid';
import meta from '@/content/portfolio.json';
import { getProjects, toCard } from '@/lib/content';
import { og } from '@/lib/seo';

export const metadata = {
  title: 'Портфолио',
  description: 'Сайты, сделанные alexwebstudio: реальные проекты для заказчиков, концепты и шаблоны. Лендинги, многостраничные сайты, интернет-магазины и пригласительные.',
  alternates: { canonical: '/portfolio' },
  openGraph: og('/portfolio'),
};

export default function PortfolioPage() {
  const projects = getProjects().map(toCard);
  return (
    <>
      <section className="page-hero has-wm">
        <span className="wm" aria-hidden="true">Портфолио</span>
        <div className="wrap">
          <Heading as="h1" className="h-hero" manual text="Работы, которые *можно открыть* и проверить" />
          <Reveal as="p" className="lede">Сайты для заказчиков и концепты — проекты, которые я делал сам, чтобы показать подход к определённой нише. Переключатель ниже оставит только реальные работы, а на странице каждого проекта указано, что это.</Reveal>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <PortfolioGrid projects={projects} />
          <Reveal className="legend">
            {Object.entries(meta.statuses).map(([k, s]) => (
              <div key={k}><b>{s.label}</b><span>{s.note}</span></div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
