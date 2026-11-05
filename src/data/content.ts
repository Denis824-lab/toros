export const sources = {
  roster: "https://www.vhlru.ru/teams/390/",
  club: "https://hctoros.ru/club/",
  telegram: "https://t.me/toros_hockeyclub",
  tickets: "https://tickets.hctoros.ru/",
  league: "https://www.vhlru.ru/teams/",
};
export type Player = {
  number: number;
  name: string;
  surname: string;
  position: "Вратарь" | "Защитник" | "Нападающий";
  birthday: string;
};
export const players: Player[] = [
  {
    number: 1,
    name: "Илья",
    surname: "Елин",
    position: "Вратарь",
    birthday: "08.09.2005",
  },
  {
    number: 31,
    name: "Егор",
    surname: "Бай",
    position: "Вратарь",
    birthday: "30.06.2005",
  },
  {
    number: 40,
    name: "Иван",
    surname: "Ананьев",
    position: "Вратарь",
    birthday: "24.07.2009",
  },
  {
    number: 9,
    name: "Григорий",
    surname: "Орлов",
    position: "Защитник",
    birthday: "12.03.2003",
  },
  {
    number: 19,
    name: "Никита",
    surname: "Жихарев",
    position: "Защитник",
    birthday: "19.07.2004",
  },
  {
    number: 24,
    name: "Заур",
    surname: "Курбанов",
    position: "Защитник",
    birthday: "24.03.2003",
  },
  {
    number: 36,
    name: "Егор",
    surname: "Гунькин",
    position: "Защитник",
    birthday: "22.10.2005",
  },
  {
    number: 46,
    name: "Фёдор",
    surname: "Елсуков",
    position: "Защитник",
    birthday: "20.02.2005",
  },
  {
    number: 48,
    name: "Артур",
    surname: "Хафзетдинов",
    position: "Защитник",
    birthday: "04.07.2006",
  },
  {
    number: 62,
    name: "Никита",
    surname: "Димитров",
    position: "Защитник",
    birthday: "12.01.2003",
  },
  {
    number: 76,
    name: "Дмитрий",
    surname: "Пыхтин",
    position: "Защитник",
    birthday: "20.01.2006",
  },
  {
    number: 7,
    name: "Никита",
    surname: "Скоропад",
    position: "Нападающий",
    birthday: "02.04.2003",
  },
  {
    number: 10,
    name: "Василий",
    surname: "Филяев",
    position: "Нападающий",
    birthday: "08.01.1999",
  },
  {
    number: 14,
    name: "Александр",
    surname: "Чёрный",
    position: "Нападающий",
    birthday: "01.04.2001",
  },
  {
    number: 17,
    name: "Данила",
    surname: "Ткач",
    position: "Нападающий",
    birthday: "08.04.2004",
  },
  {
    number: 22,
    name: "Олег",
    surname: "Седанцов",
    position: "Нападающий",
    birthday: "10.02.2003",
  },
  {
    number: 23,
    name: "Дмитрий",
    surname: "Сидляров",
    position: "Нападающий",
    birthday: "14.12.1994",
  },
  {
    number: 25,
    name: "Тимур",
    surname: "Валеев",
    position: "Нападающий",
    birthday: "22.02.2002",
  },
  {
    number: 28,
    name: "Булат",
    surname: "Ахсянов",
    position: "Нападающий",
    birthday: "20.10.2005",
  },
  {
    number: 44,
    name: "Николай",
    surname: "Хворов",
    position: "Нападающий",
    birthday: "24.06.2004",
  },
  {
    number: 55,
    name: "Глеб",
    surname: "Кузьмин",
    position: "Нападающий",
    birthday: "05.01.1997",
  },
  {
    number: 59,
    name: "Прохор",
    surname: "Корбит",
    position: "Нападающий",
    birthday: "28.05.2002",
  },
  {
    number: 63,
    name: "Михаил",
    surname: "Царегородцев",
    position: "Нападающий",
    birthday: "16.03.2006",
  },
  {
    number: 71,
    name: "Павел",
    surname: "Волокитин",
    position: "Нападающий",
    birthday: "18.06.2002",
  },
  {
    number: 93,
    name: "Руслан",
    surname: "Гимбатов",
    position: "Нападающий",
    birthday: "18.02.2004",
  },
  {
    number: 97,
    name: "Матвей",
    surname: "Бабенко",
    position: "Нападающий",
    birthday: "28.10.2005",
  },
];
export const coaches = [
  { name: "Николай Воеводин", role: "Главный тренер", since: "2026" },
  { name: "Андрей Шефер", role: "Тренер", since: "2024" },
  { name: "Евгений Бобарико", role: "Тренер", since: "2026" },
];
export type Match = {
  id: string;
  date: string;
  time: string;
  home: string;
  away: string;
  city: string;
  score?: string;
  source: string;
};
export const matches: Match[] = [
  {
    id: "buran",
    date: "2026-11-04",
    time: "21:00",
    home: "Буран",
    away: "Торос",
    city: "Воронеж",
    score: "0 : 2",
    source: "https://t.me/toros_hockeyclub/16802",
  },
  {
    id: "tambov",
    date: "2026-11-06",
    time: "20:30",
    home: "Тамбов",
    away: "Торос",
    city: "Тамбов",
    source: sources.roster,
  },
  {
    id: "dizel",
    date: "2026-11-08",
    time: "19:00",
    home: "Дизель",
    away: "Торос",
    city: "Пенза",
    source: sources.roster,
  },
];
export type Article = {
  slug: string;
  title: string;
  category: "Команда" | "Клуб" | "Спортшкола";
  date: string;
  image: string;
  imageAlt: string;
  lead: string;
  body: string[];
  source: string;
  credit: string;
};
export const articles: Article[] = [
  {
    slug: "pobeda-v-voronezhe",
    title: "Начинаем выезд с победы",
    category: "Команда",
    date: "04.11.2026",
    image: "/images/match.jpg",
    imageAlt: "Торос в бело-зелёной форме в матче с Бураном",
    lead: "Две шайбы и сухой матч в Воронеже. «Торос» начинает выездное турне победой над «Бураном» — 2:0.",
    body: [
      "4 ноября «Торос» встретился с «Бураном» в Воронеже. Матч завершился со счётом 0:2 в пользу нефтекамской команды. Обе шайбы были заброшены в первом периоде.",
      "В официальном канале клуба опубликованы обзор встречи, комментарии после матча и фотографии. Следующие встречи выездной серии — с «Тамбовом» и «Дизелем».",
    ],
    source: "https://t.me/toros_hockeyclub/16802",
    credit: "Фото: ХК «Буран», официальный канал ХК «Торос»",
  },
  {
    slug: "massovye-kataniya",
    title: "Встречаемся на льду",
    category: "Клуб",
    date: "05.11.2026",
    image: "/images/school.webp",
    imageAlt: "Иллюстрация тренировки на ледовой арене",
    lead: "Клуб приглашает на массовые катания 5 и 6 ноября. Сеансы на крытом тренировочном катке — с 19:00 до 20:00.",
    body: [
      "В анонсе клуба указаны сеансы 5 и 6 ноября с 19 до 20 часов на крытом тренировочном катке. Работают прокат и заточка коньков. Касса и выдача коньков открываются за час до сеанса.",
      "Актуальные условия, стоимость и возможные изменения уточняйте в официальном объявлении клуба. Изображение на этой странице — демонстрационная иллюстрация.",
    ],
    source: "https://t.me/toros_hockeyclub/16818",
    credit: "Изображение: сгенерированная иллюстрация",
  },
  {
    slug: "komanda-posle-matcha",
    title: "Одна команда. Один город.",
    category: "Команда",
    date: "04.11.2026",
    image: "/images/selfie.jpg",
    imageAlt: "Командное селфи Тороса после матча в Воронеже",
    lead: "Победное селфи со льда и эмоции команды после первого матча выездного турне.",
    body: [
      "После победы над «Бураном» клуб поделился командным селфи и поблагодарил Нефтекамск за поддержку.",
      "Больше фотографий, видео из раздевалки и комментариев игроков — в официальном канале «Тороса».",
    ],
    source: "https://t.me/toros_hockeyclub/16817",
    credit: "Фото: официальный канал ХК «Торос»",
  },
  {
    slug: "hokkeynaya-shkola",
    title: "Твой путь в хоккей",
    category: "Спортшкола",
    date: "",
    image: "/images/school.webp",
    imageAlt: "Демонстрационная иллюстрация юного хоккеиста",
    lead: "При «Торосе» работает детско-юношеская спортивная школа. Собрали памятку для родителей, которые хотят познакомить ребёнка с хоккеем.",
    body: [
      "Хоккейная школа — часть клубной жизни «Тороса». Информацию о текущем наборе, возрастных группах, тренировках и необходимых документах нужно уточнить непосредственно у школы.",
      "В разделе «Спортшкола» подготовлена памятка: что спросить перед первым занятием и какие вопросы обсудить с тренером. Приём заявлений через это демо не ведётся.",
    ],
    source: sources.club,
    credit: "Изображение: сгенерированная иллюстрация",
  },
];
export const clubs = [
  {
    name: "Торос",
    city: "Нефтекамск",
    tag: "ВХЛ",
    code: "ТРС",
    link: sources.roster,
  },
  {
    name: "Салават Юлаев",
    city: "Уфа",
    tag: "КХЛ",
    code: "СЮ",
    link: "https://hcsalavat.ru/",
  },
  {
    name: "Буран",
    city: "Воронеж",
    tag: "ВХЛ",
    code: "БУР",
    link: sources.league,
  },
  {
    name: "Тамбов",
    city: "Тамбов",
    tag: "ВХЛ",
    code: "ТАМ",
    link: sources.league,
  },
  {
    name: "Дизель",
    city: "Пенза",
    tag: "ВХЛ",
    code: "ДЗЛ",
    link: sources.league,
  },
  {
    name: "Югра",
    city: "Ханты-Мансийск",
    tag: "ВХЛ",
    code: "ЮГР",
    link: sources.league,
  },
];
