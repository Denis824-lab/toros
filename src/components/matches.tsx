import { asset } from "../lib/assets";
import {
  CalendarDays,
  MapPin,
  ArrowRight,
  Download,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "./ui/dialog";
import { Link } from "react-router-dom";
import { Logo } from "./layout";
import type { Match } from "../data/content";
import { matches } from "../data/content";
import { formatMatchDate, downloadCalendar } from "../lib/calendar";
const emblems: Record<string, string> = {
  Буран: "buran.png",
  Тамбов: "tambov.png",
  Дизель: "dizel.png",
  Югра: "yugra.png",
  "Салават Юлаев": "salavat.svg",
};
export function TeamMark({ name }: { name: string }) {
  return name === "Торос" ? (
    <Logo />
  ) : (
    <img
      className="club-emblem"
      src={asset("/images/" + emblems[name])}
      alt={`Эмблема ХК «${name}»`}
      width="200"
      height="200"
    />
  );
}
export function MatchDialog({
  match,
  children,
}: {
  match: Match;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="match-dialog">
        <span className="eyebrow">ВХЛ · СЕЗОН 2026/27</span>
        <DialogTitle>
          {match.home} — {match.away}
        </DialogTitle>
        <DialogDescription>
          {formatMatchDate(match.date)} 2026 · {match.city}
        </DialogDescription>
        <div className="match-versus">
          <div>
            <TeamMark name={match.home} />
            <b>{match.home}</b>
          </div>
          <strong>{match.score || match.time}</strong>
          <div>
            <TeamMark name={match.away} />
            <b>{match.away}</b>
          </div>
        </div>
        <p className="muted">
          {match.score
            ? "Матч завершён."
            : "Начало по времени Нефтекамска (UTC+5). Перед поездкой проверьте изменения в официальном расписании."}
        </p>
        <div className="dialog-actions">
          {!match.score && (
            <Button onClick={() => downloadCalendar(match)}>
              <Download />В мой календарь
            </Button>
          )}
          <Button variant="outline" asChild>
            <a href={match.source} target="_blank" rel="noreferrer">
              Официальный источник
              <ArrowUpRight />
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export function MatchRow({ match }: { match: Match }) {
  return (
    <div className="match-row">
      <div className="match-date">
        <strong>{formatMatchDate(match.date)}</strong>
        <span>{match.score ? "ЗАВЕРШЁН" : "ВЫЕЗДНОЙ МАТЧ"}</span>
      </div>
      <div className="match-teams">
        <div>
          <TeamMark name={match.home} />
          <b>{match.home}</b>
        </div>
        <strong className={match.score ? "score" : "time"}>
          {match.score || match.time}
          <small>{!match.score && "UTC+5"}</small>
        </strong>
        <div>
          <TeamMark name={match.away} />
          <b>{match.away}</b>
        </div>
      </div>
      <span className="match-city">
        <MapPin size={14} />
        {match.city}
      </span>
      <MatchDialog match={match}>
        <Button variant="outline" className="match-open">
          О матче
          <ArrowRight />
        </Button>
      </MatchDialog>
    </div>
  );
}
export function NextMatch() {
  const next = matches.find((m) => !m.score)!;
  return (
    <section className="next-match container" aria-label="Ближайший матч">
      <div className="next-label">
        <CalendarDays />
        <h2>
          БЛИЖАЙШИЙ
          <br />
          МАТЧ
        </h2>
      </div>
      <div className="next-pair">
        <TeamMark name={next.home} />
        <strong>{next.home}</strong>
        <span>—</span>
        <Logo />
        <strong>Торос</strong>
      </div>
      <div className="next-date">
        <strong>
          {formatMatchDate(next.date)} · {next.time}
        </strong>
        <span>{next.city} · время Нефтекамска</span>
      </div>
      <Button asChild>
        <Link to="/calendar">
          Все матчи
          <ArrowRight />
        </Link>
      </Button>
    </section>
  );
}
