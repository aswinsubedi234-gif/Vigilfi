import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import styles from './blog.module.css';

export const metadata: Metadata = {
  title: 'Blog — Brain Science & Cognitive Tips — VIGILFI',
  description: 'Articles about brain science, cognitive testing, reaction time improvement, memory tips, and typing speed training. Free brain training resources.',
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
      </main>
    </>
  );
}
