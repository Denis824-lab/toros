import type { Match } from "../data/content";
export const formatMatchDate = (date: string, includeYear = false) =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: includeYear ? "numeric" : undefined,
    timeZone: "UTC",
  }).format(new Date(date + "T12:00:00Z"));

export const getMatchStart = (match: Match) =>
  new Date(`${match.date}T${match.time}:00+05:00`);

const formatCalendarTimestamp = (date: Date) =>
  date.toISOString().replace(/[-:]/g, "").replace(".000", "");

export function downloadCalendar(match: Match) {
  const start = getMatchStart(match);
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
  const text =
    [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Toros Demo//RU",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:${match.id}-${match.date}@toros-demo`,
      "DTSTAMP:20261105T000000Z",
      `DTSTART:${formatCalendarTimestamp(start)}`,
      `DTEND:${formatCalendarTimestamp(end)}`,
      `SUMMARY:${match.home} — ${match.away}`,
      `LOCATION:${match.city}`,
      `DESCRIPTION:Время Екатеринбурга. Проверьте изменения в официальном календаре.`,
      `URL:${match.source}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n") + "\r\n";
  const href = URL.createObjectURL(
    new Blob([text], { type: "text/calendar;charset=utf-8" }),
  );
  const a = document.createElement("a");
  a.href = href;
  a.download = `toros-${match.date}.ics`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
}
