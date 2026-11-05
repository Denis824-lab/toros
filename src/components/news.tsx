import { asset } from "../lib/assets";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "../data/content";
import { Card } from "./ui/card";
export function NewsCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  return (
    <Card className={`news-card ${featured ? "featured-news" : ""}`}>
      <Link to={`/news/${article.slug}`}>
        <div className="news-image">
          <img
            src={asset(article.image)}
            alt={article.imageAlt}
            loading="lazy"
            width="800"
            height="533"
          />
        </div>
        <div className="news-card-content">
          <div className="news-meta">
            <span>{article.category}</span>
            <time>{article.date || "ПАМЯТКА"}</time>
          </div>
          <h3>{article.title}</h3>
          {featured && <p>{article.lead}</p>}
          <ArrowUpRight className="news-arrow" />
        </div>
      </Link>
    </Card>
  );
}
