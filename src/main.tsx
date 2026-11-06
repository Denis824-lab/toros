import { StrictMode, Component, lazy } from "react";
import type { ReactNode, ErrorInfo } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";
import Home from "./pages/Home";
import "./styles.css";
const Team = lazy(() => import("./pages/Team"));
const Calendar = lazy(() => import("./pages/Calendar"));
const News = lazy(() => import("./pages/News"));
const ArticlePage = lazy(() =>
  import("./pages/News").then((m) => ({ default: m.ArticlePage })),
);
const NotFound = lazy(() =>
  import("./pages/News").then((m) => ({ default: m.NotFound })),
);
const Club = lazy(() => import("./pages/Club"));
const Tickets = lazy(() =>
  import("./pages/Fans").then((m) => ({ default: m.Tickets })),
);
const School = lazy(() =>
  import("./pages/Fans").then((m) => ({ default: m.School })),
);
const AboutDemo = lazy(() => import("./pages/AboutDemo"));
class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(
      "Ошибка отображения сайта",
      error.message,
      info.componentStack,
    );
  }
  render() {
    return this.state.failed ? (
      <div className="empty-state not-found">
        <h1>НЕ УДАЛОСЬ ОТКРЫТЬ СТРАНИЦУ</h1>
        <p>Обновите страницу. Если ошибка повторяется, вернитесь на главную.</p>
        <a className="text-link" href={import.meta.env.BASE_URL}>
          На главную
        </a>
      </div>
    ) : (
      this.props.children
    );
  }
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="team" element={<Team />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="club" element={<Club />} />
            <Route path="news" element={<News />} />
            <Route path="news/:slug" element={<ArticlePage />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="school" element={<School />} />
            <Route path="about-demo" element={<AboutDemo />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
