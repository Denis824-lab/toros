import { media } from "../data/media";
import { asset } from "../lib/assets";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, EffectFade, Keyboard } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { Button } from "../components/ui/button";
import RubberSegment from "../components/reactbits/RubberSegment";
import LivingPhoto from "../components/hero/LivingPhoto";
import { Magnetic, MotionHeading, Reveal } from "../components/motion";
import { NextMatch } from "../components/matches";
import { NewsCard } from "../components/news";
import { articles } from "../data/content";
import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  {
    image: media.hero,
    eyebrow: "НЕФТЕКАМСК — ГОРОД ХОККЕЯ",
    title: ["НАШ ГОРОД.", "НАША", "КОМАНДА."],
    to: "/calendar",
    button: "К матчам",
  },
  {
    image: media.team,
    eyebrow: "СЕЗОН 2026/27",
    title: ["ОДНА КОМАНДА.", "ОДИН", "ХАРАКТЕР."],
    to: "/team",
    button: "Состав команды",
  },
  {
    image: media.school,
    eyebrow: "ДЕТСКО-ЮНОШЕСКАЯ СПОРТИВНАЯ ШКОЛА",
    title: ["БОЛЬШОЙ ХОККЕЙ", "НАЧИНАЕТСЯ", "ЗДЕСЬ."],
    to: "/school",
    button: "О спортшколе",
  },
];
export default function Home() {
  const slider = useRef<SwiperInstance | null>(null);
  const [active, setActive] = useState(0);
  const [category, setCategory] = useState("Все");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const filtered =
    category === "Все"
      ? articles
      : articles.filter((a) => a.category === category);
  return (
    <>
      <section className="hero" aria-label="Жизнь Тороса">
        <Swiper
          modules={[A11y, EffectFade, Keyboard]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={reduced ? 0 : 650}
          keyboard={{ enabled: true, onlyInViewport: true }}
          a11y={{
            prevSlideMessage: "Предыдущий сюжет",
            nextSlideMessage: "Следующий сюжет",
            slideLabelMessage: "Сюжет {{index}} из {{slidesLength}}",
          }}
          onSwiper={(s) => (slider.current = s)}
          onSlideChange={(s) => setActive(s.activeIndex)}
        >
          {slides.map((s, i) => (
            <SwiperSlide key={s.to}>
              <div className={`hero-scene hero-scene-${i}`}>
                <LivingPhoto
                  src={asset(s.image)}
                  scene={i}
                  active={active === i}
                />
                <div className="hero-shade" />
                <div className="container hero-content">
                  <span className="eyebrow">{s.eyebrow}</span>
                  <MotionHeading
                    as="h1"
                    lines={s.title}
                    active={active === i}
                    aria-hidden={active !== i}
                  />
                  <div className="hero-actions">
                    <Magnetic>
                      <Button asChild className="green-button">
                        <Link to={s.to} tabIndex={active === i ? 0 : -1}>
                          {s.button}
                          <ArrowRight />
                        </Link>
                      </Button>
                    </Magnetic>
                    <Button asChild variant="outline" className="light-outline">
                      <Link to="/club" tabIndex={active === i ? 0 : -1}>
                        О клубе
                        <ArrowUpRight />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="container hero-controls">
          <div className="slide-progress">
            <span>
              <b>0{active + 1}</b> / 03
            </span>
            {slides.map((s, i) => (
              <button
                key={s.to}
                onClick={() => slider.current?.slideTo(i)}
                className={active === i ? "active" : ""}
                aria-label={`Показать сюжет ${i + 1}`}
                aria-pressed={active === i}
              />
            ))}
          </div>
          <span className="hero-caption">ТОРОС · ВХЛ · СЕЗОН 2026/27</span>
          <div className="slide-arrows">
            <Button
              size="icon"
              variant="outline"
              aria-label="Предыдущий сюжет"
              disabled={active === 0}
              onClick={() => slider.current?.slidePrev()}
            >
              <ChevronLeft />
            </Button>
            <Button
              size="icon"
              variant="outline"
              aria-label="Следующий сюжет"
              disabled={active === 2}
              onClick={() => slider.current?.slideNext()}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </section>
      <Reveal>
        <NextMatch />
      </Reveal>
      <Reveal
        className="section container home-news"
        role="region"
        aria-label="Новости клуба"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow blue-text">НОВОСТИ И СОБЫТИЯ</span>
            <MotionHeading lines={["ЖИЗНЬ КЛУБА"]} />
          </div>
          <RubberSegment
            items={[
              { value: "Все", label: "Все новости" },
              "Команда",
              "Клуб",
              "Спортшкола",
            ]}
            value={category}
            onChange={setCategory}
            trackColor="#edf2f8"
            thumbColor="#06152d"
            textColor="#17458f"
            activeTextColor="#fff"
            size="lg"
            radius={8}
            inset={4}
            equalSlots
            className="news-segment"
            aria-label="Категории новостей"
          />
        </div>
        <div
          className={`home-news-grid ${filtered.length < 3 ? "few-news" : ""}`}
        >
          {filtered.slice(0, 3).map((a, i) => (
            <NewsCard article={a} key={a.slug} featured={i === 0} />
          ))}
        </div>
        <div className="section-bottom">
          <span className="muted">Главное со льда и за его пределами</span>
          <Link className="text-link" to="/news">
            Все новости
            <ArrowRight />
          </Link>
        </div>
      </Reveal>
      <Reveal className="team-banner" role="region" aria-label="Команда города">
        <img
          src={asset(media.team)}
          alt="Игроки Тороса у борта"
          loading="lazy"
        />
        <div className="banner-shade" />
        <div className="container banner-content">
          <span className="eyebrow">ЛЮДИ, КОТОРЫЕ ВЫХОДЯТ ЗА НАШ ГОРОД</span>
          <MotionHeading lines={["КОМАНДА", "ГОРОДА"]} />
          <p>
            «Торос» — хоккей Нефтекамска.
            <br />
            Познакомьтесь с игроками и тренерским штабом.
          </p>
          <Button asChild variant="outline" className="light-outline">
            <Link to="/team">
              Наша команда
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </Reveal>
      <Reveal
        className="section container school-teaser"
        role="region"
        aria-label="Спортшкола"
      >
        <div className="school-photo">
          <img
            src={asset(media.school)}
            alt="Юный хоккеист в экипировке"
            loading="lazy"
          />
        </div>
        <div>
          <span className="eyebrow blue-text">СЛЕДУЮЩЕЕ ПОКОЛЕНИЕ</span>
          <MotionHeading lines={["ТВОЙ ПУТЬ", "В ХОККЕЙ"]} />
          <p>
            Первые шаги на льду, первые друзья, первая команда. Узнайте о
            хоккейной школе «Тороса».
          </p>
          <div className="hero-actions">
            <Button asChild>
              <Link to="/school">
                Спортшкола
                <ArrowRight />
              </Link>
            </Button>
            <Link className="text-link" to="/school#parents">
              Родителям
              <ArrowUpRight />
            </Link>
          </div>
        </div>
      </Reveal>
      <section className="city-strip">
        <div className="container">
          <span>НАШ ГОРОД.</span>
          <span>НАША КОМАНДА.</span>
          <span className="green-text">НАШ ТОРОС.</span>
        </div>
      </section>
    </>
  );
}
