// Mock leaderboard data + ranking logic, shared by the Leaderboard page and the Home card.

// Jamie's points when the app first loads — used to work out how many places they've moved.
export const START_POINTS = 6480;

export const PERIODS = [
  { id: "week", label: "This week", reset: "Resets in 3 days", offset: 0, quizMul: 1 },
  { id: "month", label: "This month", reset: "Resets in 17 days", offset: 11200, quizMul: 4 },
  { id: "all", label: "All time", reset: "Lifetime ranking", offset: 52300, quizMul: 16 },
];

export const SCOPES = [
  { id: "everyone", label: "Everyone" },
  { id: "friends", label: "Friends" },
];

const pastel = ["#ffc7d9", "#bcebe0", "#bdddf8", "#ffe7d4", "#fff1bd", "#f6e2f5", "#daf4e9", "#dfefff"];

// week / month / all = points in each period; q = quizzes played this week
const players = [
  { id: "mia", name: "Mia Carter", level: 18, streak: 21, q: 34, move: 0, friend: false, week: 9840, month: 31200, all: 112400 },
  { id: "noah", name: "Noah Kim", level: 16, streak: 12, q: 31, move: 1, friend: true, week: 9215, month: 29800, all: 98300 },
  { id: "luca", name: "Luca Ray", level: 15, streak: 9, q: 29, move: -1, friend: true, week: 8970, month: 27400, all: 91600 },
  { id: "ava", name: "Ava Thompson", level: 14, streak: 15, q: 27, move: 2, friend: false, week: 8420, month: 26900, all: 84750 },
  { id: "ethan", name: "Ethan Cole", level: 14, streak: 4, q: 25, move: -2, friend: false, week: 7890, month: 24150, all: 104900 },
  { id: "zoe", name: "Zoe Martin", level: 13, streak: 8, q: 22, move: 1, friend: true, week: 7365, month: 21800, all: 72100 },
  { id: "leo", name: "Leo Park", level: 13, streak: 6, q: 20, move: 0, friend: false, week: 6910, month: 19350, all: 66400 },
  { id: "priya", name: "Priya Nair", level: 11, streak: 5, q: 19, move: -1, friend: true, week: 6120, month: 17120, all: 63150 },
  { id: "sam", name: "Sam Rivera", level: 11, streak: 3, q: 17, move: 3, friend: true, week: 5740, month: 15600, all: 55900 },
  { id: "chloe", name: "Chloe Dubois", level: 10, streak: 6, q: 15, move: 0, friend: false, week: 5310, month: 14200, all: 51200 },
  { id: "omar", name: "Omar Haddad", level: 9, streak: 2, q: 13, move: -1, friend: false, week: 4880, month: 12850, all: 47600 },
  { id: "ivy", name: "Ivy Chen", level: 9, streak: 10, q: 12, move: 2, friend: false, week: 4425, month: 11300, all: 40300 },
  { id: "kai", name: "Kai Tanaka", level: 8, streak: 1, q: 9, move: 1, friend: false, week: 3960, month: 9700, all: 33800 },
].map((p, i) => ({
  ...p,
  initials: p.name
    .split(" ")
    .map((w) => w[0])
    .join(""),
  color: pastel[i % pastel.length],
}));

const me = {
  id: "me",
  name: "Jamie Doe",
  initials: "JD",
  level: 12,
  streak: 7,
  friend: true,
  isMe: true,
  moves: { week: 2, month: 1, all: 0 },
};

function sortRows(rows) {
  return rows
    .sort((a, b) => b.score - a.score)
    .map((row, i) => ({ ...row, rank: i + 1 }));
}

/**
 * Build the ranked board for a period/scope with the user's live points.
 * Returns { rows, me, next, gap } where `next` is the player directly above the user.
 */
export function buildBoard(periodId, points, scope = "everyone", quizzesDone = 3, initials = me.initials) {
  const period = PERIODS.find((p) => p.id === periodId) ?? PERIODS[0];
  const pool = players.filter((p) => scope === "everyone" || p.friend);

  const others = pool.map((p) => ({
    ...p,
    score: p[period.id],
    quizzes: Math.round(p.q * period.quizMul),
  }));

  // Where Jamie started, so we can show "↑ n" as they climb.
  const startRank = sortRows([...others, { ...me, score: START_POINTS + period.offset }]).find((r) => r.isMe).rank;

  const rows = sortRows([
    ...others,
    {
      ...me,
      initials,
      score: points + period.offset,
      quizzes: Math.round((11 + quizzesDone) * period.quizMul),
    },
  ]);

  const mine = rows.find((r) => r.isMe);
  mine.move = me.moves[period.id] + (startRank - mine.rank);

  const next = mine.rank > 1 ? rows[mine.rank - 2] : null;
  const behind = mine.rank < rows.length ? rows[mine.rank] : null;

  return { rows, me: mine, next, behind, period };
}

export const fmt = (n) => n.toLocaleString("en-US");
