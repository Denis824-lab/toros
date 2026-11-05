import { asset } from "../lib/assets";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Ticket,
  CalendarDays,
  MapPin,
  Download,
  Check,
  ClipboardList,
} from "lucide-react";
import { PageHeading, SourceNote } from "../components/layout";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { sources } from "../data/content";
const ticketFaq = [
  [
    "Где покупать билеты?",
    "Используйте билетный сервис клуба по ссылке на этой странице. Здесь нет оплаты и оформления заказа.",
  ],
  [
    "Продажа уже открыта?",
    "При проверке 5 ноября билетный сервис сообщал, что онлайн-продажа не производится. Актуальное состояние проверяйте на самом сервисе.",
  ],
  [
    "Как узнать о домашней серии?",
    "Следите за календарём ВХЛ и объявлениями официального канала клуба. В демо показана только проверенная выборка ближайших матчей.",
  ],
  [
    "Где найти правила возврата?",
    "Условия покупки, возврата и прохода на арену необходимо проверять у билетного оператора и клуба перед оплатой.",
  ],
];
function Faq({ items }: { items: string[][] }) {
  return (
    <Accordion type="single" collapsible className="faq">
      {items.map(([q, a], i) => (
        <AccordionItem key={q} value={String(i)}>
          <AccordionTrigger>{q}</AccordionTrigger>
          <AccordionContent>{a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
export function Tickets() {
  return (
    <>
      <PageHeading
        label="Билеты"
        title="ТВОЁ МЕСТО НА ТРИБУНЕ"
        description="Хоккей ближе, когда ты рядом. Вся информация для встречи с командой."
      />
      <section className="container section page-section">
        <div className="tickets-feature">
          <div>
            <span className="eyebrow green-text">
              ДОМАШНИЙ ЛЁД · ЖИВЫЕ ЭМОЦИИ
            </span>
            <h2>
              ПРИХОДИ.
              <br />
              ПОДДЕРЖИ.
              <br />
              ПОЧУВСТВУЙ.
            </h2>
            <p>Билеты оформляются в отдельном сервисе клуба.</p>
            <Button className="green-button" asChild>
              <a href={sources.tickets} target="_blank" rel="noreferrer">
                <Ticket />
                Билетный сервис
                <ArrowUpRight />
              </a>
            </Button>
            <div className="sales-status">
              <span />
              На 05.11.2026 онлайн-продажа не открыта
            </div>
          </div>
          <img
            src={asset("/images/hero.webp")}
            alt="Демонстрационная иллюстрация хоккеиста Тороса"
          />
        </div>
        <div className="steps-grid">
          {[
            [
              CalendarDays,
              "Выбери матч",
              "Сверь дату и начало встречи в официальном календаре.",
            ],
            [
              Ticket,
              "Проверь продажу",
              "Открой билетный сервис клуба и доступные мероприятия.",
            ],
            [
              MapPin,
              "Встретимся на арене",
              "Условия прохода и время открытия уточни у клуба.",
            ],
          ].map(([Icon, title, text], i) => {
            const I = Icon as typeof Ticket;
            return (
              <Card key={i} className="step-card">
                <span className="step-index">0{i + 1}</span>
                <I />
                <h3>{title as string}</h3>
                <p>{text as string}</p>
              </Card>
            );
          })}
        </div>
        <div className="faq-section">
          <div>
            <span className="eyebrow blue-text">ПЕРЕД МАТЧЕМ</span>
            <h2>ЕСТЬ ВОПРОС?</h2>
            <p className="muted">Полезная информация о билетах и посещении.</p>
            <Button asChild variant="outline">
              <Link to="/calendar">
                Календарь матчей
                <ArrowRight />
              </Link>
            </Button>
          </div>
          <Faq items={ticketFaq} />
        </div>
        <SourceNote href={sources.tickets}>
          Демо не продаёт билеты и не принимает платежи.
        </SourceNote>
      </section>
    </>
  );
}
export function School() {
  function downloadMemo() {
    const text =
      "Памятка родителям — хоккейная школа\n\nУточните у школы:\n1. Какие возрастные группы принимают детей?\n2. Когда проходит просмотр или первое знакомство?\n3. Какие медицинские документы нужны?\n4. Какую экипировку подготовить?\n5. Как устроено расписание и как связаться с тренером?\n\nАдрес клуба по ВХЛ: Нефтекамск, Ленина, 19Д.\nОфициальный канал: https://t.me/toros_hockeyclub\nЭто общая памятка, не официальные условия приёма.\n";
    const url = URL.createObjectURL(
      new Blob(["\ufeff" + text], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "Памятка-родителям-Торос.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <>
      <PageHeading
        label="Спортшкола"
        title="ТВОЙ ПУТЬ В ХОККЕЙ"
        description="Первая тренировка может стать началом большой истории."
      />
      <section className="school-hero">
        <img
          src={asset("/images/school.webp")}
          alt="Демонстрационная иллюстрация юного хоккеиста"
        />
        <div className="container">
          <span className="eyebrow">ДЕТСКО-ЮНОШЕСКАЯ СПОРТИВНАЯ ШКОЛА</span>
          <h2>
            ПЕРВЫЙ ЛЁД.
            <br />
            ПЕРВАЯ КОМАНДА.
            <br />
            ТВОЙ ХОККЕЙ.
          </h2>
          <Button asChild className="green-button">
            <a href="#parents">
              Информация родителям
              <ArrowRight />
            </a>
          </Button>
        </div>
      </section>
      <section className="section container" id="parents">
        <div className="club-story">
          <div>
            <span className="eyebrow blue-text">РОДИТЕЛЯМ</span>
            <h2>С ЧЕГО НАЧАТЬ</h2>
          </div>
          <div>
            <p className="large-copy">
              При клубе работает детско-юношеская спортивная школа.
            </p>
            <p>
              Перед первым занятием свяжитесь со школой: уточните текущий набор,
              возрастную группу, порядок просмотра и необходимые документы. Демо
              не объявляет набор и не принимает заявления.
            </p>
            <Button variant="outline" onClick={downloadMemo}>
              <Download />
              Скачать памятку
            </Button>
          </div>
        </div>
        <div className="steps-grid">
          {[
            [
              "01",
              "Познакомьтесь со школой",
              "Уточните, какие группы открыты и как проходит первое знакомство с тренером.",
            ],
            [
              "02",
              "Подготовьтесь к занятию",
              "Обсудите экипировку и медицинские документы непосредственно со школой.",
            ],
            [
              "03",
              "Сделайте первый шаг",
              "Договоритесь о времени посещения. Начните с интереса ребёнка к игре.",
            ],
          ].map(([n, t, d]) => (
            <Card className="step-card" key={n}>
              <span className="step-index">{n}</span>
              <Check />
              <h3>{t}</h3>
              <p>{d}</p>
            </Card>
          ))}
        </div>
        <div className="faq-section">
          <div>
            <span className="eyebrow blue-text">ПОЛЕЗНО ЗНАТЬ</span>
            <h2>
              ПЕРЕД ПЕРВОЙ
              <br />
              ТРЕНИРОВКОЙ
            </h2>
          </div>
          <Faq
            items={[
              [
                "С какого возраста принимают детей?",
                "Возрастные группы и условия текущего набора нужно уточнить в школе. Непроверенные возрастные ограничения в демо не публикуются.",
              ],
              [
                "Нужна ли собственная экипировка?",
                "Список экипировки, возможность её предоставления и требования безопасности уточняйте у тренера перед посещением.",
              ],
              [
                "Можно записаться через сайт?",
                "В демонстрационной версии приём заявлений отключён. Для начала свяжитесь с клубом по официальным контактам.",
              ],
              [
                "Где найти контакты?",
                "Адрес клуба по данным ВХЛ: Нефтекамск, ул. Ленина, 19Д. Телефон клуба: +7 (34783) 5-54-23. Попросите соединить со спортивной школой.",
              ],
            ]}
          />
        </div>
        <div className="inline-banner">
          <div>
            <ClipboardList />
            <h2>ГОТОВЫ ПОЗНАКОМИТЬСЯ?</h2>
            <p>Контакты клуба и адрес — в одном месте.</p>
          </div>
          <Button asChild>
            <Link to="/club#arena">
              Контакты
              <ArrowRight />
            </Link>
          </Button>
        </div>
        <SourceNote href={sources.club}>
          Информация о наличии школы — по официальной странице клуба.
          Изображение — иллюстрация.
        </SourceNote>
      </section>
    </>
  );
}
