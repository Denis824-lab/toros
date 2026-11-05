import { asset } from "../lib/assets";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { PageHeading } from "../components/layout";
import { NewsCard } from "../components/news";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { articles } from "../data/content";
export default function News() {
  const [category, setCategory] = useState("Все");
  const [query, setQuery] = useState("");
  const result = articles.filter(
    (a) =>
      (category === "Все" || a.category === category) &&
      `${a.title} ${a.lead}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <>
      <PageHeading
        label="Пресс-центр"
        title="ЖИЗНЬ КЛУБА"
        description="Матчи, люди и события. Хоккей продолжается за пределами площадки."
      />
      <section className="section container page-section">
        <div className="filter-row">
          <Tabs value={category} onValueChange={setCategory}>
            <TabsList className="filter-tabs" aria-label="Категория публикаций">
              {["Все", "Команда", "Клуб", "Спортшкола"].map((c) => (
                <TabsTrigger key={c} value={c}>
                  {c === "Все" ? "Все новости" : c}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <label className="search-field">
            <Search size={17} />
            <span className="sr-only">Поиск по новостям</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Найти новость"
            />
          </label>
        </div>
        {result.length ? (
          <div className="news-grid">
            {result.map((a) => (
              <NewsCard key={a.slug} article={a} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search />
            <h3>Публикаций не найдено</h3>
            <p>Попробуйте другой запрос.</p>
            <Button
              onClick={() => {
                setQuery("");
                setCategory("Все");
              }}
            >
              Все публикации
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
export function ArticlePage() {
  const { slug } = useParams();
  const a = articles.find((a) => a.slug === slug);
  if (!a) return <NotFound />;
  return (
    <>
      <PageHeading label="Новости" title={a.title} />
      <article className="container article-page">
        <div className="article-meta">
          <Link to="/news">
            <ArrowLeft size={16} />
            Все новости
          </Link>
          <span>
            {a.category} · {a.date || "Памятка"}
          </span>
        </div>
        <figure>
          <img src={asset(a.image)} alt={a.imageAlt} />
          <figcaption>{a.credit}</figcaption>
        </figure>
        <div className="article-body">
          <p className="article-lead">{a.lead}</p>
          {a.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <a
            className="text-link"
            href={a.source}
            target="_blank"
            rel="noreferrer"
          >
            Официальный источник
            <ArrowUpRight />
          </a>
        </div>
      </article>
      <section className="section container">
        <div className="section-heading">
          <h2>ЕЩЁ О КЛУБЕ</h2>
          <Link to="/news" className="text-link">
            Все новости
            <ArrowRight />
          </Link>
        </div>
        <div className="news-grid">
          {articles
            .filter((b) => b.slug !== slug)
            .slice(0, 3)
            .map((b) => (
              <NewsCard key={b.slug} article={b} />
            ))}
        </div>
      </section>
    </>
  );
}
export function NotFound() {
  return (
    <section className="empty-state not-found">
      <span className="huge-number">404</span>
      <h1>ШАЙБА УШЛА ЗА БОРТ</h1>
      <p>Такой страницы нет. Вернёмся к игре?</p>
      <Button asChild>
        <Link to="/">
          На главную
          <ArrowRight />
        </Link>
      </Button>
    </section>
  );
}
