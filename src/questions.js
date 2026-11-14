// The first option of every question is the correct one.
// The quiz shuffles the answers each round, so the order here never leaks.
export const bank = {
  Science: [
    { q: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Gd", "Go"] },
    { q: "Which planet is known as the Red Planet?", options: ["Mars", "Venus", "Mercury", "Jupiter"] },
    {
      q: "Which gas do plants absorb from the air for photosynthesis?",
      options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
    },
    { q: "How many bones are in the adult human body?", options: ["206", "186", "212", "256"] },
    {
      q: "What is the hardest natural substance on Earth?",
      options: ["Diamond", "Quartz", "Granite", "Topaz"],
    },
    {
      q: "Which part of a cell contains its DNA?",
      options: ["Nucleus", "Ribosome", "Mitochondria", "Cytoplasm"],
    },
    {
      q: "Which force keeps the planets in orbit around the Sun?",
      options: ["Gravity", "Magnetism", "Friction", "Static electricity"],
    },
    {
      q: "At sea level, at what temperature does water boil?",
      options: ["100°C", "90°C", "120°C", "80°C"],
    },
  ],
  History: [
    {
      q: "Who was the first President of the United States?",
      options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
    },
    { q: "In which year did World War II end?", options: ["1945", "1939", "1943", "1950"] },
    {
      q: "Which ancient civilization built the pyramids of Giza?",
      options: ["The Egyptians", "The Romans", "The Mayans", "The Greeks"],
    },
    { q: "In which country did the Renaissance begin?", options: ["Italy", "France", "England", "Spain"] },
    {
      q: "Who was the first person to walk on the Moon?",
      options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Michael Collins"],
    },
    { q: "In which year did the Berlin Wall fall?", options: ["1989", "1991", "1979", "1985"] },
    {
      q: "Julius Caesar was a leader of which ancient civilization?",
      options: ["Rome", "Persia", "Byzantium", "The Ottoman Empire"],
    },
    {
      q: "Who was the main author of the U.S. Declaration of Independence?",
      options: ["Thomas Jefferson", "Benjamin Franklin", "George Washington", "John Hancock"],
    },
  ],
  Geography: [
    { q: "What is the capital of Japan?", options: ["Tokyo", "Kyoto", "Osaka", "Seoul"] },
    { q: "Which is the longest river in Africa?", options: ["The Nile", "The Congo", "The Niger", "The Zambezi"] },
    {
      q: "Which is the largest ocean on Earth?",
      options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
    },
    {
      q: "Mount Everest is part of which mountain range?",
      options: ["The Himalayas", "The Andes", "The Alps", "The Rockies"],
    },
    { q: "What is the capital of Australia?", options: ["Canberra", "Sydney", "Melbourne", "Perth"] },
    {
      q: "Which is the largest country in the world by area?",
      options: ["Russia", "Canada", "China", "United States"],
    },
    {
      q: "Which is the largest hot desert in the world?",
      options: ["The Sahara", "The Gobi", "The Kalahari", "The Arabian Desert"],
    },
    { q: "How many continents are there?", options: ["7", "5", "6", "8"] },
  ],
  Arts: [
    {
      q: "Who painted the Mona Lisa?",
      options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Vincent van Gogh"],
    },
    {
      q: "Which artist painted The Starry Night?",
      options: ["Vincent van Gogh", "Claude Monet", "Pablo Picasso", "Salvador Dalí"],
    },
    {
      q: "Who wrote the play Romeo and Juliet?",
      options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Oscar Wilde"],
    },
    { q: "Which instrument has 88 keys?", options: ["Piano", "Violin", "Flute", "Harp"] },
    {
      q: "What are the three primary colors in traditional art?",
      options: ["Red, yellow and blue", "Red, green and blue", "Green, orange and purple", "Black, white and gray"],
    },
    {
      q: "Who composed The Four Seasons?",
      options: ["Antonio Vivaldi", "Wolfgang Mozart", "Ludwig van Beethoven", "Johann Sebastian Bach"],
    },
    { q: "In which city is the Louvre museum?", options: ["Paris", "Rome", "London", "Madrid"] },
    {
      q: "Which art movement is Salvador Dalí best known for?",
      options: ["Surrealism", "Cubism", "Impressionism", "Pop Art"],
    },
  ],
};

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const QUICK_PLAY_COUNT = 10;

// config: { kind: "quick" } or { kind: "category", category: "Science" }
export function createSession(config) {
  const pool =
    config.kind === "quick"
      ? Object.entries(bank).flatMap(([category, list]) => list.map((item) => ({ ...item, category })))
      : bank[config.category].map((item) => ({ ...item, category: config.category }));

  const chosen = config.kind === "quick" ? shuffle(pool).slice(0, QUICK_PLAY_COUNT) : shuffle(pool);

  const questions = chosen.map((item) => {
    const options = shuffle(item.options.map((text, i) => ({ text, correct: i === 0 })));
    return {
      q: item.q,
      category: item.category,
      options: options.map((o) => o.text),
      answer: options.findIndex((o) => o.correct),
    };
  });

  return {
    id: Math.random().toString(36).slice(2),
    title: config.kind === "quick" ? "Quick Play" : `${config.category} quiz`,
    questions,
  };
}
