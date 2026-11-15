import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Icon } from "./Icon";
import DailyGoal from "./DailyGoal";
import QuizPage from "./QuizPage";
import Categories from "./Categories";
import { categories, FEATURED_COUNT, quizPath } from "./categoryData";
import NotFound from "./NotFound";
import { bank } from "./questions";
import Leaderboard from "./Leaderboard";
import Settings from "./Settings";
import { START_POINTS, buildBoard, fmt } from "./leaderboardData";

function MenuBars() {
  return (
    <span className="menu-bars" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

const navItems = [
  { label: "Home", icon: "home", path: "/" },
  { label: "Quiz", icon: "quiz", path: "/quiz" },
  { label: "Leaderboard", icon: "trophy", path: "/leaderboard" },
  { label: "Settings", icon: "settings", path: "/settings" },
];

// which sidebar item is highlighted for the current URL
function navFor(pathname, from) {
  if (pathname === "/") return "Home";
  if (pathname.startsWith("/quiz")) return "Quiz";
  if (pathname.startsWith("/leaderboard")) return "Leaderboard";
  if (pathname.startsWith("/settings")) return "Settings";
  if (pathname.startsWith("/categories")) return from === "/quiz" ? "Quiz" : "Home"; // highlight where you came from
  return null;
}

function titleFor(pathname) {
  const page = (name) => `${name} · Quizbolt`;
  if (pathname === "/") return page("Home");
  if (pathname === "/quiz") return page("Quiz");
  if (pathname === "/quiz/quick") return page("Quick Play");
  if (pathname.startsWith("/quiz/")) {
    const name = pathname.split("/")[2];
    return page(`${name.charAt(0).toUpperCase()}${name.slice(1)} quiz`);
  }
  if (pathname.startsWith("/categories")) return page("All categories");
  if (pathname.startsWith("/leaderboard")) return page("Leaderboard");
  if (pathname.startsWith("/settings")) return page("Settings");
  return page("Page not found");
}

const modes = [
  {
    title: "Quick Play",
    text: "10 questions · 5 min",
    icon: "bolt",
    color: "yellow",
    tag: "Popular",
  },
  {
    title: "Solo Challenge",
    text: "Pick a topic & level",
    icon: "star",
    color: "pink",
    tag: "",
  },
  {
    title: "Play with Friends",
    text: "Create or join a room",
    icon: "users",
    color: "blue",
    tag: "",
  },
];

const initialNotifications = [
  {
    id: 1,
    emoji: "🏆",
    type: "notifRank",
    color: "yellow",
    title: "You moved up 2 ranks",
    text: "You're now #8 on this week's leaderboard.",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    emoji: "🔥",
    type: "notifStreak",
    color: "peach",
    title: "7 day streak!",
    text: "Play one quiz today to keep it going.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 4,
    emoji: "👋",
    type: "notifInvites",
    color: "pink",
    title: "Noah Kim invited you",
    text: "Join his room and play together.",
    time: "Yesterday",
    unread: false,
  },
];

const DEFAULT_PREFS = {
  questionTime: 20,
  reduceMotion: false,
  notifRank: true,
  notifStreak: true,
  notifInvites: true,
};
const DEFAULT_NAME = "Jamie Doe";

function loadPrefs() {
  try {
    const saved = JSON.parse(localStorage.getItem("quiz-prefs"));
    // keep only known settings, so keys from older versions don't linger in storage
    const merged = { ...DEFAULT_PREFS };
    for (const key of Object.keys(DEFAULT_PREFS)) {
      if (saved && key in saved) merged[key] = saved[key];
    }
    if (![15, 20, 30].includes(merged.questionTime)) merged.questionTime = DEFAULT_PREFS.questionTime;
    return merged;
  } catch {
    return DEFAULT_PREFS;
  }
}

function initialsOf(name) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const letters = words.length > 1 ? words[0][0] + words[words.length - 1][0] : (words[0] ?? "?").slice(0, 2);
  return letters.toUpperCase();
}

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem("quiz-theme") === "dark");
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const cameFrom = location.state?.from ?? "/"; // the page that opened All categories
  const [searchParams] = useSearchParams();
  // the search box lives in the URL (/categories?q=sci) so it survives refresh and Back
  const query = pathname === "/categories" ? (searchParams.get("q") ?? "") : "";
  const [sidebarOpen, setSidebarOpen] = useState(
    () => localStorage.getItem("quiz-sidebar") !== "closed",
  );
  const [category, setCategory] = useState("Science");
  const [quizzesDone, setQuizzesDone] = useState(3);
  const [points, setPoints] = useState(START_POINTS);
  const [name, setName] = useState(() => localStorage.getItem("quiz-name") || DEFAULT_NAME);
  const [prefs, setPrefs] = useState(loadPrefs);
  const navActive = navFor(pathname, cameFrom);
  const initials = initialsOf(name);
  const firstName = name.trim().split(/\s+/)[0];
  const dailyGoal = 5;
  const [notifOpen, setNotifOpen] = useState(false);
  const [showDot, setShowDot] = useState(true);
  const [notifications, setNotifications] = useState(initialNotifications);
  const notifRef = useRef(null);
  const readTimer = useRef(null);
  const visibleNotifications = notifications.filter((n) => prefs[n.type]);
  const newCount = visibleNotifications.filter((n) => n.unread).length;
  const weekly = buildBoard("week", points, "everyone", quizzesDone, initials);
  const leaders = weekly.rows.slice(0, 3);
  const selectedCategory = categories.find((c) => c.name === category) ?? categories[0];
  const selectedCount = bank[selectedCategory.name].length;

  function startQuickPlay() {
    navigate(quizPath({ kind: "quick" }));
  }

  function startCategoryQuiz(name) {
    navigate(quizPath({ kind: "category", category: name }));
  }

  // All categories remembers which page opened it, so its Back link and the nav highlight match
  function openCategories() {
    navigate("/categories", { state: { from: pathname.startsWith("/quiz") ? "/quiz" : "/" } });
  }

  // typing in the top search box filters the categories; from any other page it opens All categories
  function onSearch(value) {
    const url = value ? `/categories?q=${encodeURIComponent(value)}` : "/categories";
    if (pathname === "/categories") {
      navigate(url, { replace: true, state: location.state });
    } else {
      navigate(url, { state: { from: pathname.startsWith("/quiz") ? "/quiz" : "/" } });
    }
  }

  function completeQuiz({ points: earned }) {
    setQuizzesDone((n) => n + 1);
    setPoints((p) => p + earned);
  }

  function setPref(key, value) {
    setPrefs((p) => ({ ...p, [key]: value }));
  }

  function resetPrefs() {
    setPrefs(DEFAULT_PREFS);
    setDark(false);
    setSidebarOpen(true);
  }

  function resetProgress() {
    setPoints(START_POINTS);
    setQuizzesDone(3);
  }

  function openNotifications() {
    clearTimeout(readTimer.current);
    setNotifOpen(true);
    setShowDot(false);
  }

  function closeNotifications() {
    setNotifOpen(false);
    // mark everything as read once the panel has finished closing
    readTimer.current = setTimeout(() => {
      setNotifications((list) => list.map((n) => ({ ...n, unread: false })));
    }, 300);
  }

  useEffect(() => {
    localStorage.setItem("quiz-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  useEffect(() => {
    document.title = titleFor(pathname);
  }, [pathname]);

  useEffect(() => {
    localStorage.setItem("quiz-prefs", JSON.stringify(prefs));
  }, [prefs]);

  useEffect(() => {
    localStorage.setItem("quiz-name", name);
  }, [name]);

  useEffect(() => {
    localStorage.setItem("quiz-sidebar", sidebarOpen ? "open" : "closed");
  }, [sidebarOpen]);

  useEffect(() => {
    if (!notifOpen) return;
    const onPointerDown = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) closeNotifications();
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeNotifications();
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [notifOpen]);

  return (
    <div className={`app${dark ? " dark" : ""}${sidebarOpen ? "" : " sidebar-collapsed"}${prefs.reduceMotion ? " reduce-motion" : ""}`}>
      <aside className="sidebar" id="app-sidebar" inert={!sidebarOpen}>
        <div className="sidebar-head">
          <div className="brand">
            <span className="brand-mark">
              <Icon name="bolt" size={20} filled />
            </span>
            <span>
              Quizbolt<span className="brand-dot">.</span>
            </span>
          </div>
          <button
            className="round-btn menu-toggle is-open sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <MenuBars />
          </button>
        </div>
        <nav className="side-nav" aria-label="Main navigation">
          <p className="nav-label">MENU</p>
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={navActive === item.label ? "nav-item active" : "nav-item"}
              aria-current={navActive === item.label ? "page" : undefined}
            >
              <Icon name={item.icon} size={19} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="streak-card">
          <div className="streak-icon">🔥</div>
          <div>
            <strong>7 day streak!</strong>
            <p>Keep it going</p>
          </div>
        </div>
        <div className="sidebar-footer">
          <button className="profile-mini" onClick={() => navigate("/settings")} aria-label="Open profile settings">
            <span className="avatar avatar-j">{initials}</span>
            <span>
              <strong>{name}</strong>
              <small>Level 12</small>
            </span>
            <span className="more">•••</span>
          </button>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <div className="mobile-brand brand">
            <span className="brand-mark">
              <Icon name="bolt" size={17} filled />
            </span>
            <span>
              Quizbolt<span className="brand-dot">.</span>
            </span>
          </div>
          <div className="topbar-left">
            <button
              className="round-btn menu-toggle topbar-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
              aria-expanded={sidebarOpen}
              aria-controls="app-sidebar"
              tabIndex={sidebarOpen ? -1 : 0}
            >
              <MenuBars />
            </button>
            <label className="search">
              <Icon name="search" size={20} />
              <input
                type="search"
                aria-label="Search categories"
                placeholder="Search categories..."
                value={query}
                onChange={(e) => onSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && query && onSearch("")}
              />
            </label>
          </div>
          <div className="header-actions">
            <button
              className="round-btn theme-toggle"
              onClick={() => setDark(!dark)}
              aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
            >
              <Icon name={dark ? "sun" : "moon"} size={19} />
            </button>
            <div className="notif-wrap" ref={notifRef}>
              <button
                className="round-btn notification"
                aria-label="Notifications"
                aria-haspopup="true"
                aria-expanded={notifOpen}
                onClick={() => (notifOpen ? closeNotifications() : openNotifications())}
              >
                <Icon name="bell" size={19} />
                <i className={showDot && newCount > 0 ? "" : "gone"} />
              </button>
              <div
                className={notifOpen ? "notif-panel open" : "notif-panel"}
                role="region"
                aria-label="Notifications"
                aria-hidden={!notifOpen}
              >
                <div className="notif-head">
                  <strong>Notifications</strong>
                  {newCount > 0 && <span className="notif-new">{newCount} new</span>}
                </div>
                <ul className="notif-list">
                  {visibleNotifications.length === 0 && (
                    <li className="notif-empty">You're all caught up. Nothing new here.</li>
                  )}
                  {visibleNotifications.map((n, i) => (
                    <li
                      key={n.id}
                      className={n.unread ? "notif-item unread" : "notif-item"}
                      style={{ "--i": i }}
                    >
                      <span className={`notif-icon ${n.color}`}>{n.emoji}</span>
                      <div className="notif-copy">
                        <strong>{n.title}</strong>
                        <p>{n.text}</p>
                        <small>{n.time}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <span className="avatar avatar-j mobile-avatar">{initials}</span>
          </div>
        </header>

        <Routes>
          <Route
            path="/"
            element={
        <div className="content">
          <section className="welcome">
            <div>
              <p className="eyebrow">MONDAY, 28 OCTOBER</p>
              <h1>Ready to play, {firstName}?</h1>
              <p className="subtitle">Choose a game mode and put your knowledge to the test.</p>
            </div>
            <DailyGoal done={quizzesDone} goal={dailyGoal} />
          </section>

          <section>
            <div className="section-heading">
              <div>
                <p className="eyebrow">LET'S PLAY</p>
                <h2>Choose your mode</h2>
              </div>
              <button className="text-button">
                View all <Icon name="arrow" size={16} />
              </button>
            </div>
            <div className="mode-grid">
              {modes.map((mode, index) => (
                <button
                  key={mode.title}
                  className={`mode-card ${mode.color}`}
                  onClick={() => (index === 0 ? startQuickPlay() : index === 1 && openCategories())}
                >
                  <span className="mode-icon">
                    <Icon name={mode.icon} size={25} filled={mode.icon === "star"} />
                  </span>
                  {mode.tag && <span className="tag">{mode.tag}</span>}
                  <span className="mode-copy">
                    <strong>{mode.title}</strong>
                    <small>{mode.text}</small>
                  </span>
                  <span className="mode-arrow">
                    <Icon name="arrow" size={18} />
                  </span>
                </button>
              ))}
            </div>
          </section>

          <div className="lower-grid">
            <section className="topic-section">
              <div className="section-heading compact">
                <div>
                  <p className="eyebrow">EXPLORE</p>
                  <h2>Pick a category</h2>
                </div>
                <button className="text-button" onClick={openCategories}>
                  See all <Icon name="arrow" size={16} />
                </button>
              </div>
              <div className="category-grid">
                {categories.slice(0, FEATURED_COUNT).map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setCategory(item.name)}
                    aria-pressed={category === item.name}
                    className={`category-card ${item.color} ${category === item.name ? "selected" : ""}`}
                  >
                    <span>{item.emoji}</span>
                    <strong>{item.name}</strong>
                    <small>{bank[item.name].length} questions</small>
                  </button>
                ))}
              </div>

              <div className="start-card">
                <div className="start-icon">{selectedCategory.emoji}</div>
                <div className="start-info">
                  <strong>{selectedCategory.name} quiz</strong>
                  <span className="start-meta">
                    {selectedCount} questions · about{" "}
                    {Math.max(1, Math.round((selectedCount * prefs.questionTime) / 60))} min
                  </span>
                </div>
                <button className="primary-btn" onClick={() => startCategoryQuiz(selectedCategory.name)}>
                  Start quiz <Icon name="arrow" size={18} />
                </button>
              </div>
            </section>

            <aside className="leaderboard-card">
              <div className="leader-head">
                <div>
                  <p className="eyebrow">THIS WEEK</p>
                  <h2>Top players</h2>
                </div>
                <span className="trophy-box">
                  <Icon name="trophy" size={23} />
                </span>
              </div>
              <div className="leader-list">
                {leaders.map((leader) => (
                  <div className="leader-row" key={leader.id}>
                    <span className={`rank rank-${leader.rank}`}>{leader.rank}</span>
                    <span
                      className={leader.isMe ? "avatar avatar-j" : "avatar"}
                      style={leader.isMe ? undefined : { backgroundColor: leader.color }}
                    >
                      {leader.initials}
                    </span>
                    <span className="leader-name">
                      <strong>{leader.isMe ? "You" : leader.name}</strong>
                      <small>{fmt(leader.score)} pts</small>
                    </span>
                    {leader.rank === 1 && <Icon name="star" size={17} filled />}
                  </div>
                ))}
              </div>
              <div className="your-rank">
                <span className="rank">{weekly.me.rank}</span>
                <span className="avatar avatar-j">{initials}</span>
                <span className="leader-name">
                  <strong>You</strong>
                  <small>{fmt(points)} pts</small>
                </span>
                {weekly.me.move > 0 && <span className="rank-up">↑ {weekly.me.move}</span>}
                {weekly.me.move < 0 && <span className="rank-down">↓ {-weekly.me.move}</span>}
              </div>
              <button className="leader-button" onClick={() => navigate("/leaderboard")}>
                Full leaderboard <Icon name="arrow" size={16} />
              </button>
            </aside>
          </div>
        </div>
            }
          />
          <Route
            path="/quiz/:slug?"
            element={
              <QuizPage
                categories={categories}
                category={category}
                setCategory={setCategory}
                onSeeAll={openCategories}
                done={quizzesDone}
                goal={dailyGoal}
                questionTime={prefs.questionTime}
                onComplete={completeQuiz}
              />
            }
          />
          <Route
            path="/categories"
            element={
              <Categories
                query={query}
                onClearQuery={() => onSearch("")}
                category={category}
                setCategory={setCategory}
                onStart={(name) =>
                  navigate(quizPath({ kind: "category", category: name }), { state: { origin: { from: cameFrom } } })
                }
                onBack={() => navigate(cameFrom)}
                done={quizzesDone}
                goal={dailyGoal}
                questionTime={prefs.questionTime}
              />
            }
          />
          <Route
            path="/leaderboard"
            element={
              <Leaderboard points={points} quizzesDone={quizzesDone} initials={initials} onPlay={() => navigate("/quiz")} />
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
                name={name}
                initials={initials}
                onSaveName={setName}
                dark={dark}
                setDark={setDark}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                prefs={prefs}
                setPref={setPref}
                onResetPrefs={resetPrefs}
                onResetProgress={resetProgress}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <nav className="bottom-nav" aria-label="Mobile navigation">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={navActive === item.label ? "active" : ""}
            aria-current={navActive === item.label ? "page" : undefined}
          >
            <Icon name={item.icon} size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
