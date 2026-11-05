import { useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  List,
  ArrowUpRight,
} from "lucide-react";
import { PageHeading, SourceNote } from "../components/layout";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { MatchRow, MatchDialog, TeamMark } from "../components/matches";
import { matches, sources } from "../data/content";
export default function Calendar() {
  const [month, setMonth] = useState(10);
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("list");
  const date = new Date(Date.UTC(2026, month, 1));
  const year = date.getUTCFullYear(),
    mon = date.getUTCMonth();
  const label = new Intl.DateTimeFormat("ru-RU", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
  const selected = matches.filter((m) => {
    const d = new Date(m.date + "T12:00:00Z");
    return (
      d.getUTCMonth() === mon &&
      d.getUTCFullYear() === year &&
      (filter === "all" ||
        (filter === "home" ? m.home === "Торос" : m.away === "Торос"))
    );
  });
  const offset = (date.getUTCDay() + 6) % 7,
    days = new Date(Date.UTC(year, mon + 1, 0)).getUTCDate();
  return (
    <>
      <PageHeading
        label="Матч-центр"
        title="КАЛЕНДАРЬ МАТЧЕЙ"
        description="Дома и на выезде. Следите за командой, где бы ни проходила игра."
      >
        <span className="season-tag">ВХЛ · 2026/27</span>
      </PageHeading>
      <section className="section container page-section">
        <div className="calendar-toolbar">
          <div className="month-selector">
            <Button
              size="icon"
              variant="outline"
              aria-label="Предыдущий месяц"
              disabled={month <= 7}
              onClick={() => setMonth(month - 1)}
            >
              <ChevronLeft />
            </Button>
            <h2>{label}</h2>
            <Button
              size="icon"
              variant="outline"
              aria-label="Следующий месяц"
              disabled={month >= 16}
              onClick={() => setMonth(month + 1)}
            >
              <ChevronRight />
            </Button>
          </div>
          <Tabs value={view} onValueChange={setView}>
            <TabsList aria-label="Вид календаря">
              <TabsTrigger value="list">
                <List size={17} />
                Список
              </TabsTrigger>
              <TabsTrigger value="grid">
                <CalendarDays size={17} />
                Месяц
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="filter-row">
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="filter-tabs" aria-label="Место проведения">
              {[
                ["all", "Все матчи"],
                ["home", "Дома"],
                ["away", "На выезде"],
              ].map(([v, l]) => (
                <TabsTrigger key={v} value={v}>
                  {l}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <span className="time-note">Время Нефтекамска · UTC+5</span>
        </div>
        {view === "list" ? (
          selected.length ? (
            <div className="match-list">
              {selected.map((m) => (
                <MatchRow key={m.id} match={m} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <CalendarDays />
              <h3>Матчи ещё не добавлены</h3>
              <p>
                В демо доступны проверенные встречи ноября. Полное расписание —
                на сайте ВХЛ.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setMonth(10);
                  setFilter("all");
                }}
              >
                Вернуться к ноябрю
              </Button>
            </div>
          )
        ) : (
          <>
            <div className="calendar-week">
              {["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <div className="calendar-grid">
              {Array.from(
                { length: Math.ceil((offset + days) / 7) * 7 },
                (_, i) => {
                  const day = i - offset + 1;
                  const match = selected.find(
                    (m) => Number(m.date.slice(-2)) === day,
                  );
                  return (
                    <div
                      className={`calendar-cell ${day === 5 && mon === 10 && year === 2026 ? "today" : ""} ${match ? "has-match" : ""}`}
                      key={i}
                    >
                      {day > 0 && day <= days && (
                        <>
                          <span className="day-number">{day}</span>
                          {match && (
                            <MatchDialog match={match}>
                              <button className="calendar-match">
                                <span className="calendar-marks">
                                  <TeamMark name={match.home} />
                                  <TeamMark name={match.away} />
                                </span>
                                <span>
                                  {match.home} — {match.away}
                                </span>
                                <strong>{match.score || match.time}</strong>
                                <small>
                                  {match.score ? "Завершён" : "На выезде"}
                                </small>
                              </button>
                            </MatchDialog>
                          )}
                        </>
                      )}
                    </div>
                  );
                },
              )}
            </div>
            {!selected.length && (
              <p className="muted calendar-empty">
                Для этого месяца и фильтра нет добавленных матчей.
              </p>
            )}
          </>
        )}
        <SourceNote>
          Показаны подтверждённые встречи 4, 6 и 8 ноября; это выборка, а не
          полный календарь сезона. Время может измениться.
        </SourceNote>
        <div className="inline-banner">
          <div>
            <span className="eyebrow">СЕЗОН ПРОДОЛЖАЕТСЯ</span>
            <h2>ПОЛНОЕ РАСПИСАНИЕ ВХЛ</h2>
          </div>
          <Button variant="outline" asChild>
            <a href={sources.roster} target="_blank" rel="noreferrer">
              На сайт лиги
              <ArrowUpRight />
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
