export interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number // Index (0-3)
  explanation: string
}

export interface Quiz {
  id: string
  title: string
  description: string
  category: string
  difficulty: "junior" | "pro" | "master"
  xpAward: number
  icon: string // Material Symbols icon name
  questions: Question[]
}

export const CATEGORIES = [
  { id: "space", name: "Space", count: 42, icon: "rocket_launch", bgGradient: "from-primary/10 to-transparent", badgeBg: "bg-primary-fixed text-on-primary-fixed" },
  { id: "animals", name: "Animals", count: 18, icon: "pets", bgGradient: "from-tertiary/10 to-transparent", badgeBg: "bg-tertiary-fixed text-on-tertiary-fixed" },
  { id: "history", name: "History", count: 35, icon: "history_edu", bgGradient: "from-secondary/10 to-transparent", badgeBg: "bg-secondary-fixed/50 text-on-secondary-fixed-variant" },
  { id: "coding", name: "Coding", count: 50, icon: "code", bgGradient: "from-primary-container/10 to-transparent", badgeBg: "bg-primary-fixed-dim text-on-primary-fixed-variant" },
  { id: "pop-culture", name: "Pop Culture", count: 24, icon: "movie", bgGradient: "from-error/10 to-transparent", badgeBg: "bg-error-container text-on-error-container" },
  { id: "science", name: "Science", count: 31, icon: "science", bgGradient: "from-tertiary-container/10 to-transparent", badgeBg: "bg-tertiary-fixed/30 text-on-tertiary-fixed" },
]

export const QUIZZES: Quiz[] = [
  {
    id: "cosmic-physics-basics",
    title: "Cosmic Physics Basics",
    description: "Understand the fundamental rules of the cosmos, from gravity to spacetime dilation.",
    category: "space",
    difficulty: "pro",
    xpAward: 500,
    icon: "rocket_launch",
    questions: [
      {
        id: "cp-q1",
        text: "What is the escape velocity of Earth?",
        options: ["7.2 km/s", "11.2 km/s", "15.4 km/s", "29.8 km/s"],
        correctAnswer: 1,
        explanation: "Earth's escape velocity is about 11.2 km/s (approx. 25,000 mph). This is the minimum speed needed for a non-propelled object to escape Earth's gravitational influence.",
      },
      {
        id: "cp-q2",
        text: "Which force is responsible for keeping planets in orbit around stars?",
        options: ["Electromagnetic Force", "Strong Nuclear Force", "Weak Nuclear Force", "Gravitational Force"],
        correctAnswer: 3,
        explanation: "Gravity is the attractive force between objects with mass, which holds planets, moons, and stars in their respective orbits.",
      },
      {
        id: "cp-q3",
        text: "What is the primary engine of energy in stars like our Sun?",
        options: ["Nuclear Fission", "Nuclear Fusion", "Chemical Combustion", "Gravitational Collapse"],
        correctAnswer: 1,
        explanation: "Stars generate energy through nuclear fusion, fusing hydrogen atoms under extreme temperature and pressure into helium, releasing massive energy.",
      },
      {
        id: "cp-q4",
        text: "According to Einstein's Theory of Relativity, what happens to time as you approach the speed of light?",
        options: ["Time speeds up", "Time stops completely", "Time slows down (time dilation)", "Time moves backward"],
        correctAnswer: 2,
        explanation: "Time dilation occurs: as an object travels closer to the speed of light, time passes more slowly for it relative to an observer at rest.",
      },
      {
        id: "cp-q5",
        text: "What term describes the point of infinite density inside a black hole?",
        options: ["Event Horizon", "Accretion Disk", "Singularity", "Wormhole"],
        correctAnswer: 2,
        explanation: "The singularity is the center of a black hole where matter is crushed to infinite density and the laws of physics as we know them break down.",
      },
    ],
  },
  {
    id: "mars-exploration",
    title: "Mars Exploration",
    description: "Learn about human probes, rovers, and future missions to the Red Planet.",
    category: "space",
    difficulty: "pro",
    xpAward: 450,
    icon: "space_dashboard",
    questions: [
      {
        id: "me-q1",
        text: "Which rover landed on Mars in February 2021 to search for signs of ancient microbial life?",
        options: ["Spirit", "Opportunity", "Curiosity", "Perseverance"],
        correctAnswer: 3,
        explanation: "NASA's Perseverance rover landed in Jezero Crater on February 18, 2021, searching for signs of past habitable environments and biosignatures.",
      },
      {
        id: "me-q2",
        text: "Mars is known as the Red Planet due to the abundance of which compound on its surface?",
        options: ["Methane ice", "Iron oxide (rust)", "Silicon dioxide", "Sulfur crystals"],
        correctAnswer: 1,
        explanation: "The reddish appearance is caused by iron oxide (rust) covering much of its surface, giving it a rusty, dusty hue.",
      },
      {
        id: "me-q3",
        text: "What is the name of the largest volcano in the Solar System, located on Mars?",
        options: ["Mauna Kea", "Olympus Mons", "Mount Vesuvius", "Tharsis Ridge"],
        correctAnswer: 1,
        explanation: "Olympus Mons is a massive shield volcano on Mars that stands over 21 km (13.6 miles) high, about 2.5 times the height of Mt. Everest.",
      },
    ],
  },
  {
    id: "cellular-biology",
    title: "Cellular Biology",
    description: "Examine cell structures, organelle functions, and energy production inside cells.",
    category: "science",
    difficulty: "pro",
    xpAward: 400,
    icon: "science",
    questions: [
      {
        id: "cb-q1",
        text: "Which organelle is widely referred to as the powerhouse of the cell?",
        options: ["Nucleus", "Ribosome", "Mitochondrion", "Golgi Apparatus"],
        correctAnswer: 2,
        explanation: "Mitochondria generate most of the chemical energy needed to power the cell's biochemical reactions, stored as ATP.",
      },
      {
        id: "cb-q2",
        text: "What molecule stores the genetic code in living cells?",
        options: ["RNA", "Proteins", "DNA", "Lipids"],
        correctAnswer: 2,
        explanation: "DNA (Deoxyribonucleic acid) contains the genetic instructions for the development, functioning, growth, and reproduction of all organisms.",
      },
      {
        id: "cb-q3",
        text: "Which of the following is ONLY found in plant cells and not animal cells?",
        options: ["Cell Wall", "Cell Membrane", "Mitochondria", "Cytoplasm"],
        correctAnswer: 0,
        explanation: "Plant cells have a rigid structural cell wall made of cellulose and chloroplasts for photosynthesis, which animal cells lack.",
      },
      {
        id: "cb-q4",
        text: "What is the process by which a cell divides into two identical daughter cells?",
        options: ["Meiosis", "Mitosis", "Phagocytosis", "Transcription"],
        correctAnswer: 1,
        explanation: "Mitosis is the division of the cell nucleus, resulting in two genetically identical nuclei, followed by cell division.",
      },
    ],
  },
  {
    id: "ancient-rome",
    title: "Ancient Rome",
    description: "Journey back to the Republic and Empire, Julius Caesar, and the Colosseum.",
    category: "history",
    difficulty: "pro",
    xpAward: 300,
    icon: "history_edu",
    questions: [
      {
        id: "ar-q1",
        text: "Who was the first formal Emperor of the Roman Empire?",
        options: ["Julius Caesar", "Augustus", "Nero", "Marcus Aurelius"],
        correctAnswer: 1,
        explanation: "Augustus (formerly Octavian) became the first Emperor of Rome in 27 BC, ushering in the Pax Romana after years of civil wars.",
      },
      {
        id: "ar-q2",
        text: "On which date were the famous Ides of March when Julius Caesar was assassinated?",
        options: ["March 1", "March 15", "March 30", "April 15"],
        correctAnswer: 1,
        explanation: "The Ides of March corresponds to March 15. In 44 BC, Julius Caesar was stabbed 23 times by a group of senators.",
      },
      {
        id: "ar-q3",
        text: "What major amphitheater in Rome was used for gladiatorial combats and public spectacles?",
        options: ["Pantheon", "Circus Maximus", "Colosseum", "Forum Romanum"],
        correctAnswer: 2,
        explanation: "The Colosseum (Flavian Amphitheatre) was built between 72 AD and 80 AD, accommodating up to 80,000 spectators.",
      },
    ],
  },
  {
    id: "typescript-basics",
    title: "TypeScript Basics",
    description: "Master types, interfaces, generics, and strict configurations.",
    category: "coding",
    difficulty: "master",
    xpAward: 600,
    icon: "code",
    questions: [
      {
        id: "ts-q1",
        text: "How do you declare a variable that can hold either a string or a number?",
        options: ["let val: string & number", "let val: string | number", "let val: string or number", "let val: any"],
        correctAnswer: 1,
        explanation: "A union type `string | number` allows a variable to contain either a string or a number in TypeScript.",
      },
      {
        id: "ts-q2",
        text: "Which keyword is used to create a custom type definition in TypeScript?",
        options: ["type", "interface", "class", "Both 'type' and 'interface'"],
        correctAnswer: 3,
        explanation: "Both `type` aliases and `interface` declarations can define custom structures and shapes of objects in TypeScript.",
      },
      {
        id: "ts-q3",
        text: "What does the 'readonly' modifier do in TypeScript?",
        options: [
          "Prevents a property from being reassigned after initialization",
          "Makes a variable private to the class",
          "Allows writing variables only in node_modules",
          "Declares a variable that cannot be read in loops"
        ],
        correctAnswer: 0,
        explanation: "`readonly` makes a property immutable after its creation, returning compile-time errors if modification is attempted.",
      },
      {
        id: "ts-q4",
        text: "What compiler option ensures TypeScript checks for implicit 'any' types?",
        options: ["strictNullChecks", "noImplicitAny", "strictBindCallApply", "target"],
        correctAnswer: 1,
        explanation: "`noImplicitAny` raises expression/declaration errors on implicit 'any' occurrences, encouraging explicit typing.",
      },
    ],
  },
  {
    id: "ocean-life",
    title: "Ocean Life",
    description: "Dive into marine biology, coral reefs, and mysterious deep-sea creatures.",
    category: "animals",
    difficulty: "junior",
    xpAward: 250,
    icon: "pets",
    questions: [
      {
        id: "ol-q1",
        text: "What is the largest animal currently known to live on Earth?",
        options: ["African Elephant", "Colossal Squid", "Blue Whale", "Megalodon"],
        correctAnswer: 2,
        explanation: "The blue whale (Balaenoptera musculus) is the largest mammal and animal ever recorded, growing up to 30 meters and weighing 190 tonnes.",
      },
      {
        id: "ol-q2",
        text: "Which marine creature has three hearts and blue blood?",
        options: ["Octopus", "Starfish", "Jellyfish", "Great White Shark"],
        correctAnswer: 0,
        explanation: "Octopuses have blue, copper-rich blood and three hearts (two pump blood to gills, one to the rest of the body).",
      },
      {
        id: "ol-q3",
        text: "What type of organism makes up the structural foundation of coral reefs?",
        options: ["Algae roots", "Coral polyps (tiny animals)", "Marine fungi", "Sea sponges"],
        correctAnswer: 1,
        explanation: "Reefs are built by colonies of tiny animals called coral polyps, which secrete calcium carbonate exoskeletons.",
      },
    ],
  },
  {
    id: "movie-trivia",
    title: "Movie Trivia",
    description: "Test your knowledge of classic movies, characters, and directors.",
    category: "pop-culture",
    difficulty: "junior",
    xpAward: 200,
    icon: "movie",
    questions: [
      {
        id: "mt-q1",
        text: "Who directed the sci-fi masterpieces 'Inception' and 'Interstellar'?",
        options: ["Steven Spielberg", "Quentin Tarantino", "Christopher Nolan", "Martin Scorsese"],
        correctAnswer: 2,
        explanation: "Christopher Nolan directed both Inception (2010) and Interstellar (2014), famous for their complex themes and visual storytelling.",
      },
      {
        id: "mt-q2",
        text: "Which movie holds the record for the highest box office gross of all time (unadjusted for inflation)?",
        options: ["Titanic", "Avengers: Endgame", "Avatar", "Star Wars: The Force Awakens"],
        correctAnswer: 2,
        explanation: "James Cameron's Avatar (2009) remains the highest-grossing film of all time, with a total gross exceeding $2.9 billion.",
      },
    ],
  },
  {
    id: "react-hooks",
    title: "React Hooks Master",
    description: "Advance your functional component state control, side effects, and memoization.",
    category: "coding",
    difficulty: "master",
    xpAward: 500,
    icon: "code",
    questions: [
      {
        id: "rh-q1",
        text: "Which hook should be used to memoize a computed value between re-renders?",
        options: ["useCallback", "useMemo", "useRef", "useEffect"],
        correctAnswer: 1,
        explanation: "`useMemo` returns a memoized value, recalculating it only when dependencies change, optimizing performance.",
      },
      {
        id: "rh-q2",
        text: "How do you trigger a cleanup function in a useEffect hook?",
        options: [
          "Call effect.cleanup() inside the component body",
          "Return a function from the effect's callback",
          "Pass a second function parameter to useEffect",
          "Use the useCleanup hook instead"
        ],
        correctAnswer: 1,
        explanation: "Returning a function from the `useEffect` callback acts as the cleanup method, firing prior to unmount or subsequent updates.",
      },
    ],
  },
]
