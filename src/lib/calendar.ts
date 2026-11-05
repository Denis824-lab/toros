import type { Match } from "../data/content";
export const formatMatchDate = (date: string) =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(date + "T12:00:00Z"));
export function downloadCalendar(match: Match) {
  const stamp =
    match.date.replaceAll("-", "") + "T" + match.time.replace(":", "") + "00";
  const start = new Date(match.date + "T" + match.time + ":00+05:00");
  const end = new Date(start.getTime() + 3 * 3600000)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(".000", "");
  const text =
    [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Toros Demo//RU",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:${match.id}-${match.date}@toros-demo`,
      "DTSTAMP:20261105T000000Z",
      `DTSTART;TZID=Asia/Yekaterinburg:${stamp}`,
      `DTEND:${end}`,
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
