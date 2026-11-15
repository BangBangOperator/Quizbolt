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
  Technology: [
    {
      q: "What does CPU stand for?",
      options: ["Central Processing Unit", "Central Program Utility", "Computer Personal Unit", "Core Processing Utility"],
    },
    { q: "Which company created the iPhone?", options: ["Apple", "Samsung", "Nokia", "Google"] },
    {
      q: "What does HTTP stand for?",
      options: [
        "HyperText Transfer Protocol",
        "High Transfer Text Process",
        "HyperText Transmission Program",
        "Hyper Terminal Transfer Protocol",
      ],
    },
    {
      q: "Which language is mainly used to style web pages?",
      options: ["CSS", "Python", "SQL", "Java"],
    },
    {
      q: "Who co-founded Microsoft with Paul Allen?",
      options: ["Bill Gates", "Steve Jobs", "Elon Musk", "Larry Page"],
    },
    {
      q: "What is the main purpose of a firewall?",
      options: [
        "Block unauthorized network access",
        "Speed up downloads",
        "Cool the processor",
        "Compress large files",
      ],
    },
    {
      q: "What does AI stand for?",
      options: ["Artificial Intelligence", "Automated Internet", "Advanced Input", "Applied Integration"],
    },
    { q: "Which of these is a web browser?", options: ["Firefox", "Linux", "Excel", "Photoshop"] },
  ],
  Sports: [
    {
      q: "How many players does one football (soccer) team have on the field?",
      options: ["11", "9", "10", "12"],
    },
    { q: "In which sport do you score a slam dunk?", options: ["Basketball", "Volleyball", "Tennis", "Cricket"] },
    {
      q: "How often are the Summer Olympic Games held?",
      options: ["Every 4 years", "Every 2 years", "Every 3 years", "Every 5 years"],
    },
    {
      q: "Which country won the 2022 FIFA World Cup?",
      options: ["Argentina", "France", "Brazil", "Croatia"],
    },
    { q: "How many rings are on the Olympic flag?", options: ["5", "4", "6", "7"] },
    { q: "In tennis, what is a score of zero called?", options: ["Love", "Nil", "Zip", "Ace"] },
    { q: "Which sport is played at Wimbledon?", options: ["Tennis", "Golf", "Cricket", "Rugby"] },
    {
      q: "How long is a marathon?",
      options: ["About 42 km (26.2 miles)", "About 21 km", "About 50 km", "About 30 km"],
    },
  ],
  Music: [
    { q: "How many strings does a standard guitar have?", options: ["6", "4", "5", "8"] },
    {
      q: "Which of these instruments is played with a bow?",
      options: ["Violin", "Trumpet", "Piano", "Flute"],
    },
    { q: "Who composed The Magic Flute?", options: ["Mozart", "Beethoven", "Bach", "Chopin"] },
    {
      q: "Which musical term means loud?",
      options: ["Forte", "Piano", "Allegro", "Adagio"],
    },
    {
      q: "Which band performed the song Hey Jude?",
      options: ["The Beatles", "The Rolling Stones", "Queen", "Led Zeppelin"],
    },
    {
      q: "Which instrument family does the trumpet belong to?",
      options: ["Brass", "Woodwind", "Strings", "Percussion"],
    },
    {
      q: "Which singer is known as the Queen of Pop?",
      options: ["Madonna", "Adele", "Beyoncé", "Rihanna"],
    },
    { q: "A song performed by one person alone is called a what?", options: ["Solo", "Duet", "Quartet", "Chorus"] },
  ],
  Movies: [
    {
      q: "Who directed the film Jurassic Park?",
      options: ["Steven Spielberg", "James Cameron", "George Lucas", "Ridley Scott"],
    },
    {
      q: "In which film series do you hear May the Force be with you?",
      options: ["Star Wars", "Star Trek", "Avatar", "Alien"],
    },
    { q: "Which film features a lion named Simba?", options: ["The Lion King", "Bambi", "Aladdin", "Tarzan"] },
    { q: "Which studio made Toy Story?", options: ["Pixar", "DreamWorks", "Illumination", "Studio Ghibli"] },
    {
      q: "Who plays Iron Man in the Marvel films?",
      options: ["Robert Downey Jr.", "Chris Evans", "Chris Hemsworth", "Mark Ruffalo"],
    },
    {
      q: "What is the name of the wizard school in Harry Potter?",
      options: ["Hogwarts", "Beauxbatons", "Durmstrang", "Ilvermorny"],
    },
    {
      q: "Which 1997 film is about a ship that sinks after hitting an iceberg?",
      options: ["Titanic", "Poseidon", "Waterworld", "The Abyss"],
    },
    { q: "Which animated film features the song Let It Go?", options: ["Frozen", "Tangled", "Moana", "Encanto"] },
  ],
  Nature: [
    {
      q: "What is the largest mammal on Earth?",
      options: ["Blue whale", "African elephant", "Giraffe", "Polar bear"],
    },
    {
      q: "Which gas do trees release that humans need to breathe?",
      options: ["Oxygen", "Carbon dioxide", "Helium", "Methane"],
    },
    { q: "What is a baby kangaroo called?", options: ["Joey", "Cub", "Pup", "Calf"] },
    {
      q: "Which is the tallest animal in the world?",
      options: ["Giraffe", "African elephant", "Ostrich", "Camel"],
    },
    {
      q: "What do bees collect from flowers to make honey?",
      options: ["Nectar", "Water", "Sap", "Seeds"],
    },
    {
      q: "Which of these is a very dry environment with little rainfall?",
      options: ["Desert", "Rainforest", "Swamp", "Coral reef"],
    },
    { q: "How many legs does a spider have?", options: ["8", "6", "10", "4"] },
    {
      q: "Which is the fastest land animal?",
      options: ["Cheetah", "Lion", "Antelope", "Leopard"],
    },
  ],
  Food: [
    { q: "Which country is sushi from?", options: ["Japan", "China", "Thailand", "Korea"] },
    {
      q: "What is the main ingredient of guacamole?",
      options: ["Avocado", "Tomato", "Pepper", "Cucumber"],
    },
    {
      q: "Which spice is the most expensive by weight?",
      options: ["Saffron", "Cinnamon", "Paprika", "Turmeric"],
    },
    { q: "Tofu is made from which bean?", options: ["Soybeans", "Black beans", "Chickpeas", "Kidney beans"] },
    {
      q: "What is the main ingredient in hummus?",
      options: ["Chickpeas", "Lentils", "Potatoes", "Rice"],
    },
    { q: "Which fruit is dried to make raisins?", options: ["Grapes", "Plums", "Cherries", "Figs"] },
    {
      q: "What is kimchi?",
      options: [
        "A Korean dish of fermented vegetables",
        "A Japanese noodle soup",
        "An Indian flatbread",
        "A Thai curry",
      ],
    },
    { q: "Which nut is used to make marzipan?", options: ["Almond", "Cashew", "Walnut", "Peanut"] },
  ],
  Literature: [
    {
      q: "Who wrote the novel Pride and Prejudice?",
      options: ["Jane Austen", "Charlotte Brontë", "Emily Dickinson", "Mary Shelley"],
    },
    {
      q: "Who wrote the Harry Potter books?",
      options: ["J.K. Rowling", "Roald Dahl", "C.S. Lewis", "J.R.R. Tolkien"],
    },
    {
      q: "Who wrote The Hobbit?",
      options: ["J.R.R. Tolkien", "C.S. Lewis", "George R.R. Martin", "Roald Dahl"],
    },
    {
      q: "Which author created the detective Sherlock Holmes?",
      options: ["Arthur Conan Doyle", "Agatha Christie", "Edgar Allan Poe", "Charles Dickens"],
    },
    {
      q: "What is the name of the boy who never grows up in J.M. Barrie's story?",
      options: ["Peter Pan", "Tom Sawyer", "Oliver Twist", "Pinocchio"],
    },
    { q: "Who wrote the novel 1984?", options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "H.G. Wells"] },
    {
      q: "What does Alice follow down the rabbit hole in Alice in Wonderland?",
      options: ["A white rabbit", "A Cheshire cat", "A mad hatter", "A dormouse"],
    },
    {
      q: "Which Shakespeare play contains the line To be, or not to be?",
      options: ["Hamlet", "Macbeth", "Othello", "King Lear"],
    },
  ],
  Math: [
    { q: "What is 12 × 12?", options: ["144", "124", "132", "154"] },
    { q: "What is the value of pi rounded to two decimal places?", options: ["3.14", "3.41", "3.12", "3.24"] },
    { q: "How many sides does a hexagon have?", options: ["6", "5", "7", "8"] },
    { q: "What is the square root of 81?", options: ["9", "8", "7", "11"] },
    { q: "What is 15% of 200?", options: ["30", "15", "20", "25"] },
    { q: "What is the next prime number after 7?", options: ["11", "9", "13", "8"] },
    { q: "How many degrees are in a right angle?", options: ["90", "45", "180", "60"] },
    { q: "What is 1000 ÷ 8?", options: ["125", "120", "150", "100"] },
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
