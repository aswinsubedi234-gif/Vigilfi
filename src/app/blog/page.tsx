import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import AdSlot from '@/components/AdSlot';
import styles from './blog.module.css';

export const metadata: Metadata = {
  title: 'Blog — Brain Science & Cognitive Tips — VIGILFI',
  description: 'Expert articles on brain science, cognitive performance, reaction time, memory improvement, and typing speed. Free brain training tips from VIGILFI.',
  alternates: {
    canonical: '/blog',
  },
};

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

const POSTS: BlogPost[] = [
  {
    slug: 'how-to-improve-reaction-time',
    title: 'How to Improve Your Reaction Time: 7 Proven Methods',
    excerpt: 'Reaction time is a trainable skill. Learn science-backed methods to shave milliseconds off your response time, from sleep optimization to targeted practice.',
    date: '2026-04-10',
    readTime: '5 min read',
    category: 'Performance',
  },
  {
    slug: 'average-typing-speed-by-age',
    title: 'Average Typing Speed by Age: What the Data Shows',
    excerpt: 'How fast should you type? We break down average WPM by age group, profession, and experience level. See where you stand and how to improve.',
    date: '2026-04-08',
    readTime: '4 min read',
    category: 'Data',
  },
  {
    slug: 'what-is-working-memory',
    title: 'What Is Working Memory? The Science Behind Short-Term Recall',
    excerpt: 'Working memory is your brain\'s notepad. Learn how it works, why Miller\'s Law says 7±2 items, and how to expand your cognitive capacity.',
    date: '2026-04-05',
    readTime: '6 min read',
    category: 'Science',
  },
  {
    slug: 'brain-age-what-it-means',
    title: 'Brain Age: What It Actually Means (And What It Doesn\'t)',
    excerpt: 'Brain age calculators are everywhere. But what does your "brain age" actually measure? We separate science from marketing.',
    date: '2026-04-01',
    readTime: '5 min read',
    category: 'Science',
  },
  {
    slug: 'color-perception-human-eye',
    title: 'How Your Eyes See Color: The Science of Color Perception',
    excerpt: 'The human eye can distinguish about 10 million colors. Learn how cone cells work, why 8% of men are color blind, and test your own color vision.',
    date: '2026-03-28',
    readTime: '7 min read',
    category: 'Science',
  },
  {
    slug: 'chimp-capacity-and-visual-memory',
    title: 'Why Chimpanzees Beat Humans at Working Memory Tests',
    excerpt: 'In 2007, Kyoto University proved that young chimpanzees possess eidetic-like trace memory. Learn why humans traded this visual superpower for language processing.',
    date: '2026-04-15',
    readTime: '6 min read',
    category: 'Evolution',
  },
  {
    slug: 'spatial-reasoning-and-stem-aptitude',
    title: 'Spatial Reasoning: The Hidden Predictor of Top STEM Performers',
    excerpt: 'Mental rotation and spatial IQ are among the strongest predictors of success in engineering and architecture. What is spatial elasticity, and can it be expanded?',
    date: '2026-04-12',
    readTime: '7 min read',
    category: 'Intelligence',
  },
  // ─── New SEO-Optimized Articles ────────────────────────────
  {
    slug: 'how-to-type-faster',
    title: 'How to Type Faster: 10 Tips From 100+ WPM Typists',
    excerpt: 'Want to break 100 WPM? These field-tested strategies from competitive typists will transform your keyboard speed within weeks.',
    date: '2026-04-18',
    readTime: '8 min read',
    category: 'Performance',
  },
  {
    slug: 'what-is-a-good-reaction-time',
    title: 'What Is a Good Reaction Time? Benchmarks by Age & Sport',
    excerpt: 'Is 200ms fast? What about 150ms? We break down reaction time benchmarks across age groups, esports, athletics, and driving.',
    date: '2026-04-17',
    readTime: '6 min read',
    category: 'Data',
  },
  {
    slug: 'brain-games-that-actually-work',
    title: 'Do Brain Games Actually Work? What Science Says in 2026',
    excerpt: 'Lumosity, BrainHQ, and dozens of apps promise to make you smarter. We review the peer-reviewed evidence to separate real benefits from hype.',
    date: '2026-04-16',
    readTime: '7 min read',
    category: 'Science',
  },
  {
    slug: 'how-to-improve-memory',
    title: 'How to Improve Memory: 12 Science-Backed Techniques',
    excerpt: 'From the memory palace to spaced repetition, these evidence-based methods can dramatically boost your ability to remember anything.',
    date: '2026-04-14',
    readTime: '9 min read',
    category: 'Performance',
  },
  {
    slug: 'ai-vs-human-writing',
    title: 'Can You Tell AI From Human Writing? A Detection Guide',
    excerpt: 'AI-generated text is getting eerily good. Learn the subtle patterns, tells, and detection strategies that still distinguish machine from human.',
    date: '2026-04-13',
    readTime: '6 min read',
    category: 'Technology',
  },
  {
    slug: 'average-reaction-time-gamers',
    title: 'Average Reaction Time for Gamers: FPS, MOBA & Esports Data',
    excerpt: 'How fast do pro gamers actually react? We compile reaction time data from CS2, Valorant, League of Legends, and more.',
    date: '2026-04-11',
    readTime: '5 min read',
    category: 'Data',
  },
  {
    slug: 'neuroplasticity-explained',
    title: 'Neuroplasticity: How Your Brain Rewires Itself (Simple Guide)',
    excerpt: 'Your brain is not fixed. Neuroplasticity means it physically changes based on what you do. Here is how it works and how to harness it.',
    date: '2026-04-09',
    readTime: '7 min read',
    category: 'Science',
  },
  {
    slug: 'color-blindness-test-guide',
    title: 'Color Blindness: Types, Tests & What Your Results Mean',
    excerpt: 'About 300 million people worldwide have color vision deficiency. Learn the different types, how to test yourself, and what your results reveal.',
    date: '2026-04-07',
    readTime: '6 min read',
    category: 'Health',
  },
  {
    slug: 'sequence-memory-and-iq',
    title: 'Does Sequence Memory Correlate With IQ? Research Review',
    excerpt: 'Working memory and sequential recall are among the strongest predictors of fluid intelligence. We review what the research actually says.',
    date: '2026-04-04',
    readTime: '8 min read',
    category: 'Intelligence',
  },
  {
    slug: 'digital-cognitive-assessment',
    title: 'Are Online Cognitive Tests Reliable? A Peer-Review Analysis',
    excerpt: 'Can a browser-based test actually measure your cognition? We examine the validity research behind digital cognitive assessments.',
    date: '2026-04-02',
    readTime: '7 min read',
    category: 'Science',
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            The <span className="gradient-text">VIGILFI</span> Blog
          </h1>
          <p className={styles.subtitle}>
            Brain science, cognitive tips, and the data behind your test results.
          </p>
        </div>

        <div className={styles.grid}>
          {POSTS.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`${styles.card} animate-fade-in-up stagger-${i + 1}`}
            >
              <div className={styles.cardCategory}>{post.category}</div>
              <h2 className={styles.cardTitle}>{post.title}</h2>
              <p className={styles.cardExcerpt}>{post.excerpt}</p>
              <div className={styles.cardMeta}>
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span className={styles.dot}>·</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>

        <AdSlot format="horizontal" />
      </main>
    </>
  );
}
