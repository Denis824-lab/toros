import { useState } from "react";
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
import { formatMatchDate, downloadCalendar, getMatchStart } from "../lib/calendar";
import SpotlightCard from "./reactbits/SpotlightCard";

const emblems: Record<string, string> = {
  Буран: "buran.png",
  Тамбов: "tambov.png",
  Дизель: "dizel.png",
  Югра: "yugra.png",
  "Салават Юлаев": "salavat.svg",
};
export function TeamMark({ name }: { name: string }) {
  if (name === "Торос") return <Logo />;
  const emblem = emblems[name];
  if (!emblem) return null;

  return (
    <img
      className="club-emblem"
      src={asset("/images/" + emblem)}
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
          {formatMatchDate(match.date, true)} · {match.city}
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
  const venue = match.home === "Торос" ? "ДОМАШНИЙ МАТЧ" : "ВЫЕЗДНОЙ МАТЧ";
  return (
    <div className="match-row">
      <div className="match-date">
        <strong>{formatMatchDate(match.date)}</strong>
        <span>{match.score ? "ЗАВЕРШЁН" : venue}</span>
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
  const [next] = useState(() => {
    const now = Date.now();
    return matches
      .map((match) => ({ match, start: getMatchStart(match).getTime() }))
      .filter(({ match, start }) => !match.score && start >= now)
      .sort((a, b) => a.start - b.start)[0]?.match;
  });
  return (
    <SpotlightCard
      className="next-match container motion-next-match"
      role="region"
      aria-label="Ближайший матч"
      theme="light"
      spotlightColor="rgba(0, 155, 56, 0.35)"
      intensity={1}
      spotlightSize={330}
      proximity={0}
      ambient={false}
      flare={false}
      grain={0}
      borderGlow={0.35}
    >
      <div className="next-label">
        <CalendarDays />
        <h2>
          БЛИЖАЙШИЙ
          <br />
          МАТЧ
        </h2>
      </div>
      {next ? (
        <>
          <div className="next-pair">
            <TeamMark name={next.home} />
            <strong>{next.home}</strong>
            <span>—</span>
            <TeamMark name={next.away} />
            <strong>{next.away}</strong>
          </div>
          <div className="next-date">
            <strong>
              {formatMatchDate(next.date)} · {next.time}
            </strong>
            <span>{next.city} · время Нефтекамска</span>
          </div>
        </>
      ) : (
        <p className="next-date">Предстоящие матчи пока не добавлены.</p>
      )}
      <Button asChild>
        <Link to="/calendar">
          Все матчи
          <ArrowRight />
        </Link>
      </Button>
    </SpotlightCard>
  );
}
