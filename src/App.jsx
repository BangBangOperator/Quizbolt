import { useEffect, useRef, useState } from "react";

const paths = {
  home: (
    <>
      <path d="M3 10.8 12 3l9 7.8" />
      <path d="M5.5 9.5V21h13V9.5M9.5 21v-6h5v6" />
    </>
  ),
  quiz: (
    <>
      <path d="M8.5 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-3.5" />
      <path d="m7 11 3 3L21 3" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H3v2a4 4 0 0 0 4 4M17 6h4v2a4 4 0 0 1-4 4" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.08A1.7 1.7 0 0 0 8.94 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.58 15 1.7 1.7 0 0 0 3 14H3v-4h.08A1.7 1.7 0 0 0 4.6 8.94a1.7 1.7 0 0 0-.34-1.88L4.2 7l2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.58 1.7 1.7 0 0 0 10 3h4v.08A1.7 1.7 0 0 0 15.06 4.6a1.7 1.7 0 0 0 1.88-.34L17 4.2l2.83 2.83-.06.06A1.7 1.7 0 0 0 19.42 9 1.7 1.7 0 0 0 21 10v4h-.08A1.7 1.7 0 0 0 19.4 15Z" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
    </>
  ),
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />,
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  bolt: <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" />,
  arrow: (
    <>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </>
  ),
  star: (
    <path d="m12 2.5 2.9 5.88 6.5.95-4.7 4.58 1.11 6.47L12 17.33l-5.81 3.05 1.11-6.47-4.7-4.58 6.5-.95L12 2.5Z" />
  ),
};

function Icon({ name, size = 20, filled = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

const navItems = [
  { label: "Home", icon: "home" },
  { label: "Quiz", icon: "quiz" },
  { label: "Leaderboard", icon: "trophy" },
  { label: "Settings", icon: "settings" },
];

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

const categories = [
  { name: "Science", emoji: "🧪", color: "mint" },
  { name: "History", emoji: "🏛️", color: "peach" },
  { name: "Geography", emoji: "🌍", color: "blue" },
  { name: "Arts", emoji: "🎨", color: "pink" },
];

const leaders = [
  { rank: 1, name: "Mia Carter", points: "9,840", initials: "MC", color: "#ffc7d9" },
  { rank: 2, name: "Noah Kim", points: "9,215", initials: "NK", color: "#bcebe0" },
  { rank: 3, name: "Luca Ray", points: "8,970", initials: "LR", color: "#bdddf8" },
];

const initialNotifications = [
  {
    id: 1,
    emoji: "🏆",
    color: "yellow",
    title: "You moved up 2 ranks",
    text: "You're now #8 on this week's leaderboard.",
    time: "2 min ago",
    unread: true,
  },
  {
    id: 2,
    emoji: "🔥",
    color: "peach",
    title: "7 day streak!",
    text: "Play one quiz today to keep it going.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    emoji: "🪐",
    color: "blue",
    title: "Continue Wonders of Space",
    text: "4 questions left to finish your quiz.",
    time: "3 hours ago",
    unread: true,
  },
  {
    id: 4,
    emoji: "👋",
    color: "pink",
    title: "Noah Kim invited you",
    text: "Join his room and play together.",
    time: "Yesterday",
    unread: false,
  },
];

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem("quiz-theme") === "dark");
  const [active, setActive] = useState("Home");
  const [category, setCategory] = useState("Science");
  const [notifOpen, setNotifOpen] = useState(false);
  const [showDot, setShowDot] = useState(true);
  const [notifications, setNotifications] = useState(initialNotifications);
  const notifRef = useRef(null);
  const readTimer = useRef(null);
  const newCount = notifications.filter((n) => n.unread).length;

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
    <div className={dark ? "app dark" : "app"}>
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">
            <Icon name="bolt" size={20} filled />
          </span>
          <span>
            Quizbolt<span className="brand-dot">.</span>
          </span>
        </div>
        <nav className="side-nav" aria-label="Main navigation">
          <p className="nav-label">MENU</p>
          {navItems.map((item) => (
            <button
              key={item.label}
              className={active === item.label ? "nav-item active" : "nav-item"}
              onClick={() => setActive(item.label)}
            >
              <Icon name={item.icon} size={19} />
              <span>{item.label}</span>
            </button>
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
          <button className="profile-mini">
            <span className="avatar avatar-j">JD</span>
            <span>
              <strong>Jamie Doe</strong>
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
          <label className="search">
            <Icon name="search" size={20} />
            <input aria-label="Search quizzes" placeholder="Search quizzes..." />
          </label>
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
                <i className={showDot ? "" : "gone"} />
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
                  {notifications.map((n, i) => (
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
            <span className="avatar avatar-j mobile-avatar">JD</span>
          </div>
        </header>

        <div className="content">
          <section className="welcome">
            <div>
              <p className="eyebrow">MONDAY, 28 OCTOBER</p>
              <h1>Ready to play, Jamie?</h1>
              <p className="subtitle">Choose a game mode and put your knowledge to the test.</p>
            </div>
            <div className="daily-goal">
              <div className="goal-ring">
                <span>3</span>
                <small>/5</small>
              </div>
              <div>
                <strong>Daily goal</strong>
                <p>2 quizzes to go!</p>
              </div>
            </div>
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
                  onClick={() => index === 0 && setActive("Quiz")}
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
                <button className="text-button">
                  See all <Icon name="arrow" size={16} />
                </button>
              </div>
              <div className="category-grid">
                {categories.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setCategory(item.name)}
                    className={`category-card ${item.color} ${category === item.name ? "selected" : ""}`}
                  >
                    <span>{item.emoji}</span>
                    <strong>{item.name}</strong>
                    <small>
                      {item.name === "Science"
                        ? 24
                        : item.name === "History"
                          ? 18
                          : item.name === "Geography"
                            ? 15
                            : 20}{" "}
                      quizzes
                    </small>
                  </button>
                ))}
              </div>
              <div className="continue-card">
                <div className="continue-icon">🪐</div>
                <div className="continue-info">
                  <span className="eyebrow">CONTINUE QUIZ</span>
                  <strong>Wonders of Space</strong>
                  <div className="progress">
                    <i />
                  </div>
                  <small>6 of 10 questions</small>
                </div>
                <button aria-label="Continue Wonders of Space">
                  <Icon name="arrow" size={20} />
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
                  <div className="leader-row" key={leader.name}>
                    <span className={`rank rank-${leader.rank}`}>{leader.rank}</span>
                    <span className="avatar" style={{ backgroundColor: leader.color }}>
                      {leader.initials}
                    </span>
                    <span className="leader-name">
                      <strong>{leader.name}</strong>
                      <small>{leader.points} pts</small>
                    </span>
                    {leader.rank === 1 && <Icon name="star" size={17} filled />}
                  </div>
                ))}
              </div>
              <div className="your-rank">
                <span className="rank">8</span>
                <span className="avatar avatar-j">JD</span>
                <span className="leader-name">
                  <strong>You</strong>
                  <small>6,480 pts</small>
                </span>
                <span className="rank-up">↑ 2</span>
              </div>
              <button className="leader-button" onClick={() => setActive("Leaderboard")}>
                Full leaderboard <Icon name="arrow" size={16} />
              </button>
            </aside>
          </div>
        </div>
      </main>

      <nav className="bottom-nav" aria-label="Mobile navigation">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={active === item.label ? "active" : ""}
            onClick={() => setActive(item.label)}
          >
            <Icon name={item.icon} size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
