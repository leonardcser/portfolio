import bookColors from './book-colors.json';
import bookPages from './book-pages.json';

export function bookSpineWidth(pages: number | undefined) {
  return Math.max(32, Math.min(68, Math.round(28 + (pages ?? 300) / 20)));
}

// Dates come from /Volumes/leo/audiobooks; books without files have no date.
type ReadingStatus = 'read' | 'reading' | 'queue';

const entries: [title: string, added: string, tags: string[], status?: ReadingStatus][] = [
  ['The Fountainhead', '2026-04-17', ['Fiction', 'Philosophy']],
  ['Why Greatness Cannot Be Planned', '2026-09-22', ['Science', 'Philosophy'], 'reading'],
  ['Educated', '2026-04-17', ['Memoir']],
  ['The ONE Thing', '2025-07-30', ['Productivity', 'Business']],
  ['Benjamin Franklin: An American Life', '2023-07-09', ['Biography', 'History']],
  ['Our Mathematical Universe', '', ['Science', 'Philosophy']],
  ['No Excuses! The Power of Self-Discipline', '2023-01-27', ['Productivity']],
  ['Sapiens', '', ['History', 'Science']],
  ['The Subtle Art of Not Giving a F*ck', '2023-01-27', ['Philosophy', 'Psychology']],
  ['You Owe You', '2023-01-12', ['Memoir', 'Productivity']],
  ['Algorithms to Live By', '2022-11-08', ['Science', 'Productivity']],
  ['Deep Work', '2022-11-08', ['Productivity']],
  ['The Four Agreements', '', ['Philosophy']],
  ['Hyperfocus', '2022-11-08', ['Productivity']],
  ['Make It Stick', '2022-11-08', ['Learning', 'Psychology']],
  ['The Lean Startup', '', ['Business', 'Productivity']],
  ['The 4-Hour Workweek', '2022-11-08', ['Productivity', 'Business']],
  ['Zero to One', '2022-11-08', ['Business']],
  ['The Fine Art of Small Talk', '2022-10-23', ['Communication']],
  ['Essentialism', '', ['Productivity', 'Business']],
  ['Make Your Bed', '2022-10-19', ['Productivity', 'Leadership']],
  ['The Obstacle Is the Way', '2022-10-14', ['Philosophy']],
  ["Can't Hurt Me", '2022-09-11', ['Memoir', 'Productivity']],
  [
    'Quiet: The Power of Introverts in a World That Can’t Stop Talking',
    '2022-09-11',
    ['Psychology'],
  ],
  ['Peak', '', ['Learning', 'Psychology']],
  ['The Untethered Soul', '2022-09-11', ['Philosophy']],
  ['A Million Miles in a Thousand Years', '2022-06-20', ['Memoir', 'Philosophy']],
  ["Man's Search for Meaning", '2022-06-20', ['Memoir', 'Philosophy']],
  ['Why We Sleep', '2022-05-16', ['Science']],
  ['Mastery', '2022-05-15', ['Learning', 'Productivity']],
  ['The Innovators', '', ['History', 'Science']],
  ['Discipline Is Destiny', '', ['Philosophy', 'Productivity']],
  ['The 48 Laws of Power', '2022-05-15', ['Psychology', 'Leadership']],
  ['The Power of Habit', '', ['Productivity', 'Psychology']],
  ['The 50th Law', '2022-05-15', ['Business', 'Psychology']],
  ['The Daily Laws', '2022-05-15', ['Philosophy']],
  ['The Laws of Human Nature', '2022-05-15', ['Psychology']],
  ['The Chimp Paradox', '2022-04-24', ['Psychology']],
  ['The Productivity Project', '', ['Productivity']],
  ['The Charisma Myth', '2022-02-01', ['Communication', 'Psychology']],
  ['How to Speak, How to Listen', '2022-01-18', ['Communication']],
  ['How to Win Friends & Influence People', '2022-01-18', ['Communication']],
  ['The 7 Habits of Highly Effective People', '2022-01-12', ['Productivity', 'Leadership']],
  ['The Happiness Hypothesis', '2021-12-21', ['Psychology', 'Philosophy']],
  ['12 Rules for Life', '', ['Psychology', 'Philosophy']],
  ['Atomic Habits', '2021-12-20', ['Productivity', 'Psychology']],
  ['The War of Art', '', ['Productivity', 'Learning']],
  ['1984', '', ['Fiction', 'Philosophy']],
  ['Four Thousand Weeks', '2026-09-22', ['Productivity', 'Philosophy'], 'queue'],
  ['The Scout Mindset', '2026-09-22', ['Psychology'], 'queue'],
  ['Range', '2026-09-22', ['Learning', 'Psychology'], 'queue'],
  ['How Big Things Get Done', '2026-09-22', ['Business'], 'queue'],
  ['High Output Management', '2026-09-22', ['Business', 'Leadership'], 'queue'],
  ['The Beginning of Infinity', '2026-09-22', ['Science', 'Philosophy'], 'queue'],
  ['The Alchemist', '2026-04-17', ['Fiction', 'Philosophy'], 'queue'],
  ['The World for Sale', '', ['Business', 'History'], 'queue'],
  ['The Great CEO Within', '', ['Business', 'Leadership'], 'queue'],
  ['Principles', '', ['Business', 'Leadership'], 'queue'],
  ['Tools of Titans', '', ['Productivity', 'Business'], 'queue'],
];

const details: Record<string, { author: string; description: string }> = {
  'The 4-Hour Workweek': {
    author: 'Tim Ferriss',
    description:
      'A guide to redesigning work, outsourcing tasks, and making room for life outside the office.',
  },
  'A Million Miles in a Thousand Years': {
    author: 'Donald Miller',
    description: 'A memoir about finding purpose by living a more intentional story.',
  },
  'How to Speak, How to Listen': {
    author: 'Mortimer J. Adler',
    description:
      'Practical advice for clearer conversation, attentive listening, and better understanding.',
  },
  'The Alchemist': {
    author: 'Paulo Coelho',
    description:
      'A shepherd travels in search of treasure and discovers what it means to follow a dream.',
  },
  'Algorithms to Live By': {
    author: 'Brian Christian and Tom Griffiths',
    description: 'How ideas from computer science can help with everyday decisions.',
  },
  'Benjamin Franklin: An American Life': {
    author: 'Walter Isaacson',
    description:
      'A biography tracing Franklin’s life as an inventor, writer, diplomat, and founding father.',
  },
  'No Excuses! The Power of Self-Discipline': {
    author: 'Brian Tracy',
    description:
      'A self-help guide to building discipline across work, finances, and personal life.',
  },
  'Deep Work': {
    author: 'Cal Newport',
    description: 'A case for focused, distraction-free work and ways to make it a habit.',
  },
  "Can't Hurt Me": {
    author: 'David Goggins',
    description: 'A memoir about overcoming hardship through endurance and mental resilience.',
  },
  'How to Win Friends & Influence People': {
    author: 'Dale Carnegie',
    description: 'Classic lessons on connecting with people and communicating persuasively.',
  },
  'The Beginning of Infinity': {
    author: 'David Deutsch',
    description:
      'An exploration of how good explanations make progress in science and society possible.',
  },
  'The Fine Art of Small Talk': {
    author: 'Debra Fine',
    description:
      'Techniques for starting conversations and feeling more comfortable in social settings.',
  },
  Educated: {
    author: 'Tara Westover',
    description: 'A memoir of growing up without formal schooling and pursuing an education.',
  },
  'Four Thousand Weeks': {
    author: 'Oliver Burkeman',
    description: 'A different way to think about time, limits, and what deserves our attention.',
  },
  'The ONE Thing': {
    author: 'Gary Keller and Jay Papasan',
    description: 'A productivity guide to focusing on the most important task at a time.',
  },
  'High Output Management': {
    author: 'Andrew S. Grove',
    description: 'Lessons on managing teams and improving how organizations work.',
  },
  'How Big Things Get Done': {
    author: 'Bent Flyvbjerg and Dan Gardner',
    description: 'Why major projects succeed or fail, and how to plan them more effectively.',
  },
  Hyperfocus: {
    author: 'Chris Bailey',
    description: 'Strategies for directing attention and making deliberate use of distractions.',
  },
  'Atomic Habits': {
    author: 'James Clear',
    description:
      'A practical guide to building good habits and breaking bad ones through small changes.',
  },
  'The Happiness Hypothesis': {
    author: 'Jonathan Haidt',
    description: 'Ancient ideas about happiness examined through modern psychology.',
  },
  'The Scout Mindset': {
    author: 'Julia Galef',
    description: 'How to think more clearly by seeking truth instead of defending beliefs.',
  },
  'Make It Stick': {
    author: 'Peter C. Brown, Henry L. Roediger III, and Mark A. McDaniel',
    description: 'Research-backed ways to learn and remember more effectively.',
  },
  'Make Your Bed': {
    author: 'William H. McRaven',
    description: 'Life lessons about perseverance and responsibility, beginning with small acts.',
  },
  "Man's Search for Meaning": {
    author: 'Viktor E. Frankl',
    description:
      'A psychiatrist’s account of surviving Nazi camps and finding meaning in suffering.',
  },
  'Why We Sleep': {
    author: 'Matthew Walker',
    description: 'A tour of the science of sleep and its effects on health and memory.',
  },
  'Quiet: The Power of Introverts in a World That Can’t Stop Talking': {
    author: 'Susan Cain',
    description: 'An exploration of introversion and the strengths of quieter personalities.',
  },
  Range: {
    author: 'David Epstein',
    description:
      'Why broad experience and varied interests can matter more than early specialization.',
  },
  'The 48 Laws of Power': {
    author: 'Robert Greene',
    description: 'Historical examples and principles about power and influence.',
  },
  'Discipline Is Destiny': {
    author: 'Ryan Holiday',
    description: 'Stoic lessons on self-control, restraint, and the practice of discipline.',
  },
  'The Power of Habit': {
    author: 'Charles Duhigg',
    description:
      'How habits form and how to change them in individuals, organizations, and society.',
  },
  'The 50th Law': {
    author: 'Robert Greene and 50 Cent',
    description: 'A book about confronting fear and acting with self-reliance.',
  },
  Mastery: {
    author: 'Robert Greene',
    description: 'How people develop expertise through practice, mentorship, and sustained work.',
  },
  'The Laws of Human Nature': {
    author: 'Robert Greene',
    description: 'Patterns of human behavior and ways to understand motivations.',
  },
  'The Daily Laws': {
    author: 'Robert Greene',
    description: 'Short daily reflections on power, craft, and human behavior.',
  },
  'The 7 Habits of Highly Effective People': {
    author: 'Stephen R. Covey',
    description: 'A framework for personal effectiveness built around seven habits.',
  },
  'The Chimp Paradox': {
    author: 'Steve Peters',
    description: 'A model for understanding emotions and managing impulsive reactions.',
  },
  'The Charisma Myth': {
    author: 'Olivia Fox Cabane',
    description: 'Exercises for developing presence, warmth, and confidence.',
  },
  'The Fountainhead': {
    author: 'Ayn Rand',
    description: 'A novel about an architect who refuses to compromise his vision.',
  },
  'The Obstacle Is the Way': {
    author: 'Ryan Holiday',
    description: 'Stoic ideas for turning adversity into an opportunity to act.',
  },
  'The Subtle Art of Not Giving a F*ck': {
    author: 'Mark Manson',
    description:
      'A candid argument for choosing what matters instead of chasing constant positivity.',
  },
  Sapiens: {
    author: 'Yuval Noah Harari',
    description: 'A history of humankind, from early Homo sapiens to the modern world.',
  },
  'The Untethered Soul': {
    author: 'Michael A. Singer',
    description:
      'An exploration of mindfulness, inner awareness, and letting go of limiting thoughts.',
  },
  'Why Greatness Cannot Be Planned': {
    author: 'Kenneth O. Stanley and Joel Lehman',
    description: 'Why open-ended exploration can lead to breakthroughs that fixed goals miss.',
  },
  'You Owe You': {
    author: 'Eric Thomas',
    description: 'A motivational account of taking ownership of your ambitions and growth.',
  },
  'Zero to One': {
    author: 'Peter Thiel and Blake Masters',
    description: 'Ideas for building startups that create something genuinely new.',
  },
  '1984': {
    author: 'George Orwell',
    description:
      'A dystopian novel about surveillance, propaganda, and resistance under a totalitarian state.',
  },
  'The War of Art': {
    author: 'Steven Pressfield',
    description: 'A short guide to overcoming resistance and doing creative work consistently.',
  },
  'Our Mathematical Universe': {
    author: 'Max Tegmark',
    description:
      'A physicist explores cosmology and the idea that reality has a mathematical structure.',
  },
  'The Four Agreements': {
    author: 'Don Miguel Ruiz',
    description: 'Four principles for changing habits of thought and improving relationships.',
  },
  Essentialism: {
    author: 'Greg McKeown',
    description: 'A guide to doing fewer things better by focusing on what matters most.',
  },
  Peak: {
    author: 'Anders Ericsson and Robert Pool',
    description: 'Research on deliberate practice and how people develop exceptional skills.',
  },
  'The Innovators': {
    author: 'Walter Isaacson',
    description: 'The story of the people and collaborations behind the digital revolution.',
  },
  'The Productivity Project': {
    author: 'Chris Bailey',
    description: 'Experiments and practical ideas for managing time, attention, and energy.',
  },
  '12 Rules for Life': {
    author: 'Jordan B. Peterson',
    description: 'Essays on responsibility, meaning, and principles for everyday life.',
  },
  'The Lean Startup': {
    author: 'Eric Ries',
    description:
      'How startups can test ideas early, learn from customers, and improve through iteration.',
  },
  'The World for Sale': {
    author: 'Javier Blas and Jack Farchy',
    description:
      'An inside look at the commodity traders who shape global markets and geopolitics.',
  },
  'The Great CEO Within': {
    author: 'Matt Mochary',
    description:
      'Practical tools for leading a company, building a team, and making better decisions.',
  },
  Principles: {
    author: 'Ray Dalio',
    description:
      'Lessons on decision-making, work, and life from the founder of Bridgewater Associates.',
  },
  'Tools of Titans': {
    author: 'Tim Ferriss',
    description:
      'Tactics and routines collected from interviews with high performers across many fields.',
  },
};

const reviews: Record<string, { rating: number; text: string }> = {
  'Atomic Habits': {
    rating: 4,
    text: 'Small changes compound over time. The practical examples make it easy to start with one habit and build from there.',
  },
};

export const books = entries.map(([title, added, tags, status]) => {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return {
    title,
    added,
    tags,
    status: status ?? 'read',
    slug,
    ...details[title],
    cover: `/images/library/${slug}.jpg`,
    coverColor: (bookColors as Record<string, string>)[slug] ?? '#333333',
    pages: (bookPages as Record<string, { pages: number; source: string }>)[slug]?.pages,
    spine: `/images/library/spines/${slug}.png`,
    review: reviews[title],
  };
});

export const latestRead = 'The Fountainhead';
