import { asset } from "../lib/assets";
import { Suspense, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  Ticket,
  ArrowUp,
  ExternalLink,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "./ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { sources } from "../data/content";
import { Magnetic, MotionHeading, SiteCursor } from "./motion";

export function Logo({
  className = "",
  inverse = false,
}: {
  className?: string;
  inverse?: boolean;
}) {
  return (
    <img
      className={`club-logo ${className}`}
      src={asset(inverse ? "/images/toros-inverse.svg" : "/images/toros.svg")}
      alt="ХК Торос"
      width="300"
      height="163"
    />
  );
}
const items = [
  ["/club", "Клуб"],
  ["/team", "Команда"],
  ["/calendar", "Матчи"],
  ["/news", "Новости"],
  ["/school", "Спортшкола"],
];
function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <header className="site-header">
      <div className="demo-ribbon">
        <div className="container">
          ДЕМОНСТРАЦИОННАЯ ВЕРСИЯ <span>•</span> НЕФТЕКАМСК — ГОРОД ХОККЕЯ
        </div>
      </div>
      <div className="container header-row">
        <div className="brand">
          <a
            className="league-brand"
            href="https://www.vhlru.ru/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Всероссийская хоккейная лига — официальный сайт (откроется в новой вкладке)"
          >
            <img
              src={asset("/images/vhl.svg")}
              alt="ВХЛ"
              width="134"
              height="164"
            />
          </a>
          <Link to="/" className="club-brand" aria-label="Торос — главная">
            <Logo inverse />
          </Link>
          <span className="brand-caption">
            ХОККЕЙНЫЙ КЛУБ
            <br />
            ТОРОС
            <br />
            НЕФТЕКАМСК
          </span>
        </div>
        <nav className="desktop-nav" aria-label="Основная навигация">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={`nav-trigger ${pathname.startsWith("/club") ? "current" : ""}`}
                >
                  Клуб
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="dropdown-links">
                    <NavigationMenuLink asChild>
                      <Link to="/club">
                        О клубе <ArrowUpRight />
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/club#arena">
                        Арена и контакты <ArrowUpRight />
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={`nav-trigger ${pathname === "/team" ? "current" : ""}`}
                >
                  Команда
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="dropdown-links">
                    <NavigationMenuLink asChild>
                      <Link to="/team">
                        Игроки <ArrowUpRight />
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to="/team?tab=coaches">
                        Тренерский штаб <ArrowUpRight />
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {items.slice(2).map(([to, label]) => (
            <NavLink
              key={to}
              className={({ isActive }) => (isActive ? "current" : "")}
              to={to}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <Magnetic className="header-ticket-magnet">
          <Button asChild className="ticket-button">
            <Link to="/tickets">
              <Ticket /> <span>Билеты</span>
              <ArrowUpRight />
            </Link>
          </Button>
        </Magnetic>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mobile-menu"
              size="icon"
              aria-label="Открыть меню"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="mobile-sheet">
            <SheetTitle>
              <Logo inverse />
            </SheetTitle>
            <SheetDescription>Нефтекамск — город хоккея</SheetDescription>
            <nav aria-label="Мобильная навигация">
              {[["/", "Главная"], ...items, ["/tickets", "Билеты"]].map(
                ([to, label]) => (
                  <Link to={to} key={to} onClick={() => setOpen(false)}>
                    {label}
                    <ArrowUpRight />
                  </Link>
                ),
              )}
            </nav>
            <p className="muted">Демонстрационная версия нового сайта клуба</p>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Logo inverse />
            <p>
              Нефтекамск.
              <br />
              Город, который живёт хоккеем.
            </p>
            <div className="socials">
              <a href={sources.telegram} target="_blank" rel="noreferrer">
                Telegram <ArrowUpRight />
              </a>
              <a
                href="https://vk.com/hctorosru"
                target="_blank"
                rel="noreferrer"
              >
                ВКонтакте <ArrowUpRight />
              </a>
            </div>
          </div>
          <div>
            <span className="eyebrow">КЛУБ</span>
            <Link to="/club">История и достижения</Link>
            <Link to="/club#arena">Арена и контакты</Link>
          </div>
          <div>
            <span className="eyebrow">НА ЛЬДУ</span>
            <Link to="/team">Состав команды</Link>
            <Link to="/team?tab=coaches">Тренерский штаб</Link>
            <Link to="/calendar">Календарь матчей</Link>
          </div>
          <div>
            <span className="eyebrow">БОЛЕЛЬЩИКАМ</span>
            <Link to="/news">Новости клуба</Link>
            <Link to="/tickets">Билеты</Link>
            <Link to="/school">Спортшкола</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            ТОРОС · НЕФТЕКАМСК · ДЕМО 2026
            <br />
            <span>
              Спортивные сведения проверены 05.11.2026. Фотографии предоставлены
              владельцем проекта.
            </span>
          </p>
          <Link to="/about-demo">
            О демонстрационной версии <ExternalLink size={13} />
          </Link>
          <Button
            className="back-top"
            size="icon"
            variant="ghost"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "instant"
                  : "smooth",
              })
            }
            aria-label="Наверх"
          >
            <ArrowUp />
          </Button>
        </div>
      </div>
    </footer>
  );
}
export function Layout() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() =>
        document.getElementById(hash.slice(1))?.scrollIntoView(),
      );
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return (
    <>
      <a href="#main" className="skip-link">
        Перейти к содержимому
      </a>
      <SiteCursor />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Suspense
          fallback={
            <div className="container loading-page" role="status">
              Загрузка страницы…
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
export function PageHeading({
  label,
  title,
  description,
  children,
}: {
  label: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="page-heading">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">Главная</Link>
          <ChevronDown size={12} />
          <span>{label}</span>
        </div>
        <div className="heading-line">
          <div>
            <span className="eyebrow">ТОРОС · НЕФТЕКАМСК</span>
            <MotionHeading as="h1" lines={[title]} />
          </div>
          {children}
        </div>
        {description && <p className="page-description">{description}</p>}
      </div>
    </div>
  );
}
export function SourceNote({
  href = sources.roster,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <p className="source-note">
      {children}{" "}
      <a href={href} target="_blank" rel="noreferrer">
        Источник <ArrowUpRight size={12} />
      </a>
    </p>
  );
}
