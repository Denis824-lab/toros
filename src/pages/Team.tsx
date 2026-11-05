import { media } from "../data/media";
import { asset } from "../lib/assets";
import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Search,
  ArrowUpRight,
  ArrowRight,
  Shirt,
  UserRound,
  X,
} from "lucide-react";
import { PageHeading, SourceNote } from "../components/layout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { players, coaches, sources } from "../data/content";
import type { Player } from "../data/content";

function PlayerCard({ player: p }: { player: Player }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="player-card"
          aria-label={`Профиль: ${p.name} ${p.surname}, номер ${p.number}`}
        >
          <div className="player-visual">
            <span className="player-number">{p.number}</span>
            <Shirt className="player-shirt" strokeWidth={0.8} />
            <span className="portrait-note">ПОРТРЕТ УТОЧНЯЕТСЯ</span>
            <span className="player-card-arrow">
              <ArrowUpRight />
            </span>
          </div>
          <div className="player-info">
            <span className="eyebrow">{p.position}</span>
            <h3>
              <span>{p.name}</span>
              {p.surname}
            </h3>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="player-dialog">
        <div className="player-dialog-art">
          <span>{p.number}</span>
          <Shirt strokeWidth={0.8} />
        </div>
        <div>
          <span className="eyebrow blue-text">ТОРОС · {p.position}</span>
          <DialogTitle>
            {p.name}
            <br />
            {p.surname}
          </DialogTitle>
          <DialogDescription>
            Состав по данным ВХЛ на 5 ноября 2026 года
          </DialogDescription>
          <dl className="profile-facts">
            <div>
              <dt>Игровой номер</dt>
              <dd>{p.number}</dd>
            </div>
            <div>
              <dt>Амплуа</dt>
              <dd>{p.position}</dd>
            </div>
            <div>
              <dt>Дата рождения</dt>
              <dd>{p.birthday}</dd>
            </div>
          </dl>
          <p className="muted small">
            Портрет и индивидуальная статистика будут добавлены после проверки
            материалов клуба.
          </p>
          <Button variant="outline" asChild>
            <a href={sources.roster} target="_blank" rel="noreferrer">
              Состав на сайте ВХЛ
              <ArrowUpRight />
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default function Team() {
  const [params, setParams] = useSearchParams();
  const tab = params.get("tab") === "coaches" ? "coaches" : "players";
  const [position, setPosition] = useState("Все");
  const [query, setQuery] = useState("");
  const filtered = players.filter(
    (p) =>
      (position === "Все" || p.position === position) &&
      `${p.name} ${p.surname} ${p.number}`
        .toLowerCase()
        .replaceAll("ё", "е")
        .includes(query.trim().toLowerCase().replaceAll("ё", "е")),
  );
  return (
    <>
      <PageHeading
        label="Команда"
        title="КОМАНДА ГОРОДА"
        description="Имена, номера, характер. Люди, которые выходят на лёд за Нефтекамск."
      >
        <span className="season-tag">СЕЗОН 2026/27</span>
      </PageHeading>
      <section className="container section page-section">
        <Tabs
          value={tab}
          onValueChange={(v) => setParams(v === "coaches" ? { tab: v } : {})}
        >
          <TabsList className="page-tabs" aria-label="Раздел команды">
            <TabsTrigger value="players">
              Игроки <span>{players.length}</span>
            </TabsTrigger>
            <TabsTrigger value="coaches">Тренерский штаб</TabsTrigger>
          </TabsList>
          <TabsContent value="players">
            <div className="filter-row">
              <Tabs value={position} onValueChange={setPosition}>
                <TabsList className="filter-tabs" aria-label="Амплуа игроков">
                  {[
                    ["Все", "Все"],
                    ["Вратарь", "Вратари"],
                    ["Защитник", "Защитники"],
                    ["Нападающий", "Нападающие"],
                  ].map(([v, l]) => (
                    <TabsTrigger key={v} value={v}>
                      {l}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <label className="search-field">
                <Search size={17} />
                <span className="sr-only">
                  Найти игрока по имени или номеру
                </span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Имя или номер"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    aria-label="Очистить поиск"
                  >
                    <X size={15} />
                  </button>
                )}
              </label>
            </div>
            <div className="results-line">
              <span>{filtered.length} игроков</span>
              <span>Проверено 05.11.2026 · ВХЛ</span>
            </div>
            {filtered.length ? (
              <div className="roster-grid">
                {filtered.map((p) => (
                  <PlayerCard key={p.number} player={p} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Search />
                <h3>Игроков не найдено</h3>
                <p>Попробуйте другую фамилию, номер или амплуа.</p>
                <Button
                  onClick={() => {
                    setQuery("");
                    setPosition("Все");
                  }}
                >
                  Сбросить фильтры
                </Button>
              </div>
            )}
            <SourceNote>
              Основной состав на 05.11.2026. Сергей Колесников, №88, указан ВХЛ
              отдельно в списке травмированных.
            </SourceNote>
          </TabsContent>
          <TabsContent value="coaches">
            <div className="coach-intro">
              <div>
                <span className="eyebrow green-text">
                  ЗА КАЖДЫМ МАТЧЕМ — РАБОТА КОМАНДЫ
                </span>
                <h2>
                  ХАРАКТЕР.
                  <br />
                  СИСТЕМА.
                  <br />
                  ДВИЖЕНИЕ.
                </h2>
              </div>
              <img src={asset(media.team)} alt="Игроки Тороса у борта" />
            </div>
            <div className="coaches-grid">
              {coaches.map((c, i) => (
                <Card className="coach-card" key={c.name}>
                  <div className="coach-portrait">
                    <UserRound strokeWidth={1} />
                    <span>ПОРТРЕТ УТОЧНЯЕТСЯ</span>
                    <b>0{i + 1}</b>
                  </div>
                  <span className="eyebrow blue-text">{c.role}</span>
                  <h3>{c.name}</h3>
                  <p className="muted">В клубе с {c.since} года</p>
                </Card>
              ))}
            </div>
            <SourceNote href="https://hctoros.ru/team/">
              Тренерский штаб по странице команды сезона 2026/27; главный тренер
              также подтверждён ВХЛ.
            </SourceNote>
          </TabsContent>
        </Tabs>
      </section>
      <div className="inline-banner container">
        <div>
          <span className="eyebrow">ВМЕСТЕ НА ТРИБУНАХ</span>
          <h2>УВИДИМСЯ НА МАТЧЕ</h2>
        </div>
        <Button asChild>
          <Link to="/calendar">
            Календарь
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </>
  );
}
