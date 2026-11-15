// Every quiz category. The first FEATURED_COUNT are shown on Home and in the quiz lobby;
// the "All categories" page lists them all. Each name must have a matching list in questions.js.
export const categories = [
  { name: "Science", emoji: "🧪", color: "mint" },
  { name: "History", emoji: "🏛️", color: "peach" },
  { name: "Geography", emoji: "🌍", color: "blue" },
  { name: "Arts", emoji: "🎨", color: "pink" },
  { name: "Technology", emoji: "💻", color: "lilac" },
  { name: "Sports", emoji: "⚽", color: "mint" },
  { name: "Music", emoji: "🎵", color: "pink" },
  { name: "Movies", emoji: "🎬", color: "yellow" },
  { name: "Nature", emoji: "🌿", color: "teal" },
  { name: "Food", emoji: "🍜", color: "peach" },
  { name: "Literature", emoji: "📚", color: "blue" },
  { name: "Math", emoji: "🔢", color: "coral" },
];

export const FEATURED_COUNT = 4;

// URL helpers: "Science" <-> /quiz/science
export const slugOf = (name) => name.toLowerCase().replace(/\s+/g, "-");
export const categoryFromSlug = (slug) => categories.find((c) => slugOf(c.name) === slug);

// The URL of a quiz: { kind: "quick" } -> /quiz/quick, { kind: "category", category } -> /quiz/science
export const quizPath = (config) =>
  config.kind === "quick" ? "/quiz/quick" : `/quiz/${slugOf(config.category)}`;
