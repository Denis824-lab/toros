import { media } from "../data/media";
import { asset } from "../lib/assets";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, MapPin, Trophy } from "lucide-react";
import { PageHeading, SourceNote } from "../components/layout";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { sources } from "../data/content";
export default function Club() {
  return (
    <>
      <PageHeading
        label="О клубе"
        title="ТОРОС. ЭТО МЫ."
        description="Город. Команда. История, которую мы продолжаем вместе."
      />
      <section className="club-hero">
        <img src={asset(media.team)} alt="Игроки Тороса у борта" />
        <div className="banner-shade" />
        <div className="container">
          <span className="eyebrow">НЕФТЕКАМСК · С 1984 ГОДА</span>
          <h2>
            БОЛЬШЕ,
            <br />
            ЧЕМ ИГРА.
          </h2>
          <p>
            «Торос» — профессиональная хоккейная команда Нефтекамска, участник
            Всероссийской хоккейной лиги.
          </p>
        </div>
      </section>
      <section className="section container club-story">
        <div>
          <span className="eyebrow blue-text">НАШ ХАРАКТЕР</span>
          <h2>
            ХОККЕЙ
            <br />В СЕРДЦЕ ГОРОДА
          </h2>
        </div>
        <div>
          <p className="large-copy">
            С 1984 года история «Тороса» неразрывно связана с Нефтекамском.
          </p>
          <p>
            Клуб начинал под названием «Торпедо». Сегодня «Торос» представляет
            город во Всероссийской хоккейной лиге, а при клубе работает
            детско-юношеская спортивная школа.
          </p>
          <p>
            Три чемпионских сезона, поколения игроков и болельщики, для которых
            домашний матч — особенное событие.
          </p>
          <SourceNote href={sources.club}>
            Исторические сведения — по странице клуба и официальному каналу.
          </SourceNote>
        </div>
      </section>
      <section className="trophy-section">
        <div className="container">
          <div className="section-heading">
            <h2>ЗОЛОТЫЕ СЕЗОНЫ</h2>
            <Trophy />
          </div>
          <div className="trophies">
            {["2012", "2013", "2015"].map((year, i) => (
              <div key={year}>
                <span className="eyebrow">0{i + 1} / ЧЕМПИОН ВХЛ</span>
                <strong>{year}</strong>
                <span>ГОД, КОТОРЫЙ МЫ ПОМНИМ</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section container" id="arena">
        <div className="section-heading">
          <div>
            <span className="eyebrow blue-text">НАШ ДОМ</span>
            <h2>ЛЁД. ТРИБУНЫ. ТОРОС.</h2>
          </div>
          <MapPin />
        </div>
        <div className="arena-grid">
          <div className="arena-photo">
            <img
              src={asset("/images/selfie.jpg")}
              alt="Торос на льду после матча; иллюстрация атмосферы, не фото домашней арены"
              loading="lazy"
            />
            <span>КОМАНДА НА ЛЬДУ · ФОТО ИЗ ВОРОНЕЖА</span>
          </div>
          <Card className="arena-info">
            <span className="eyebrow blue-text">КОНТАКТЫ КЛУБА</span>
            <h3>
              Нефтекамск,
              <br />
              Ленина, 19Д
            </h3>
            <p>
              Адрес клуба по данным ВХЛ. Режим работы касс и условия посещения
              уточняйте перед поездкой.
            </p>
            <a className="text-link" href="tel:+73478355423">
              +7 (34783) 5-54-23
              <ArrowUpRight />
            </a>
            <Button asChild>
              <a
                href="https://yandex.ru/maps/?text=Нефтекамск%20Ленина%2019Д"
                target="_blank"
                rel="noreferrer"
              >
                Открыть на карте
                <ArrowUpRight />
              </a>
            </Button>
            <SourceNote>Контактные данные клуба.</SourceNote>
          </Card>
        </div>
      </section>
      <div className="inline-banner container">
        <div>
          <span className="eyebrow">БУДУЩЕЕ НАЧИНАЕТСЯ С ПЕРВОГО ШАГА</span>
          <h2>ХОККЕЙНАЯ ШКОЛА «ТОРОС»</h2>
        </div>
        <Button asChild>
          <Link to="/school">
            Узнать больше
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </>
  );
}
